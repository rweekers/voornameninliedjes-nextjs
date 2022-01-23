import Header from './Header'
import Aside from './Aside'
import Footer from './Footer'
import ScriptHeader from './ScriptHeader'

const layoutStyle = {
  // styling here
}

export default function Layout(props) {

  // TODO move headers etc here, create Footer component and move header component to Header.js

  return (
    <div className="app">
      <ScriptHeader />
      <Header className="app-header" />
      <Aside className="app-side-left" />
      <Aside className="app-side-right" />
      <slot className="app-section">
        {props.children}
      </slot>
      <Footer />
      <style global jsx>{`
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
  background-image: url('/header.webp');
  background-size: cover;
  height: 100%;
}

.app-section {
  padding-bottom: 0%;
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
  background-image: url('/left.webp');
  background-position: top left;
  background-size: 500px;
}

.app-side-right {
  grid-area: sidebar-two;
  background-image: url('/left.webp');
  background-position: top left;
  transform:scaleX(-1);
  background-size: 500px;
}

.app-footer {
  grid-area: footer;
  display: flex;
  justify-content: space-between;
  background-color: black;
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
`}</style>
    </div>
  )
}
