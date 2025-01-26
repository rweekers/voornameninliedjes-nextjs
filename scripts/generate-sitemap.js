const fs = require('fs')
const prettier = require('prettier')
const { DateTime } = require('luxon')

const EXTERNAL_DATA_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/songs`
const EXTERNAL_BASE_URL = 'https://www.voornameninliedjes.nl'

const createSitemap = (songs) =>
    songs
        .map(({ artist, title }) => {
            return `
                    <url>
                        <loc>${`${EXTERNAL_BASE_URL}/${encodeURIComponent(artist.replace('?', '').replace('/', '')).toLowerCase()}/${encodeURIComponent(title.replace('?', '').replace('$', '')).toLowerCase()}`}</loc>
                        <lastmod>${DateTime.now().setZone('Europe/Amsterdam').toISO()}</lastmod>
                    </url>
                `
        })
        .join('')
    ;

(async () => {
    const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')
    const request = await fetch(EXTERNAL_DATA_URL)
    const songs = await request.json()

    const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${createSitemap(songs)}
        </urlset>
    `

    // If you're not using Prettier, you can remove this.
    const formatted = prettier.format(sitemap, {
        ...prettierConfig,
        parser: 'html'
    })

    fs.writeFileSync('public/sitemap.xml', formatted)
})()