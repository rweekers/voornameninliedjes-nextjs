import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';

export default function Songrow(props) {

  return (
    <div className="image-list">
      <ImageList variant={props.variant} cols={props.cols} sx={props.sx} gap={20}>
        {props.songs.map((song) => (
            <div className="detail-song" key={song.id}>
              <Link href="/[artist]/[title]" className="test" as={`/${encodeURIComponent(song.artist.replace('?', '').replace('/', '').toLowerCase())}/${encodeURIComponent(song.title.toLowerCase())}`} passHref>
                <ImageListItem key={song.id}>
                  {/* TODO Use Image from nextjs (not working directly with ImageListItem?) */}
                  <img
                    src={`${song.artistImage}?w=162&auto=format`}
                    srcSet={`${song.artistImage}?w=162&auto=format&dpr=2 2x`}
                    alt={song.title}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={song.title}
                    subtitle={song.artist}
                    position="bottom"
                  />
                </ImageListItem>
              </Link>
            </div>
        ))}
      </ImageList>
      <style jsx>{`
.detail-song {
  cursor: pointer
}
        `}
      </style>
    </div>
  )
}
