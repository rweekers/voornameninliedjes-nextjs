import Head from 'next/head'

export default function ScriptHeader() {
    return (
        <Head>
            {/* Check for standard base css (used in react app), commented out for now */}
            {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
                integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous" /> */}
            <script type="text/javascript" dangerouslySetInnerHTML={{
                __html: ` var _paq = window._paq || [];
                    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
                    _paq.push(['trackPageView']);
                    _paq.push(['enableLinkTracking']);
                  (function () {
                        var u = "https://analytics.orangeflamingo.nl/";
                        _paq.push(['setTrackerUrl', u + 'matomo.php']);
                        _paq.push(['setSiteId', '1']);
                        var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
                        g.type = 'text/javascript'; g.async = true; g.defer = true; g.src = u + 'matomo.js'; s.parentNode.insertBefore(g, s);
                    })();
                `}} />

        </Head>
    )
}

