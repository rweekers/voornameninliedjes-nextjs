export default function Header() {
  return (
      <header className="app-header">
        <a href='/'><img src="../record_gold.png" className="app-logo" alt="logo" /></a>
        <h1>Voornamen <span>in liedjes</span></h1>
        <p></p>
        <style jsx>{`
.app-header h1 {
  color: #D4AF37;
  font-family: Andale Mono, monospace;
  font-size: 5.5em;
  font-weight: 350;
  padding: 0% 3% 0% 3%;
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
    min-height: 80px;
  }
  .app-header h1 {
    color: black;
  }
}

.app-logo {
  max-height: 60px;
  padding: 0 0 0 0%;
}

.app-logo {
  animation: spin 20s infinite linear;
  @keyframes spin {
    50% { transform: rotate(180deg); }
    100% { transform: rotate(360deg); }
  }
}
      `}</style>
      </header>
  )
}
