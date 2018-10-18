import React from 'react';

export default class People extends React.Component {
  constructor(props) {
    super(props);

    this.showCharacters = this.showCharacters.bind(this)
    this.showStarship = this.showStarship.bind(this)

    this.state = {
      people: [],
      films: [],
      characters: [],
      starships: []
    };
  }

  componentDidMount() {
    const component = this
    fetch('http://swapi.co/api/people/')  
      .then(function(response) {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject('Unable to fetch people')
        }
      }).then((body) => {
        const people = body.results
        component.setState({ people })
      })

      fetch('http://swapi.co/api/films/') 
      .then(response => response.json())
      .then(response => {
        this.setState({ films : response.results })
      })
  }

  showCharacters(event){
    this.setState({ characters : [] })
    let films = this.state.films
    films.map(film => {
      if(film.title === event.target.value){
        film.characters.map(character => {
          fetch(character)
            .then(response => response.json())
            .then(response => {
              this.setState({ characters : this.state.characters.concat([response.name]) })
            })
        })
      }
    })
  }

  showStarship(person){
    const component = this
    return function(event) {
      let starshipsURLs = person.starships
      starshipsURLs.map(starship => {
        fetch(starship)
          .then(response => response.json())
          .then(response => {
            component.setState({ starships : component.state.starships.concat([response.name]) })
          })
      })
    }
  }

  render() {

    const people = this.state.people
    const films = this.state.films
    const characters = this.state.characters
    const starships = this.state.starships
    
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Star Wars People</h1>
        <ul className="people">
          {people.map(person => {
            return(
              <li onClick={this.showStarship(person)} key={person.url}>{person.name}</li>
            )}
          )}
        </ul>
        <div>
          <h1>Character's Starship:</h1>
          <ul>{starships.map(ship => {
            return(
              <li key={ship}>{ship}</li>
            )
          })}</ul>
        </div>
        <div className="film-list">
          <h2>Select A Movie</h2>
          <select onChange={this.showCharacters}>
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
}
