import Layout from '../components/MyLayout';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import MyImageList from '../components/MyImageList';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';
import { isEqual } from 'lodash-es';

function Index(props) {

  const router = useRouter();

  const chipColor = (t) => {
    const a = props.currSel.split(',').sort();
    const b = t.split('').sort();
    return isEqual(a, b) ? "primary" : "secondary"
  }

  const handleClick = (e) => {
    router.push({
      query: { characters: e.pageChars.split('').join(',') }
    })
  }

  return (
    <Layout>
      <div>
        <Head>
          <title>Voornamen in liedjes</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="description" content="Website met informatie over liedjes (nummers) die een voornaam in de titel hebben."></meta>
          <script async defer data-domain="voornameninliedjes.nl" src="https://analytics.voornameninliedjes.nl/js/plausible.js"></script>
        </Head>
        <slot className="app-section">
          <div className="chips">
            <Stack direction="row" spacing={1}>
              {props.chars && props.chars.map(pageChars =>
                <Chip label={pageChars} key={pageChars} onClick={() => handleClick({ pageChars })} color={chipColor(pageChars)} />
              )}
            </Stack>
          </div>
          <div className="masonry">
            <MyImageList songs={props.songs} />
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

.chips {
  padding-top: 2%;
}

.masonry {
  padding-top: 3%;
  margin-left: 3%;
  margin-right: 3%;
}
    `}</style>
    </Layout>
  )
};

export async function getServerSideProps({ query }) {
  const selectedChars = query.characters ? query.characters : 'a,b,c';
  const charsPerPage = ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqr', 'stu', 'vwxyz']

  const res = await fetch(`https://api.voornameninliedjes.nl/songs?first-characters=${selectedChars}`);
  const data = await res.json();

  console.log(`Song data fetched. Count: ${data.length}`);

  return {
    props: {
      songs: data.map(entry => entry),
      chars: charsPerPage,
      currSel: selectedChars
    }
  };
}

export default Index;