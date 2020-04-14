import Layout from '../components/MyLayout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const Index = props => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.songs.map(song => (
        <li key={song.id}>
          <Link href="/song/[id]" as={`/song/${song.id}`}>
            <a>{song.title} - {song.artist}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);

Index.getInitialProps = async function() {
  const res = await fetch('https://api.voornameninliedjes.nl/songs');
  const data = await res.json();

  console.log(`Song data fetched. Count: ${data.length}`);

  return {
    songs: data.map(entry => entry)
  };
};

export default Index;