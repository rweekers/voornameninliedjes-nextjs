import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="app-footer">
      <p></p>
      <div>
        <h1>&copy; {new Date().getFullYear()} OrangeFlamingo
        </h1>
        <a id="footerText" href="mailto:info@voornameninliedjes.nl"> e-mail</a></div><a href="https://debian.org" target="blank">
        <div className="debian-logo">
          <Image src="/debian-logo.webp" width={53} height={10} alt="logo-debian" />
        </div>
      </a>
      <style jsx>{`
.app-footer {
  height: 20px;
}

.app-footer h1 {
  font-family: Roboto, Open Sans, sans-serif;
  color: white;
  font-size: 0.9em;
  font-weight: 300;
  display: inline;
}

.debian-logo {
  max-height: 10px;
  padding: 0 10px 0 0;
  vertical-align: middle;
  border-style: none;
}
      `}</style>
    </footer>
  )
}
