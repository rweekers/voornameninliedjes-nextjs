import Layout from '../components/MyLayout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const Index = props => (
  <Layout>
    <div className="app">
      <header className="app-header"><Link href='/'><img src="./record_gold.png" className="app-logo" alt="logo" /></Link><h1>Voornamen <span>in liedjes</span></h1><p></p></header>
      <aside className="app-side-left" />
      <aside className="app-side-right" />
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
      <footer className="app-footer"><p></p><div><h1>&copy; 2020 OrangeFlamingo </h1><a id="footerText" href="http://foo.bar">e-mail</a></div><a href="https://freebsd.org" target="blank"><img src="./freebsd-logo.png" className="freebsd-logo" alt="logo-freebsd" /></a></footer>
    </div>

    <style jsx>{`
    * {
  margin: 0;
  padding: 0;
}

html {
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 62.5%; /* font-size 1em = 10px on default browser settings */ 
}

.app {
  display: grid;
  height: 100vh;
  grid-template-areas:
    "header"
    "sidebar-one"
    "content"
    "sidebar-two"
    "footer";
  grid-template-rows: 5fr 0fr 15fr 0fr 1fr;
}

.app-side-left.app-side-right { 
  display: none; 
}

.app > * {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.app-header {
  grid-area: header;
  display: flex;
  justify-content: space-between;
  background-color: black;
  background-image: url('./header.jpeg');
  background-size: cover;
  height: 100%;
}

.app-logo {
  max-height: 60px;
  padding: 0 0 0 10%;
}

.app-logo {
  animation: app-logo-spin infinite 20s linear;
}

.app-header h1 {
  color: #D4AF37;
  font-family: Andale Mono, monospace;
  font-size: 5.5em;
  font-weight: 350;
  padding: 0% 1% 0% 1%;
}

.app-header h1 span::before {
  content: "\A";
  white-space: pre;
}

@media (min-width: 1025px) {
  .app-header h1 span::before {
    content: normal;
    white-space: normal;
  }
  .app-header {
    background-image: none;
    background-color: darkorange;
  }
  .app-header h1 {
    color: black;
  }
}

.app-section {
  padding-top: 3%;
  padding-bottom: 1%;
  grid-area: content;
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.app-side-left {
  grid-area: sidebar-one;
  background-image: url('left.jpeg');
  background-position: top left;
  background-size: 500px;
}

.app-side-right {
  grid-area: sidebar-two;
  background-image: url('right.jpeg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 500px;
}

.app-footer {
  grid-area: footer;
  display: flex;
  justify-content: space-between;
  background-color: black;
}

.app-footer h1 {
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  color: white;
  font-size: 0.9em;
  font-weight: 300;
  display: inline;
}

.freebsd-logo {
  max-height: 10px;
  padding: 0 10px 0 0;
}

@media (min-width: 1025px) {
  .app {
    grid-template-areas:
      "header header header"
      "sidebar-one content sidebar-two"
      "footer footer footer";
    grid-template-rows: 3fr 25fr 1fr;
    grid-template-columns: 1fr 4fr 1fr;
  }
  .app-side-left.app-side-right {
    display: inline;
  }
}

.Songlist {
  font-size: 1.0em;
  font-weight: 150;
}

ul {
  list-style-type: none;
}

.Songlist a {
  color: white;
  text-decoration: none;
}

.Songlist a:hover {
  color: orange;  
}

{/* @keyframes app-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
} */}
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