import Layout from '../../components/MyLayout';
import Markdown from 'react-markdown';
import fetch from 'isomorphic-unfetch';

const Song = props => (
  <Layout>
    <div className="Songdetail">
      <header className="song-title"><h1>{props.song.artist}</h1><h2>{props.song.title}</h2></header>
      <content className="song-text"><Markdown source={props.song.background} /></content>
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
            <div>                <img
              src={`https://farm${props.photo.farm}.staticflickr.com/${props.photo.server}/${props.photo.id}_${props.photo.secret}_c.jpg`}
              alt={props.photo.title}
            />
              <div className="attribution"><a href={props.contribution.photoUrl} target="_blank" rel="noopener noreferrer">Photo</a> by <a href={props.contribution.ownerUrl} target="_blank" rel="noopener noreferrer">{props.contribution.ownerName}</a> / <a href={props.contribution.licenseUrl} target="_blank" rel="noopener noreferrer">{props.contribution.licenseName}</a></div>
            </div>
          )}
      </aside>
    </div>
    <style jsx>{`
    .Songdetail {
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
  .Songdetail {
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

Song.getInitialProps = async function (context) {
  const API = 'https://api.voornameninliedjes.nl/songs/';
  const FLICKR_PHOTO_DETAIL = 'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=9676a28e9cb321d2721e813055abb6dc&format=json&nojsoncallback=true&photo_id=';
  const FLICKR_USER_DETAIL = 'https://api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=9676a28e9cb321d2721e813055abb6dc&format=json&nojsoncallback=true&user_id=';
  const FLICKR_LICENCES = 'https://api.flickr.com/services/rest/?method=flickr.photos.licenses.getInfo&api_key=9676a28e9cb321d2721e813055abb6dc&format=json&nojsoncallback=true'

  let hasWikiPhoto = false;
  let wikiPhotoUrl = '';
  let wikiPhotoAttribution = '';

  let contribution = {
    "ownerName": '',
    "ownerUrl": '',
    "photoTitle": '',
    "photoUrl": '',
    "licenseName": '',
    "licenseUrl": ''
  }

  let photo;
  let owner;

  const { id } = context.query;
  const res = await fetch(`${API}${id}`);
  const song = await res.json();

  if (song.wikimediaPhotos.length > 0) {
    const wikiPhoto = song.wikimediaPhotos[0];

    hasWikiPhoto = true;
    wikiPhotoUrl = wikiPhoto.url;
    wikiPhotoAttribution = wikiPhoto.attribution;
  } else {
    const photoRes = await fetch(FLICKR_PHOTO_DETAIL + song.flickrPhotos[0]);
    const photoR = await photoRes.json();
    photo = await photoR.photo;

    const ownerR = await photo.owner;

    const b = await fetch(`${FLICKR_USER_DETAIL}${ownerR.nsid}`);
    const c = await b.json();
    owner = c.person;
    const username = c.person.username._content;
    const photosurl = c.person.photosurl._content;

    const licencesRes = await fetch(FLICKR_LICENCES);
    const licenses = await licencesRes.json();

    const license = licenses.licenses.license.find(x => x.id === photo.license);
    const licenseName = license.name;
    const licenseUrl = license.url;

    contribution = {
      'ownerName': username,
      'ownerUrl': photosurl,
      'photoTitle': photo.title,
      'photoUrl': photo.urls.url[0],
      'licenseName': licenseName,
      'licenseUrl': licenseUrl
    };
  }

  console.log(`Fetched song: ${song.title}`);

  if (hasWikiPhoto) {
    console.log(`wiki photo url ${wikiPhotoUrl} with attribution ${wikiPhotoAttribution}`);
  } else {
    console.log(photo);
    console.log(owner);
    console.log(contribution);
  }

  return { song, hasWikiPhoto, wikiPhotoUrl, wikiPhotoAttribution, contribution, photo, owner };
};

export default Song;