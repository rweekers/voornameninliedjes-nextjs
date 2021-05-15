import Layout from '../../components/MyLayout';
import Markdown from 'react-markdown';
import fetch from 'isomorphic-unfetch';

const Song = props => (
  <Layout>
    <div className="song-detail">
      <header className="song-title"><h2>{props.song.title}</h2><h1>{props.song.artist}</h1></header>
      <content className="song-text"><Markdown children={props.song.background} /></content>
      <aside className="song-spotify">
        <iframe src={`https://open.spotify.com/embed/track/${props.song.spotify}`} className="spotify" width="100%" height="100%" title={props.song.title} frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      </aside>
      <aside className="song-youtube">
        <iframe src={`https://www.youtube-nocookie.com/embed/${props.song.youtube}?rel=0`} width="100%" height="100%" title={props.song.title}></iframe>
      </aside>
      <aside className="song-photos">
        {props.hasWikiPhoto ? (
          <div>
            <img
              src={props.wikiPhotoUrl} alt={props.song.artist}
            />
            <div className="attribution"><p>{props.wikiPhotoAttribution}</p></div>
          </div>
        ) : (
            <div>
              <img
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
  text-transform: capitalize;
}

.song-title h1 {
  color: darkgray;
  font-size: 2em;
  font-weight: 200;
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

// export async function getStaticPaths() {
//   // Call an external API endpoint to get posts
//   const res = await fetch('https://api.voornameninliedjes.nl/songs');
//   const songs = await res.json();

//   // Get the paths we want to pre-render based on songs
//   const paths = songs.map(song => ({
//     params: { id: song.id },
//   }));
//   // const paths = songs.map(song => `/song/${song.id}`)

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false }
// }

export async function getServerSideProps(context) {
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

  console.log(`Gotten param id ${context.query.id}`);
  const res = await fetch(`${API}${context.query.id}`);
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

  console.log(`Fetched song: ${song.title}`);

  return { props: { song, hasWikiPhoto, wikiPhotoUrl, wikiPhotoAttribution, photo, contribution } };
}

// export async function getStaticProps({ params }) {
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

//   console.log(`Gotten param id ${params.id}`);
//   const res = await fetch(`${API}${params.id}`);
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

//   console.log(`Fetched song: ${song.title}`);

//   return { props: { song, hasWikiPhoto, wikiPhotoUrl, wikiPhotoAttribution, photo, contribution } };
// };

export default Song;