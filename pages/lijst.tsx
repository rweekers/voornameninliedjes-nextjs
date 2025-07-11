import Layout from '../components/MyLayout'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import MyImageList from '../components/MyImageList'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { useRouter } from 'next/router'
import { Song } from '../types/song'
import { GetServerSideProps } from 'next'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged } from 'rxjs'
import { PropsWithChildren, useEffect, useRef, useMemo } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'

type ElementWithBoolean = [React.MutableRefObject<HTMLElement | null>, boolean]

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

  let index = useMemo(() => {
    return 0
  }, [])

  const elementsWithBoolean: ElementWithBoolean[] = useMemo(() => {
    return [
      [inputRef, true],
      [buttonPreviousRef, false],
      [buttonNextRef, true],
    ]
  }, [inputRef, buttonPreviousRef, buttonNextRef])
  
  useEffect(() => {
    const setBoolean = (index: number, active: boolean) => {
      elementsWithBoolean[index][1] = active
    }

    setBoolean(1, !props.firstPage)
    setBoolean(2, !props.lastPage)

    if (inputRef.current) {
      elementsWithBoolean[index][0].current?.focus()
    }
  }, [elementsWithBoolean, props.firstPage, props.lastPage, index, router])

  const subject = new Subject<string>()
  subject
    .pipe(
      debounceTime(750),
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
    if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault()
      do {
        decreaseIndex()
      } while(elementsWithBoolean[index][1] == false)
      elementsWithBoolean[index][0].current?.focus()
    } else if (e.key === 'Tab') {
      e.preventDefault()
      do {
        increaseIndex()
      } while(elementsWithBoolean[index][1] == false)
      elementsWithBoolean[index][0].current?.focus()
    }
  }

  const increaseIndex = () => {
    if (index + 1 > elementsWithBoolean.length - 1) {
      index = 0
    } else {
      index++
    }
  }

  const decreaseIndex = () => {
    if (index - 1 < 0) {
      index = elementsWithBoolean.length - 1
    } else {
      index--
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
              outlineOffset: '-2px'
            },
          },
        },
      },
    },
  })
  

  return (
    <Layout>
      <div>
        <Head>
          <title>Voornamen in liedjes</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=0" />
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
    `}</style>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const baseUrl = process.env.API_BASE_URL

  const pageNumber: number = context.query.pageNumber ? Number(context.query.pageNumber) : 0
  const limit = 30
  const offset = pageNumber * limit
  const queryString = context.query.queryString ? context.query.queryString : ''

  const isFirst = pageNumber === 0

  const userAgent = context.req.headers['user-agent'] ?? ''
  const referer = context.req.headers['referer'] ?? ''
  const forwardedFor = context.req.headers['x-forwarded-for'] ?? context.req.socket.remoteAddress ?? ''
  const acceptLanguage = context.req.headers['accept-language'] ?? ''

  const res = await fetch(`${baseUrl}/songs?${queryString ? `name-starts-with=${queryString}&` : ''}offset=${offset}&limit=${limit}`,
  {
   headers: {
      Accept: 'application/vnd.voornameninliedjes.songs.v2+json',
      'X-User-Agent': Array.isArray(userAgent) ? userAgent[0] : userAgent,
      'X-Referer': Array.isArray(referer) ? referer[0] : referer,
      'X-Forwarded-For': Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor,
      'X-Accept-Language': Array.isArray(acceptLanguage) ? acceptLanguage[0] : acceptLanguage
   },
  })

  const songPage = await res.json()
  const songs = songPage.songs
  const isLast = songPage.isLast

  return {
    props: {
      songs: songs,
      firstPage: isFirst,
      lastPage: isLast,
      pageNumber: pageNumber,
      query: queryString
    }
  }
}

export default List