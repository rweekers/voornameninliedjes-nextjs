import Layout from '../../components/MyLayout';
import Markdown from 'react-markdown';
import fetch from 'isomorphic-unfetch';

const Post = props => (
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
        {/* {hasWikiPhoto ? ( */}
          <div>
            <img
              src={props.song.artistImage} alt={props.song.artist}
            />
            <div className="attribution"><p>{props.song.artist}</p></div>
          </div>
        {/* ) : (
            <div>
              <img
                src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_c.jpg`}
                alt={photo.title}
              />
              <div className="attribution"><a href={contribution.photoUrl} target="_blank" rel="noopener noreferrer">Photo</a> by <a href={contribution.ownerUrl} target="_blank" rel="noopener noreferrer">{contribution.ownerName}</a> / <a href={contribution.licenseUrl} target="_blank" rel="noopener noreferrer">{contribution.licenseName}</a></div>
            </div>
          )} */}
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

Post.getInitialProps = async function (context) {
  const { id } = context.query;
  const res = await fetch(`https://api.voornameninliedjes.nl/songs/${id}`);
  const song = await res.json();

  console.log(`Fetched song: ${song.title}`);

  return { song };
};

export default Post;