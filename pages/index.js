import Layout from '../components/MyLayout'
import Songrow from '../components/Songrow'
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const Index = props => (
  <Layout>
    <div>
      <content className="app-section">
        <div className="song-list">
          <ul>
            {props.songs.map(song =>
              <li key={song.id}>
                <Songrow song={song} />
              </li>
            )}
          </ul>
        </div>


      </content>
    </div>

    <style jsx>{`
.song-list {
  padding-top: 3%;
}

.song-list ul {
  list-style-type: none;
}
    `}</style>
  </Layout>
);

export async function getServerSideProps(context) {
  const res = await fetch('https://api.voornameninliedjes.nl/songs');
  const data = await res.json();

  console.log(`Song data fetched. Count: ${data.length}`);

  return {
    props: {
      songs: data.map(entry => entry)
    }
  };
}

// export async function getStaticProps() {
//   const res = await fetch('https://api.voornameninliedjes.nl/songs');
//   const data = await res.json();

//   console.log(`Song data fetched. Count: ${data.length}`);

//   return {
//     props: {
//       songs: data.map(entry => entry)
//     }
//   };
// };

export default Index;