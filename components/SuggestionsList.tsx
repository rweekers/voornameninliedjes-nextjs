import { Song } from '../types/song'
import { PropsWithChildren, useEffect, useState } from 'react'

interface Props {
    show: boolean
    songs: Song[]
    selectSong: (song: Song) => void
    suggestionIndex: number
    onSuggestionIndexChange: (i: number) => void
}

export default function SuggestionsList(props: PropsWithChildren<Props>) {

    const [lastMoved, setLastMoved] = useState('')
    const [index, setIndex] = useState(-1)

    // Een methode om uit te voeren wanneer de muis over een item beweegt
    const handleMouseOver = (index: number) => {
        setIndex(index)
        setLastMoved('mouse')
        props.onSuggestionIndexChange(index)
    }

    const handleKey = () => {
        setLastMoved('keyboard')
    }

    useEffect(() => {
        setLastMoved('keyboard')
        setIndex(props.suggestionIndex)
    }, [props.suggestionIndex])

    return (
        <div className="suggestions-list" hidden={!props.show}>
            {(props.songs.length) ? (
                <ul className="suggestions" onKeyDown={() => handleKey()}>
                    {props.songs.map((song, idx) => {
                        const songKey = `${song.artist}-${song.title}`

                        // Flag the active suggestion with a class
                        const className = ((idx === index && lastMoved === 'keyboard') || (index === idx && lastMoved === 'mouse')) ?
                            'suggestion-active'
                        :
                            ''
                        

                        return (<li key={songKey} className={className} onMouseOver={() => handleMouseOver(idx)} onClick={() => props.selectSong(song)}>{song.artist} - {song.title}</li>)
                    })}
                </ul>)
                : (
                    <ul className="suggestions not-found">
                        <li>-- Geen resultaten gevonden --</li>
                    </ul>
                )
            }
            <style jsx>{`
.suggestions-list {
    position: absolute;
    z-index: 2;
    top: 100%;
    left: 18%;
}
.suggestions {
    color: white; 
    font-family: Roboto, Open Sans, sans-serif;
    font-size: 0.6em;
    font-weight: 300;
    border: 1px solid #999;
    list-style: none;
    margin-top: 0;
    // max-height: 143px;
    overflow-y: auto;
    padding-left: 0;
    width: calc(300px + 1rem);
}

@media (max-width: 768px) {
    .suggestions {
      width: calc(250px + 1rem);
    }
    .suggestions-list {
      left: 15%;
    }
  }
  
  @media (max-width: 480px) {
    .suggestions {
      font-size: 0.5em;
      width: calc(200px + 1rem);
    }
    .suggestions-list {
      left: 12%;
    }
  }

.suggestions li {
    background-color: #282c34;;
    padding: 0.5rem;
}

.suggestions .suggestion-active {
  background-color: rgb(255, 140, 0);
  color: black;
}

.suggestions li:not(:last-of-type) {
  border-bottom: 1px solid #999;
}

.not-found {
    color: grey;
    font-style: italic;
}
        `}
            </style>
        </div>
    )
}
