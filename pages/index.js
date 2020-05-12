import Layout from '../components/MyLayout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const Index = props => (
  <Layout>
    <div>
      <content className="app-section">
        <div className="Songlist">
          <ul>
            {props.songs.map(song =>
              <li key={song.id}>
                <div className="Songrow">
                  <Link href="/song/[id]" as={`/song/${song.id}`}>
                    <a><p>{song.artist} - {song.title}</p></a>
                  </Link>
                </div>
              </li>
            )}
          </ul>
        </div>


      </content>
    </div>

    <style jsx>{`
// styling here
      `}</style>
  </Layout>
);

export async function getStaticProps() {
  const res = await fetch('https://api.voornameninliedjes.nl/songs');
  const data = await res.json();

  console.log(`Song data fetched. Count: ${data.length}`);

  return {
    props: {
      songs: data.map(entry => entry)
    }
  };
};

export default Index;