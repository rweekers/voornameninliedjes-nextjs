import { Song } from '../types/song'
import { PropsWithChildren, useEffect, useState } from 'react'

interface Props {
    show: boolean
    songs: Song[]
    aboveLimit: boolean
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

                    {props.aboveLimit && (
                        <li key="more-suggestions" className="above-limit">
                            -- Meer resultaten beschikbaar --
                        </li>
                    )}

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
    left: 19%;
}
.suggestions {
    color: white; 
    font-family: Roboto, Open Sans, sans-serif;
    font-size: 0.5em;
    font-weight: 300;
    border: 1px solid #999;
    list-style: none;
    margin-top: 0;
    overflow-y: auto;
    padding-left: 0;
    width: calc(400px + 1rem);
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
      width: calc(200px + 1rem);
    }
    .suggestions-list {
      left: 20%;
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
    color: lightgrey;
    font-style: italic;
    font-size: 0.4em;
    font-weight: 200;
}
.above-limit {
    color: lightgrey;
    font-style: italic;
    font-size: 0.7em;
    font-weight: 200;
}
        `}
            </style>
        </div>
    )
}
