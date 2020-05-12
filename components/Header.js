import Link from 'next/link'
import styles from './Header.module.css'

const linkStyle = {
  marginRight: 15
}

export default function Header() {
  return (
      <header className="app-header"><a href='/'><img src="../record_gold.png" className="app-logo" alt="logo" /></a><h1>Voornamen <span>in liedjes</span></h1><p></p></header>
  )
}
