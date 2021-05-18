import Layout from '../components/MyLayout'
import Songrow from '../components/Songrow'
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';

const Index = props => (
  <Layout>
    <div>
      <Head>
        <title>Voornamen in liedjes</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Website met informatie over liedjes (nummers) die een voornaam in de titel hebben."></meta>
      </Head>
      <slot className="app-section">
        <div className="song-list">
          <ul>
            {props.songs.map(song =>
              <li key={song.id}>
                <Songrow song={song} />
              </li>
            )}
          </ul>
        </div>


      </slot>
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