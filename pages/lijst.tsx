import Layout from '../components/MyLayout'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import MyImageList from '../components/MyImageList'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'
import { Song } from '../types/song'
import { GetServerSideProps } from 'next'
import Script from 'next/script'
import { Subject } from 'rxjs'
import { filter, debounceTime, distinctUntilChanged } from 'rxjs'
import { useEffect, useRef } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'

export interface Props {
  songs: Song[],
  firstPage: boolean,
  lastPage: boolean,
  pageNumber: number,
  query: string
}

function List(props: PropsWithChildren<Props>) {
  const router = useRouter()

  const inputRef = useRef<HTMLInputElement | null>(null)
  const buttonPreviousRef = useRef<HTMLDivElement  | null>(null)
  const buttonNextRef = useRef<HTMLDivElement  | null>(null)
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const subject = new Subject<string>()
  subject
    .pipe(
      debounceTime(750),
      filter(e => e.length != 1),
      distinctUntilChanged()
    )
    .subscribe(value =>     router.push({
      query: { queryString: value }
    }))

  const updateInput = (value: string) => {
    subject.next(value)
  }

  const chipNextDisabled = () => {
    return props.lastPage
  }

  const chipPreviousDisabled = () => {
    return props.firstPage
  }

  const handleClickPrevious = () => {
    router.push({
      query: { 
        pageNumber: props.pageNumber - 1,
        queryString: props.query 
      }
    })
  }

  const handleClickNext = () => {
    router.push({
      query: { 
        pageNumber: props.pageNumber + 1,
        queryString: props.query
      }
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      if (document.activeElement === inputRef.current) {
        console.log(`Value fp ${props.firstPage} and lp ${props.lastPage}`)
        if (props.firstPage) {
          if (!props.lastPage) {
            console.log('1')
            buttonNextRef.current?.focus()
          } else {
            console.log('2')
            inputRef.current?.focus()
          }
        } else {
          console.log('3')
          buttonPreviousRef.current?.focus()
        }
      } else if (document.activeElement === buttonPreviousRef.current) {
        if (props.lastPage) {
          inputRef.current?.focus()
        } else {
          buttonNextRef.current?.focus()
        }
      } else {
        inputRef.current?.focus()
      }
    }
  }

  const theme = createTheme({
    components: {
      // Name of the component
      MuiChip: {
        styleOverrides: {
          // Name of the slot
          root: {
            '&:hover, &:focus': {
              // Some CSS
              outline: '3px solid gray',
            },
          },
        },
      },
    },
  })
  

  return (
    <Layout>
      <Script async defer data-domain="voornameninliedjes.nl" src="https://analytics.voornameninliedjes.nl/js/plausible.js"></Script>
      <div>
        <Head>
          <title>Voornamen in liedjes</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="description" content="Website met informatie over liedjes (nummers) die een voornaam in de titel hebben."></meta>
        </Head>
        <slot className="app-section" onKeyDown={handleKeyDown}>
            <div className="filter">
              <input className="filterInput" type="text" placeholder="Zoek op een voornaam..." ref={inputRef} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                updateInput(event.target.value)
              }}
              style={{
                backgroundColor: 'white',
                width: '80%'
              }}
            />
            </div>
          <div className="chips">
            <Stack direction="row" spacing={1}>
              <ThemeProvider theme={theme}>
                <Chip label="Vorige" key="previous" className="knop" ref={buttonPreviousRef} onClick={() => handleClickPrevious()} color="primary" disabled={chipPreviousDisabled()} />
                <Chip label="Volgende" key="next" className="knop" ref={buttonNextRef} onClick={() => handleClickNext()} color="primary" disabled={chipNextDisabled()} />
              </ThemeProvider>
            </Stack>
          </div>
          <div className="masonry">
            { props.songs.length > 0 && 
              <MyImageList songs={props.songs} />
            }
            { props.songs.length < 1 &&
              <p>Geen nummers gevonden</p>
            }
            
          </div>


        </slot>
      </div>

      <style jsx>{`
.song-list {
  padding-top: 3%;
}

.song-list ul {
  list-style-type: none;
}

.chips {
  padding-top: 2%;
}

.masonry {
  padding-top: 3%;
  margin-left: 3%;
  margin-right: 3%;
}

.filter {
  margin-top: 3%;
  width: 100%;
}

.filterInput {
  height: 30px;
  width: 100%;
  font-family: Roboto, Open Sans, sans-serif;
  font-size: 0.6em;
  font-weight: 300;
  border: none;
  border-radius: 15px;
  padding-left: 1.5%;
}
.filterInput::placeholder {
  opacity: 0.6;
}
.filterInput:focus {
  outline: 3px solid gray;
}
    `}</style>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {

  const pageNumber: number = context.query.pageNumber ? Number(context.query.pageNumber) : 0
  const queryString = context.query.queryString ? context.query.queryString : ''

  const res = await fetch(`https://api.voornameninliedjes.nl/songs?name-starts-with=${queryString}&page-number=${pageNumber}`)
  const data = await res.json()

  const songs = data.content ? data.content : []

  return {
    props: {
      songs: songs,
      firstPage: data.first,
      lastPage: data.last,
      pageNumber: pageNumber,
      query: queryString
    }
  }
}

export default List