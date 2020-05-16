import '../styles.css'
import App from "next/app"
import Router from 'next/router'

class MyApp extends App {
  componentDidMount() {
    Router.events.on("routeChangeStart", url => {
      if (window && window._paq) {
        window._paq.push(["setCustomUrl", url]);
        window._paq.push(["setDocumentTitle", document.title]);
        window._paq.push(["trackPageView"]);
      }
    });
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp;