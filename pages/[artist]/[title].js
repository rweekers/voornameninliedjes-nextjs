import Head from 'next/head';
import Layout from '../../components/MyLayout';
import Markdown from 'react-markdown';
import fetch from 'isomorphic-unfetch';
import Image from 'next/image';
import LanguageIcon from '@mui/icons-material/Language';
import Tooltip from '@mui/material/Tooltip';
var TurndownService = require('turndown');

const Song = props => (
  <Layout>
    <Head>
      <title>Voornamen in liedjes - {props.song.artist} - {props.song.title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={`Informatie over het lied / nummer ${props.song.title} van ${props.song.artist}`}></meta>
      <script async defer data-domain="voornameninliedjes.nl" src="https://analytics.voornameninliedjes.nl/js/plausible.js"></script>
    </Head>
    <div className="song-detail">
      <header className="song-title"><h2>{props.song.title}</h2><h1>{props.song.artist}</h1></header>
      <div className="song-text">
        {props.background ? (
          <div>
            <p className="song-background">Achtergrond</p>
            <Markdown >{props.background}</Markdown>
          </div>
        ) : (props.wikiSummary ? (
          <div>
            <p className="song-background">Achtergrond <Tooltip title="Geen Nederlandse achtergrond"><LanguageIcon /></Tooltip></p>
            <Markdown >{props.wikiSummary}</Markdown>
          </div>
        ) : (
          <p className="song-background">Geen achtergrond gevonden...</p>
        )
        )}
        {props.album ? (
          <div className="song-lastfm">Album: {props.album}</div>
        ) : (<p />)}
        {props.genres ? (
          <div className="song-tags">{props.genres.join(", ")}</div>
        ) : (
          <p />
        )}
      </div>
      <aside className="song-spotify">
        <iframe src={`https://open.spotify.com/embed/track/${props.song.spotify}`} className="spotify" width="100%" height="100%" title={props.song.title} frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      </aside>
      {props.song.youtube ? (
        <aside className="song-youtube">
          <iframe src={`https://www.youtube-nocookie.com/embed/${props.song.youtube}?rel=0`} width="100%" height="100%" title={props.song.title}></iframe>
        </aside>
      ) : (<div />)}
      <aside className="song-photos">
        {props.hasWikiPhoto ? (
          <div>
            <Image width="100%" height="100%" layout="responsive" objectFit="contain"
              src={props.wikiPhotoUrl} alt={props.song.artist}
            />
            <div className="attribution"><p>{props.wikiPhotoAttribution}</p></div>
          </div>
        ) : (
          <div>
            <Image width="100%" height="100%" layout="responsive" objectFit="contain"
              src={props.photo.url}
              alt={props.photo.title}
            />
            <div className="attribution"><a href={props.contribution.photoUrl} target="_blank" rel="noopener noreferrer">Photo</a> by <a href={props.contribution.ownerUrl} target="_blank" rel="noopener noreferrer">{props.contribution.ownerName}</a> / <a href={props.contribution.licenseUrl} target="_blank" rel="noopener noreferrer">{props.contribution.licenseName}</a></div>
          </div>
        )}
      </aside>
    </div>
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
);

export async function getStaticPaths() {
  // Call an external API endpoint to get songs
  const res = await fetch('https://api.voornameninliedjes.nl/songs');
  const songs = await res.json();

  // Get the paths we want to pre-render based on songs
  const paths = songs.map(song => ({
    params: {
      artist: song.artist.toLowerCase().replace('?', '').replace('/', ''),
      title: song.title.toLowerCase().replace('?', '').replace('#', '')
    },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// export async function getServerSideProps(context) {
//   const API = 'https://api.voornameninliedjes.nl/songs/';

//   let hasWikiPhoto = false;
//   let wikiPhotoUrl = '';
//   let wikiPhotoAttribution = '';

//   let photo = '';
//   let contribution = {
//     "ownerName": '',
//     "ownerUrl": '',
//     "photoTitle": '',
//     "photoUrl": '',
//     "licenseName": '',
//     "licenseUrl": ''
//   }

//   const artist = encodeURIComponent(decodeURIComponent(context.query.artist));
//   const title = encodeURIComponent(decodeURIComponent(context.query.title));
//   const res = await fetch(`${API}${artist}/${title}`);
//   const song = await res.json();

//   if (song.wikimediaPhotos.length > 0) {
//     const wikiPhoto = song.wikimediaPhotos[0];
//     hasWikiPhoto = true;
//     wikiPhotoUrl = wikiPhoto.url;
//     wikiPhotoAttribution = wikiPhoto.attribution;
//   } else {
//     const flickrPhoto = song.flickrPhotos[0];
//     photo = flickrPhoto;
//     contribution = {
//       'ownerName': flickrPhoto.owner.username,
//       'ownerUrl': flickrPhoto.owner.photoUrl,
//       'photoTitle': flickrPhoto.title,
//       'photoUrl': flickrPhoto.url,
//       'licenseName': flickrPhoto.license.name,
//       'licenseUrl': flickrPhoto.license.url
//     };
//   }

//   const sources = song.sources.map(s => `*[${s.name}](${s.url})*`).join('\n\n');
//   const sourcesAppend = sources && sources.length > 0 ? `\n\n${song.sources.length > 1 ? '*Bronnen*' : '*Bron*'}: ${sources}` : '';
//   const background = song.wikipediaPage ? `${song.background}\n[https://nl.wikipedia.org/wiki/${song.wikipediaPage}](https://nl.wikipedia.org/wiki/${encodeURI(song.wikipediaPage)})` : `${song.background}${sourcesAppend}`;

//   console.log(`Fetched song: ${song.title}`);

//   return { props: { song, background, hasWikiPhoto, wikiPhotoUrl, wikiPhotoAttribution, photo, contribution } };
// }

export async function getStaticProps({ params }) {
  const API = 'https://api.voornameninliedjes.nl/songs/';

  let hasWikiPhoto = false;
  let wikiPhotoUrl = '';
  let wikiPhotoAttribution = '';

  let photo = '';
  let contribution = {
    "ownerName": '',
    "ownerUrl": '',
    "photoTitle": '',
    "photoUrl": '',
    "licenseName": '',
    "licenseUrl": ''
  }

  const artist = encodeURIComponent(decodeURIComponent(params.artist));
  const title = encodeURIComponent(decodeURIComponent(params.title));
  const res = await fetch(`${API}${artist}/${title}`);
  const song = await res.json();

  if (song.wikimediaPhotos.length > 0) {
    const wikiPhoto = song.wikimediaPhotos[0];
    hasWikiPhoto = true;
    wikiPhotoUrl = wikiPhoto.url;
    wikiPhotoAttribution = wikiPhoto.attribution;
  } else {
    const flickrPhoto = song.flickrPhotos[0];
    photo = flickrPhoto;
    contribution = {
      'ownerName': flickrPhoto.owner.username,
      'ownerUrl': flickrPhoto.owner.photoUrl,
      'photoTitle': flickrPhoto.title,
      'photoUrl': flickrPhoto.url,
      'licenseName': flickrPhoto.license.name,
      'licenseUrl': flickrPhoto.license.url
    };
  }

  const sources = song.sources.map(s => `*[${s.name}](${s.url})*`).join('\n\n');
  const sourcesAppend = sources && sources.length > 0 ? `\n\n${song.sources.length > 1 ? '*Bronnen*' : '*Bron*'}: ${sources}` : '';
  const background = song.wikipediaPage ? `${song.background}\n[https://nl.wikipedia.org/wiki/${song.wikipediaPage}](https://nl.wikipedia.org/wiki/${encodeURI(song.wikipediaPage)})` : `${song.background}${sourcesAppend}`;

  console.log(`Fetched song: ${song.artist} - ${song.title}`);

  const API_LAST_FM = 'http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=fbfbf9c47ff8bcf4642ece8c7de2305a';
  const resLastFM = await fetch(`${API_LAST_FM}&artist=${artist}&track=${title}&format=json`);

  if (resLastFM) {

    const lastFMInfo = await resLastFM.json();

    if (lastFMInfo.error) {
      return { props: { song, background, hasWikiPhoto, wikiPhotoUrl, wikiPhotoAttribution, photo, contribution } };
    }

    const album = lastFMInfo?.track?.album != null ? lastFMInfo?.track?.album?.title : null;
    const genres = lastFMInfo?.track?.toptags?.tag.map(t => t.name)
    const rawWikiSummary = lastFMInfo?.track?.wiki != null ? lastFMInfo.track.wiki.summary : null;

    var turndownService = new TurndownService()
    const wikiSummary = rawWikiSummary != null ? turndownService.turndown(rawWikiSummary) : null;

    return { props: { song, background, hasWikiPhoto, wikiPhotoUrl, wikiPhotoAttribution, photo, contribution, album, genres, wikiSummary } };
  }

  return { props: { song, background, hasWikiPhoto, wikiPhotoUrl, wikiPhotoAttribution, photo, contribution } };
};

export default Song;