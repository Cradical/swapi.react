import React from 'react'

const SelectFilms = ({ films, characters, showCharacters }) => {
    console.log('films: ', films)
    console.log('characters: ', characters)

    return(
      <div>
        <div className="film-list">
          <h2>Select A Movie</h2>
          <select onChange={showCharacters}>
            { films.map(film => {
              return (
                <option key={film.episode_id}>{film.title}</option> 
              )
            }) }
          </select>
        </div>
        <div>
          <ul className="movie-characters">
            {characters.map(character => {
              return (
                <li key={character}>{character}</li>
              )
            })}
          </ul>
        </div>
      </div>
    )
} 

export default SelectFilms