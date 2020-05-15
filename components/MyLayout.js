import Header from './Header'
import Aside from './Aside'
import Footer from './Footer'

const layoutStyle = {
  // styling here
}

export default function Layout(props) {

  // TODO move headers etc here, create Footer component and move header component to Header.js

  return (
    <div className="app">
      <Header />
      <Aside className="app-side-left" />
      <Aside className="app-side-right" />
      <content className="app-section">
        {props.children}
      </content>
      <Footer />
      <style global jsx>{`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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
  background-image: url('/header.jpeg');
  background-size: cover;
  height: 100%;
}

.app-logo {
  max-height: 60px;
  padding: 0 0 0 10%;
}

.app-logo {
  animation: appLogoSpin infinite 20s linear;
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
  background-image: url('/left.jpeg');
  background-position: top left;
  background-size: 500px;
}

.app-side-right {
  grid-area: sidebar-two;
  background-image: url('/right.jpeg');
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

@keyframes appLogoSpin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`}</style>
    </div>
  )
}
