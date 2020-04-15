import Layout from '../../components/MyLayout';
import Markdown from 'react-markdown';
import fetch from 'isomorphic-unfetch';

const Post = props => (
  <Layout>
    <h1>{props.song.title}</h1>
    <div className="song-spotify">
      <iframe src={`https://open.spotify.com/embed/track/${props.song.spotify}`} className="spotify" width="100%" height="100%" title={props.song.title} frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    </div>
    <div className="song-youtube">
      <iframe src={`https://www.youtube-nocookie.com/embed/${props.song.youtube}?rel=0`} width="100%" height="100%" title={props.song.title}></iframe>
    </div>
    <div className="markdown">
      <Markdown
        source={props.song.background}
      />
    </div>
    {props.song.artistImage ? <img src={props.song.artistImage} /> : null}
    <style jsx global>{`
        .markdown {
          font-family: 'Arial';
        }

        .markdown a {
          text-decoration: none;
          color: blue;
        }

        .markdown a:hover {
          opacity: 0.6;
        }

        .markdown h3 {
          margin: 0;
          padding: 0;
          text-transform: uppercase;
        }
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