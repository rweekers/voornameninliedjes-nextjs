export class SongPage {
    songs: Song[]
    totalItems: number
    isLast: boolean

    constructor(songs: Song[], totalItems:  number, isLast: boolean) {
        this.songs = songs
        this.totalItems = totalItems
        this.isLast = isLast
    }
}

export class Song {
    artist: string
    title: string
    hasDetails: boolean
    artistImage: string
    artistImageAttribution: string
    artistImageWidth: number
    artistImageHeight: number
    blurredImage: string
    localImage: string
    background: string
    wikipediaPage: string
    wikiContentNl: string
    wikiSummaryEn: string
    lastFmAlbum: LastFmAlbum
    youtube: string
    spotify: string
    albumName: string
    photos: Photo[]
    flickrPhotos: FlickrPhoto[]
    sources: Source[]
    tags: Tag[]

    constructor(artist: string, title: string, hasDetails: boolean, artistImage: string, artistImageAttribution: string, artistImageWidth: number, artistImageHeight: number, blurredImage: string, localImage: string, background: string, wikipediaPage: string, wikiContentNl: string, wikiSummaryEn: string, lastFmAlbum: LastFmAlbum, youtube: string, spotify: string, albumName: string, photos: Photo[], flickrPhotos: FlickrPhoto[], sources: Source[], tags: Tag[]) {
        this.artist = artist
        this.title = title
        this.hasDetails = hasDetails
        this.artistImage = artistImage
        this.artistImageAttribution = artistImageAttribution
        this.artistImageWidth = artistImageWidth
        this.artistImageHeight = artistImageHeight
        this.blurredImage = blurredImage
        this.localImage = localImage
        this.background = background
        this.wikipediaPage = wikipediaPage
        this.wikiContentNl = wikiContentNl
        this.wikiSummaryEn = wikiSummaryEn
        this.lastFmAlbum = lastFmAlbum
        this.youtube = youtube
        this.spotify = spotify
        this.albumName = albumName
        this.photos = photos
        this.flickrPhotos = flickrPhotos
        this.sources = sources
        this.tags = tags
    }
}

export class LastFmAlbum {
    url: string
    name: string
    mbid: string

    constructor(url: string, name: string, mbid: string) {
        this.url = url
        this.name = name
        this.mbid = mbid
    }
}

export class Source {
    url: string
    name: string

    constructor(url: string, name: string) {
        this.url = url
        this.name = name
    }
}

export class Tag {
    url: string
    name: string

    constructor(url: string, name: string) {
        this.url = url
        this.name = name
    }
}

export class Photo {
    url: string
    attribution: string

    constructor(url: string, attribution: string) {
        this.url = url
        this.attribution = attribution
    }
}

export class FlickrPhoto {
    url: string
    title: string
    owner: FlickrPhotoOwner
    license: FlickrPhotoLicense

    constructor(url: string, title: string, owner: FlickrPhotoOwner, license: FlickrPhotoLicense) {
        this.url = url
        this.title = title
        this.owner = owner
        this.license = license
    }
}

class FlickrPhotoOwner {
    username: string
    photoUrl: string

    constructor(username: string, photoUrl: string) {
        this.username = username
        this.photoUrl = photoUrl
    }
}

class FlickrPhotoLicense {
    name: string
    url: string

    constructor(name: string, url: string) {
        this.name = name
        this.url = url
    }
}