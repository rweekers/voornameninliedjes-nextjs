import Layout from '../components/MyLayout';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

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
          {/* TODO create separate component for the ImageList, find a better way to be responsive in number of columns */}
          <ImageList variant="masonry" cols={5} sx={{ display: { xs: 'none', sm: 'none', md: 'none', md: 'none', xl: 'block'} }} gap={6}>
          {props.songs.map((song) => (
                <div className="detailSong" key={song.id}>
                  <Link href="/[artist]/[title]" className="test" as={`/${encodeURIComponent(song.artist.replace('?', '').replace('/', '').toLowerCase())}/${encodeURIComponent(song.title.toLowerCase())}`} passHref>
                    <ImageListItem key={song.id}>
                      <img
                        src={`${song.artistImage}?w=162&auto=format`}
                        srcSet={`${song.artistImage}?w=162&auto=format&dpr=2 2x`}
                        alt={song.title}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        title={song.title}
                        subtitle={song.artist}
                      actionIcon={
                        <IconButton
                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                          aria-label={`info about ${song.title}`}
                        >
                          {/* <InfoIcon /> */}
                        </IconButton>
                      }
                      />
                    </ImageListItem>
                  </Link>
                </div>
            ))}
          </ImageList>
          <ImageList variant="masonry" cols={4} sx={{ display: { xs: 'none', sm: 'none', md: 'none', md: 'block', xl: 'none'} }} gap={6}>
            {props.songs.map((song) => (
                <div className="detailSong" key={song.id}>
                  <Link href="/[artist]/[title]" className="test" as={`/${encodeURIComponent(song.artist.replace('?', '').replace('/', '').toLowerCase())}/${encodeURIComponent(song.title.toLowerCase())}`} passHref>
                    <ImageListItem key={song.id}>
                      <img
                        src={`${song.artistImage}?w=162&auto=format`}
                        srcSet={`${song.artistImage}?w=162&auto=format&dpr=2 2x`}
                        alt={song.title}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        title={song.title}
                        subtitle={song.artist}
                      actionIcon={
                        <IconButton
                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                          aria-label={`info about ${song.title}`}
                        >
                          {/* <InfoIcon /> */}
                        </IconButton>
                      }
                      />
                    </ImageListItem>
                  </Link>
                </div>
            ))}
          </ImageList>
          <ImageList variant="masonry" cols={3} sx={{ display: { xs: 'none', sm: 'none', md: 'block', md: 'none', xl: 'none'} }} gap={6}>
            {props.songs.map((song) => (
                <div className="detailSong" key={song.id}>
                  <Link href="/[artist]/[title]" className="test" as={`/${encodeURIComponent(song.artist.replace('?', '').replace('/', '').toLowerCase())}/${encodeURIComponent(song.title.toLowerCase())}`} passHref>
                    <ImageListItem key={song.id}>
                      <img
                        src={`${song.artistImage}?w=162&auto=format`}
                        srcSet={`${song.artistImage}?w=162&auto=format&dpr=2 2x`}
                        alt={song.title}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        title={song.title}
                        subtitle={song.artist}
                      actionIcon={
                        <IconButton
                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                          aria-label={`info about ${song.title}`}
                        >
                          {/* <InfoIcon /> */}
                        </IconButton>
                      }
                      />
                    </ImageListItem>
                  </Link>
                </div>
            ))}
          </ImageList>
          <ImageList variant="masonry" cols={2} sx={{ display: { xs: 'none', sm: 'block', md: 'none', md: 'none', xl: 'none'} }} gap={6}>
            {props.songs.map((song) => (
                <div className="detailSong" key={song.id}>
                  <Link href="/[artist]/[title]" className="test" as={`/${encodeURIComponent(song.artist.replace('?', '').replace('/', '').toLowerCase())}/${encodeURIComponent(song.title.toLowerCase())}`} passHref>
                    <ImageListItem key={song.id}>
                      <img
                        src={`${song.artistImage}?w=162&auto=format`}
                        srcSet={`${song.artistImage}?w=162&auto=format&dpr=2 2x`}
                        alt={song.title}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        title={song.title}
                        subtitle={song.artist}
                      actionIcon={
                        <IconButton
                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                          aria-label={`info about ${song.title}`}
                        >
                          {/* <InfoIcon /> */}
                        </IconButton>
                      }
                      />
                    </ImageListItem>
                  </Link>
                </div>
            ))}
          </ImageList>
          <ImageList cols={1} sx={{ display: { xs: 'block', sm: 'none', md: 'none', md: 'none', xl: 'none'} }} gap={6}>
            {props.songs.map((song) => (
                <div className="detailSong" key={song.id}>
                  <Link href="/[artist]/[title]" className="test" as={`/${encodeURIComponent(song.artist.replace('?', '').replace('/', '').toLowerCase())}/${encodeURIComponent(song.title.toLowerCase())}`} passHref>
                    <ImageListItem key={song.id}>
                      <img
                        src={`${song.artistImage}?w=162&auto=format`}
                        srcSet={`${song.artistImage}?w=162&auto=format&dpr=2 2x`}
                        alt={song.title}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        title={song.title}
                        subtitle={song.artist}
                      actionIcon={
                        <IconButton
                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                          aria-label={`info about ${song.title}`}
                        >
                          {/* <InfoIcon /> */}
                        </IconButton>
                      }
                      />
                    </ImageListItem>
                  </Link>
                </div>
            ))}
          </ImageList>
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

.detailSong:hover {
  cursor: pointer;
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