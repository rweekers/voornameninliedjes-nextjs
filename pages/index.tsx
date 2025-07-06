import Layout from '../components/MyLayout'
import SuggestionsList from '../components/SuggestionsList'
import Head from 'next/head'
import Link from 'next/link'
import { PropsWithChildren, useEffect } from 'react'
import { Song, SongPage } from '../types/song'
import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { map, filter, switchMap, debounceTime, distinctUntilChanged, fromEvent } from 'rxjs'
import { ajax } from 'rxjs/ajax'

export interface Props {
}

function Index(props: PropsWithChildren<Props>) {
  const router = useRouter()

  const [query, setQuery] = useState('')
  const [songList, setSongList] = useState<Song[]>([])
  const [aboveLimit, setAboveLimit] = useState(false)
  const [suggestionIndex, setSuggestionIndex] = useState(0)
  const [typing, setTyping] = useState(false)
  const [searching, setSearching] = useState(false)

  // elem ref
  const searchBox = useRef<HTMLInputElement>(null)

  const suggestionLimit = 10

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

    if (searchBox.current) {
      searchBox.current.focus()

      // streams
      const input$ = fromEvent(searchBox.current, 'keyup')
        .pipe(
          map((i: any) => i.currentTarget.value))

      input$
        .pipe(
          distinctUntilChanged(),
          filter(e => e.length > 0)
        ).subscribe(_ => {
          setTyping(true)
          setSearching(false)
          setAboveLimit(false)
        })

      const filteredInput$ = input$
        .pipe(
          debounceTime(500),
          distinctUntilChanged())

      filteredInput$
        .pipe(
          filter(e => e.length > 1)
        )
        .subscribe(e => {
          setTyping(false)
          setSearching(true)
        })

      filteredInput$
        .pipe(
          filter(e => e.length <= 1)
        )
        .subscribe(e => {
          setTyping(false)
          setSuggestionIndex(0)
        })
        
      filteredInput$
        .pipe(
          filter(e => e.length > 1),
          map((query) => `${baseUrl}/songs?name-starts-with=${query}&limit=${suggestionLimit + 1}`),
          switchMap((url) =>
            ajax<SongPage>({
              url: url,
              method: 'GET',
              headers: {
                Accept: 'application/vnd.voornameninliedjes.songs.v2+json',
                'X-User-Agent': navigator.userAgent,
                'X-Referer': window.location.href,
              },
            })
          ),
          filter(e => e.status === 200),
          map(e => e.response.songs)
        )
        .subscribe(e => {
          showSuggestions(e as Song[])
          setSearching(false)
        })

      input$
        .subscribe(query => setQuery(query))
    }
  }, [])
  


  const showSuggestions = (e: Song[]) => {
    const songList = e.length > suggestionLimit ? e.slice(0, suggestionLimit) : e
    if (e.length > suggestionLimit) {
      setAboveLimit(true)
    }

    setSongList(songList)
  }

  const navigateToSong = (song: Song) => {
    const artist = encodeURIComponent(song.artist.replace('?', '').replace('/', '').toLowerCase())
    const title = encodeURIComponent(song.title.replace('?', '').replace('#', '').toLowerCase())

    const s = `${artist}/${title}`.toLowerCase()

    router.push({
      pathname: (`/${s}`)
    })
  }

  const keyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowDown') {
      const newIndex = suggestionIndex + 1 < songList.length ? suggestionIndex + 1 : songList.length - 1
      setSuggestionIndex(newIndex)
      e.preventDefault()
    }

    if (e.key === 'ArrowUp') {
      const newIndex = suggestionIndex > 0 ? suggestionIndex - 1 : 0
      setSuggestionIndex(newIndex)
      e.preventDefault()
    }

    if (e.key === 'Enter') {
      navigateToSong(songList[suggestionIndex])
    }

    if (e.key === 'Escape') {
      setSearching(false)
      setSuggestionIndex(0)
      setTyping(false)
      setQuery('')
      if (searchBox && searchBox.current) {
        searchBox.current.value = ''
      }
    }
  }

  return (
    <Layout>
      <div>
        <Head>
          <title>Voornamen in liedjes</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=0" />
          <meta name="description" content="Website met informatie over liedjes (nummers) die een voornaam in de titel hebben."></meta>
        </Head>
        <slot >
          <span>Zoek op een voornaam:</span>
            <div className="filter">
                <input id="search" ref={searchBox} className={`filterInput ${typing ? 'filterInputSearching' : ''}`} type="text" placeholder="Zoek op een voornaam..." autoComplete="off"
                  style={{
                    backgroundColor: 'white',
                    width: '80%'
                  }}
                  onKeyDown={keyDown}
                />
                <img src="/record_gold.webp" className={`spinner-record ${!searching ? 'hiddenElement' : ''}`} width={25} height={25} alt="logo" />
              { !typing && !searching && 
              <SuggestionsList songs={songList} aboveLimit={aboveLimit} show={query.length > 1} selectSong={navigateToSong} onSuggestionIndexChange={(i: number) => setSuggestionIndex(i)} suggestionIndex={suggestionIndex} />
              }

            </div>
          <span>Of blader door de </span>
          <Link href='/lijst' className='listlink' passHref>lijst</Link>
        </slot>
      </div>

      <style jsx>{`
.home {
  color: white; 
  font-family: Roboto, Open Sans, sans-serif;
  font-size: 0.6em;
  font-weight: 300;
  display: inline;
  width: 1000px;
}

.filter {
  position: relative;
  z-index: 1;
  margin-top: 3%;
  margin-bottom: 12%;
  width: 500px;
}

@media (max-width: 768px) {
  .filter {
    width: 400px;
    left: 3%;
  }
}

@media (max-width: 480px) {
  .filter {
    left: 2%;
    font-size: 1.8em;
  }
}

@media (min-width: 768px) {
  .filter {
    margin-top: 8%;
    width: 700px;
  }
}

.filterInput {
  height: 30px;
  width: 100%;
  font-family: Roboto, Open Sans, sans-serif;
  font-size: 0.6em;
  font-weight: 300;
  border: none;
  border-radius: 15px;
  padding-left: 3%;
  position: relative;
  left: 3%;
}

.filterInput::placeholder {
  opacity: 0.6;
}

.filterInput:focus {
  outline: 3px solid gray;
}

.filterInputSearching {
  outline: 3px solid rgb(255, 140, 0);
}

.filterInputSearching:focus {
  outline: 3px solid rgb(255, 140, 0);
}

.spinner-record {
  animation: spin 1s infinite linear;
  transform-origin: center;
  margin-left: 4%;
  vertical-align: middle;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.hiddenElement {
  visibility: hidden;
  pointer-events: none;
}
    `}</style>
    </Layout>
  )
};

export default Index