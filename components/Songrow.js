import Link from 'next/link';

export default function Songrow(props) {
  return (
    <div className="song-row">
      <Link href="/song/[id]" as={`/song/${props.song.id}`}>
        <a><p>{props.song.title} - {props.song.artist}</p></a>
      </Link>
      <style jsx>{`
.song-row {
  font-size: 1.0em;
  font-weight: 150;
}

.song-row a {
  color: white;
  text-decoration: none;
}

.song-row a:hover {
  color: orange;  
}

.song-row {
  padding-bottom: 0.25em;
}

.song-row p {
  font-weight: 75;
}
        `}
      </style>
    </div>
  )
}
