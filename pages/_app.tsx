import '../styles.css'
import App from 'next/app'
import Router from 'next/router'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}

export default MyApp