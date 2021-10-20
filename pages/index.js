import Layout from '../components/MyLayout';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import MyImageList from '../components/MyImageList';

const Index = props => (

  <Layout>
    <div>
      <Head>
        <title>Voornamen in liedjes</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Website met informatie over liedjes (nummers) die een voornaam in de titel hebben."></meta>
        <script async defer data-domain="voornameninliedjes.nl" src="https://analytics.voornameninliedjes.nl/js/plausible.js"></script>
      </Head>
      <slot className="app-section">
        <div className="masonry">
          <MyImageList variant="masonry" songs={props.songs} cols={5} sx={{ display: { xs: 'none', sm: 'none', md: 'none', md: 'none', xl: 'block'} }} />
          <MyImageList variant="masonry" songs={props.songs} cols={4} sx={{ display: { xs: 'none', sm: 'none', md: 'none', md: 'block', xl: 'none'} }} />
          <MyImageList variant="masonry" songs={props.songs} cols={3} sx={{ display: { xs: 'none', sm: 'none', md: 'block', md: 'none', xl: 'none'} }} />
          <MyImageList variant="masonry" songs={props.songs} cols={2} sx={{ display: { xs: 'none', sm: 'block', md: 'none', md: 'none', xl: 'none'} }} />
          <MyImageList variant="standard" songs={props.songs} cols={1} sx={{ display: { xs: 'block', sm: 'none', md: 'none', md: 'none', xl: 'none'} }} />
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

.masonry {
  padding-top: 3%;
  margin-left: 3%;
  margin-right: 3%;
}
    `}</style>
  </Layout>
);

// export async function getServerSideProps(context) {
//   const res = await fetch('https://api.voornameninliedjes.nl/songs');
//   const data = await res.json();

//   console.log(`Song data fetched. Count: ${data.length}`);

//   return {
//     props: {
//       songs: data.map(entry => entry)
//     }
//   };
// }

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