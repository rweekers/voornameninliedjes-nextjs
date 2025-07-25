import Image from 'next/legacy/image'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import Link from 'next/link'
import IconButton from '@mui/material/IconButton'
import InfoIcon from '@mui/icons-material/Info'
import Tooltip from '@mui/material/Tooltip'
import Masonry from '@mui/lab/Masonry'
import { Song } from '../types/song'
import { PropsWithChildren } from 'react'

interface Props {
  songs: Song[]
}

export default function Songrow(props: PropsWithChildren<Props>) {

    return (
    <div className="image-list">
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={1}>
        {props.songs.length && props.songs.map((song: Song, index: number) => (
          <div className="detail-song" key={index}>
            <Link href={{
              pathname: '/[artist]/[title]',
              query: {
                artist: encodeURIComponent(song.artist.replace('?', '').replace('/', '').toLowerCase()),
                title: encodeURIComponent(song.title.replace('?', '').replace('#', '').toLowerCase())
              },
            }} passHref>
              <ImageListItem>
                {song.artistImage &&
                  <Image src={`https://images.voornameninliedjes.nl/${song.localImage}`} alt={song.title} title={song.artistImageAttribution} placeholder="blur" blurDataURL={`data:image/png;base64,${song.blurredImage}`} priority={true} quality={100} width={song.artistImageWidth} height={song.artistImageHeight} />
                }
                <ImageListItemBar
                  title={song.title}
                  subtitle={song.artist}
                  actionIcon={
                    song.hasDetails ? (
                      <Tooltip title="Nederlandse achtergrond">
                        <IconButton
                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        >
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    ) : ('')}
                  position="bottom"
                />
              </ImageListItem>
            </Link>
          </div>
        ))}
      </Masonry>
      <style jsx>{`
.detail-song {
  cursor: pointer
}
        `}
      </style>
    </div>
  )
}
