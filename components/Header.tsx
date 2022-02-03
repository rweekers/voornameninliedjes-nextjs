import Image from 'next/image'
import Link from 'next/link'

type Props = {
  some?: string
}

export const Header = <PROPS extends Props & React.HTMLAttributes<any>,>({ some, ...rest }: PROPS): JSX.Element => {
  return (
    <header className="app-header">
      <Link href='/' passHref>
        <div className="app-logo-container">
          <div className="app-logo">
            <Image src="/record_gold.webp" width={60} height={60} className="app-logo" alt="logo" />
          </div>
        </div>
      </Link>
      <h1>Voornamen <span>in liedjes</span></h1>
      <p></p>
      <style jsx>{`
.app-header h1 {
  color: #D4AF37;
  font-family: Noto Sans Mono, monospace;
  font-size: 5em;
  font-weight: 300;
  padding: 0% 3% 0% 3%;
}

@media (max-width: 350px) {
  .app-header h1 {
      font-size: 3em;
  }
}


.app-header h1 span::before {
  slot: "\A";
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
    min-height: 80px;
  }
  .app-header h1 {
    color: black;
  }
}

.app-logo-container {
  padding-left: 0.5%;
}

.app-logo {
  max-height: 60px;
  padding: 0 0 0 00%;
}
      `}</style>
    </header>
  )
}
