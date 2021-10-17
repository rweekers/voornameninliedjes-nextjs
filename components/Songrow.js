import Link from 'next/link';
import Markdown from 'react-markdown';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

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
      <Link href="/[artist]/[title]" as={`/${encodeURIComponent(props.song.artist.replace('?', '').replace('/', '').toLowerCase())}/${encodeURIComponent(props.song.title.toLowerCase())}`} passHref>
        <Card>
          <CardContent>
            <Typography gutterBottom>
              <Markdown>{fullSongTitle}</Markdown>
            </Typography>
          </CardContent>
        </Card>
      </Link>
      <style jsx>{`
.song-row {
  font-size: 1.0em;
  font-weight: 100;
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
  font-weight: 100;
}

.song-row em {
  color: red;
}
        `}
      </style>
    </div>
  )
}
