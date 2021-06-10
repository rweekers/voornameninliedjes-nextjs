export default function Footer() {
  return (
    <footer className="app-footer">
      <p></p>
      <div><h1>&copy; {new Date().getFullYear()} OrangeFlamingo </h1><a id="footerText" href="http://foo.bar">e-mail</a></div><a href="https://debian.org" target="blank"><img src="/debian-logo.webp" height="10px" className="debian-logo" alt="logo-debian" /></a>
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

.debian-logo {
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
