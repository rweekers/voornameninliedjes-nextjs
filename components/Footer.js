export default function Footer() {
  return (
    <footer className="app-footer">
      <p></p>
      <div><h1>&copy; {new Date().getFullYear()} OrangeFlamingo </h1><a id="footerText" href="http://foo.bar">e-mail</a></div><a href="https://freebsd.org" target="blank"><img src="/freebsd-logo.webp" height="10px" className="freebsd-logo" alt="logo-freebsd" /></a>
      <style jsx>{`
.app-footer {
  height: 20px;
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

img {
  vertical-align: middle;
  border-style: none;
}
      `}</style>
    </footer>
  )
}
