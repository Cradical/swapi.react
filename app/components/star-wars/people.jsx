import React from 'react';

export default class People extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [],
      films: []
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

  // renderFilms(){
  //   this.state.films.map(film => {
  //     console.log('film: ', film)
  //   })
  //   // return(
  //   //   <div>

  //   //   </div>
  //   // )
  // }

  render() {

    const people = this.state.people
    const films = this.state.films
    
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Star Wars People</h1>
        <ul>
          {people.map(person =>
            <li key={person.url}>{person.name}</li>
          )}
        </ul>
        <div className="film-list">
          <h2>Select A Movie</h2>
          <select>
            { films.map(film => {
              console.log(film)
              return (
               <option key={film.episode_id}>{film.title}</option> 
              )
            }) }
          </select>
        </div>
      </div>
    )
  }
}
