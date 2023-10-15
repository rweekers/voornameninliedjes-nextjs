import Head from 'next/head'
import Layout from '../../components/MyLayout'
import Markdown from 'react-markdown'
import fetch from 'isomorphic-unfetch'
import Image from 'next/image'
import Link from 'next/link'
import LanguageIcon from '@mui/icons-material/Language'
import Tooltip from '@mui/material/Tooltip'
import { GetServerSideProps } from 'next'
import { Song, Source, Tag, FlickrPhoto } from '../../types/song'
import { PropsWithChildren } from 'react'
import Script from 'next/script'

export interface Props {
  error: string
  song: Song
  sources: Source[]
  sourcesHeader: string
  hasWikiPhoto: boolean
  wikiPhotoAttribution: string
  photo: FlickrPhoto
  contribution: FlickrContribution
}

export interface FlickrContribution {
  ownerName: string
  ownerUrl: string
  photoTitle: string
  photoUrl: string
  licenseName: string
  licenseUrl: string
}

const SongPage = (props: PropsWithChildren<Props>) => (
  <Layout>
    <Script async defer data-domain="voornameninliedjes.nl" src="https://analytics.voornameninliedjes.nl/js/plausible.js"></Script>
    {/* Checking if the song is properly fetched, otherwise show error heading */}
    {!props.error ? (
      <Head>
        <title>Voornamen in liedjes - {props.song.artist} - {props.song.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=0" />
        <meta name="description" content={`Informatie over het lied / nummer ${props.song.title} van ${props.song.artist}`}></meta>
      </Head>) : (
      <Head>
        <title>Fout</title>
      </Head>
    )}
    {/* Checking if the song is properly fetched, otherwise show error heading */}
    {!props.error ? (
      <div className="song-detail">
        <header className="song-title"><h2>{props.song.title}</h2><h1>{props.song.artist}</h1></header>
        <div className="song-text">
          {props.song.background ? (
            <div>
              <p className="song-background">Achtergrond</p>
              <Markdown >{props.song.background}</Markdown>
            </div>
          ) : props.song.wikipediaNl ? (
            <div>
              <p className="song-background">Achtergrond</p>
              <Markdown >{props.song.wikipediaNl}</Markdown>
            </div>
          ) : props.song.wikipediaSummaryEn ? (
            <div>
              <p className="song-background">Achtergrond <Tooltip title="Geen Nederlandse achtergrond"><LanguageIcon /></Tooltip></p>
              <Markdown >{props.song.wikipediaSummaryEn}</Markdown>
            </div>
          ) : (
            <div>
              <p className="song-background">Achtergrond</p>
              <Markdown >Geen achtergrond gevonden...</Markdown>
            </div>
          )}
          {props.sources && props.sources.length > 0 ? (
            <div>
              <p className="song-sources">{props.sourcesHeader}</p>
              {props.sources.map((s: Source) =>
                <Link href={s.url} as={s.url} key={s.url} passHref>{s.name}</Link>
              )}
            </div>
          ) : (<p />)}
          {props.song.albumName ? (
            <div>
              <div className="song-lastfm">Album: {props.song.albumName}</div>
            </div>
          ) : (<p />)}
          {props.song.tags ? (
            <div className="song-tags">{props.song.tags.map((t: Tag) => t.name).join(', ')}</div>
          ) : (
            <p />
          )}
        </div>
        <aside className="song-spotify">
          <iframe src={`https://open.spotify.com/embed/track/${props.song.spotify}`} className="spotify" width="100%" height="100%" title={props.song.title} frameBorder="0" allow="encrypted-media"></iframe>
        </aside>
        {props.song.youtube ? (
          <aside className="song-youtube">
            <iframe src={`https://www.youtube-nocookie.com/embed/${props.song.youtube}?rel=0`} width="100%" height="100%" title={props.song.title}></iframe>
          </aside>
        ) : (<div />)}
        <aside className="song-photos">
          {props.hasWikiPhoto ? (
            // TODO Bereken hoogte (aan de hand van div width ipv hard-coded 470?)
            <div id="test" style={{ position: 'relative', width: '100%', height: props.song.artistImageHeight / props.song.artistImageHeight * 470 }}>
              <Image
                alt={props.song.artist}
                src={`https://images.voornameninliedjes.nl/${props.song.localImage}`}
                placeholder="blur" 
                blurDataURL={`data:image/png;base64,${props.song.blurredImage}`}
                fill
                style={{
                  objectFit: 'contain',
                }}
              />
              <div className="attribution"><p>{props.wikiPhotoAttribution}</p></div>
            </div>
          ) : (
            <div style={{ position: 'relative' }}>
              <Image
                alt={props.photo.title}
                src={`https://images.voornameninliedjes.nl/${props.song.localImage}`}
                placeholder="blur" 
                blurDataURL={`data:image/png;base64,${props.song.blurredImage}`}
                width={props.song.artistImageWidth}
                height={props.song.artistImageHeight}
                style={{
                  objectFit: 'contain',
                }}
              />
              <div className="attribution"><a href={props.contribution.photoUrl} target="_blank" rel="noopener noreferrer">Photo</a> by <a href={props.contribution.ownerUrl} target="_blank" rel="noopener noreferrer">{props.contribution.ownerName}</a> / <a href={props.contribution.licenseUrl} target="_blank" rel="noopener noreferrer">{props.contribution.licenseName}</a></div>
            </div>
          )}
        </aside>
      </div>) : (
      <div><p>{props.error}</p></div>
    )}
    <style jsx>{`
.song-detail {
  display: grid;
  background-color: black;
  background-size: 100%;
  height: 100%;
  width: 100%;
  grid-template-areas:
    "song-title"
    "song-spotify"
    "song-text"
    "song-photos"
    "song-youtube";
  grid-auto-rows: min-content;
}

@media (min-width: 1025px) {
  .song-detail {
    grid-template-areas:
      "song-title song-title"
      "song-spotify song-text"
      "song-photos song-text"
      "song-youtube song-text";
    grid-template-columns: 5fr 6fr;
  }

  .song-spotify {
    height: auto;
  }

  .song-youtube {
    height: 200px;
    align-self: flex-end
  }

  .song-photos {
    align-self: flex-end
  }
}

.song-title {
  grid-area: song-title;
  background-color: white;
  color: black;
}

.song-title h1 {
  color: #464646;
  font-size: 2em;
  font-weight: 100;
}

.song-title h2 {
  color: black;
  font-size: 2.5em;
  font-weight: 300;
}

.song-text {
  grid-area: song-text;
  background-color: lightgray;
  color: black;
  font-size: 0.8em;
  font-weight: 100;
  margin: 0 10 0 10;
  padding: 15%;
  word-break: normal;
  overflow-wrap: anywhere;
}

.song-sources {
  font-size: 1.1em;
  font-weight: 300;
  margin-top: 1.2rem;
}

.song-lastfm {
  font-size: 1.1em;
  font-weight: 300;
  margin-top: 1.2rem;
}

.song-tags {
  font-size: 0.8em;
  font-weight: 500;
  margin-top: 0.8rem;
}

.song-background {
  font-size: 1.2em;
  font-weight: 300;
  margin-bottom: 1.1rem;
}

.song-photos {
  grid-area: song-photos;
  background-color: black;
  position: relative;
}

.song-photos .attribution {
  background:rgba(0,0,0,0.6);
  font-size: 0.6em;
  font-weight: 100;
  position: absolute;
  bottom: 0px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
}

.song-photos .attribution a {
  color: white;
  text-decoration: none;
}

.song-photos .attribution a:hover {
  color: orange;  
}

.song-photos img {
  max-width: 100%;
}

.song-youtube {
  grid-area: song-youtube;
  background-color: red;
  height: 300px;
}

.song-spotify {
  grid-area: song-spotify;
  background-color: #1db954;
  height: 80px;
}

.attribution p { word-break: break-all }
      `}</style>
  </Layout>
)

export const getServerSideProps: GetServerSideProps = async context => {
  const API = 'https://api.voornameninliedjes.nl/songs/'

  let hasWikiPhoto = false
  let wikiPhotoUrl = ''
  let wikiPhotoAttribution = ''

  let photo = ''
  let contribution = {
    'ownerName': '',
    'ownerUrl': '',
    'photoTitle': '',
    'photoUrl': '',
    'licenseName': '',
    'licenseUrl': ''
  }

  const artist = context.query.artist
  const title = context.query.title

  const res = await fetch(`${API}${artist}/${title}`)

  // If response is incorrect, only return error message to show a simple error page
  if (!res.ok) {
    const artistString = decodeURIComponent(`${artist}`)
    const titleString = decodeURIComponent(`${title}`)
    return { props: { error: `Kon ${artistString} - ${titleString} niet vinden` } }
  }

  const song: Song = await res.json()

  if (song.wikimediaPhotos.length > 0) {
    const wikiPhoto = song.wikimediaPhotos[0]
    hasWikiPhoto = true
    wikiPhotoUrl = wikiPhoto.url
    wikiPhotoAttribution = wikiPhoto.attribution
  } else {
    const flickrPhoto = song.flickrPhotos[0]
    contribution = {
      'ownerName': flickrPhoto.owner.username,
      'ownerUrl': flickrPhoto.owner.photoUrl,
      'photoTitle': flickrPhoto.title,
      'photoUrl': flickrPhoto.url,
      'licenseName': flickrPhoto.license.name,
      'licenseUrl': flickrPhoto.license.url
    }
  }

  const background = song.background ? song.background : song.wikipediaNl ? song.wikipediaNl : song.wikipediaSummaryEn ? song.wikipediaSummaryEn : 'Geen achtergrond gevonden...'

  const sources = (!song.background && song.wikipediaNl) ? song.sources.concat({ url: `https://nl.wikipedia.org/wiki/${song.wikipediaPage}`, name: `https://nl.wikipedia.org/wiki/${song.wikipediaPage}` }) : song.sources
  const sourcesHeader = sources && sources.length > 1 ? 'Bronnen' : 'Bron'

  return { props: { song, background, hasWikiPhoto, wikiPhotoUrl, wikiPhotoAttribution, photo, contribution, sources, sourcesHeader } }
}

export default SongPage