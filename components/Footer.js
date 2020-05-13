import { getStaticProps } from "../pages/song/[id]";

export default function Footer() {
  return (
    <footer className="app-footer"><p></p><div><h1>&copy; 2020 OrangeFlamingo </h1><a id="footerText" href="http://foo.bar">e-mail</a></div><a href="https://freebsd.org" target="blank"><img src="/freebsd-logo.png" className="freebsd-logo" alt="logo-freebsd" /></a></footer>
  )
}
