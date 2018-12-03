import React from 'react';
import SelectFilms from './selectFilms.js';

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
    // debugger
    this.setState({ characters : [] })
    let films = this.state.films
    films.map(film => {
      if(film.title === event.target.value){
        film.characters.map(character => {
          fetch(character)
            .then(response => response.json())
            .then(response => {
              this.setState({ characters : [ ...this.state.characters, response.name ] })
            })
        })
      }
    })
  }

  showStarship(person){
    return (event) => {
      this.setState({ starships : [] })
      let starshipsURLs = person.starships
      const starshipRequest = starshipsURLs.map(starship => {
        return fetch(starship).then(response => response.json())
      })
      Promise.all(starshipRequest).then(responses => {
        this.setState({ starships: responses.map(response => response.name) })
      })
    }
  }

  render() {

    const people = this.state.people
    const films = this.state.films
    const characters = this.state.characters
    const starships = this.state.starships
    console.log('starships: ', starships)

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
        <SelectFilms films={this.state.films} characters={this.state.characters} showCharacters={ this.showCharacters }/>
      </div>
    )
  }
}
