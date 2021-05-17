import Link from 'next/link';
import Markdown from 'react-markdown';

function highLightName(artist, title, name) {
  const markDownStart = '**';
  const markDownEnd = '**';

  const startIndex = title.indexOf(name);
  const endIndex = startIndex + name.length;
  const rowTitle = `${title} - ${artist}`;

  return `${rowTitle.substring(0, startIndex)}${markDownStart}${rowTitle.substring(startIndex, endIndex)}${markDownEnd}${rowTitle.substring(endIndex)}`;
}

export default function Songrow(props) {
  const fullSongTitle = highLightName(props.song.artist, props.song.title, props.song.name);

  return (
    <div className="song-row">
      <Link href="/[artist]/[title]" as={`/${encodeURIComponent(props.song.artist)}/${encodeURIComponent(props.song.title)}`}>
        <a><Markdown children={fullSongTitle} /></a>
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

.song-row .song-name {
  color: red;
}

.song-row a:hover {
  color: orange;  
}

.song-row {
  padding-top: 0.25em;
  padding-bottom: 0.15em;
}

.song-row a {
  font-weight: 75;
}

.song-row em {
  color: red;
}
        `}
      </style>
    </div>
  )
}
