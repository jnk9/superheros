import Axios from 'axios';
import React, { Component } from 'react';
import './App.css';

import Card from './Card'
import Spinner from "./Spinner";

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchName: '',
      heroes: []
    }

    this.handleSearchNameChange = this.handleSearchNameChange.bind(this)
  }
  handleSearchNameChange(event) {
    this.setState({ searchName: event.target.value }, () =>
      this.searchSuperHeroByName(this.state.searchName)
    );
  }

  searchSuperHeroByName(name) {
    this.setState({ loading: true, heroes: [] });
    Axios.get("https://superheroapi.com/api.php/692608721639099/search/" + name)
      .then(response => response.data)
      .then(data => {
        if (data.response === "success") {
          this.setState({ heroes: data.results });
        } else {
          this.setState({ heroes: [] });
        }
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Super Heroes App</h1>
        <div className="container">
          <div className="input-group mb-3">
            <input type="text"
              placeholder="Ingresar nombre super heroe"
              className="form-control"
              value={this.state.searchName}
              onChange={this.handleSearchNameChange}
            />
          </div>
        </div>
        <div className="container d-flex flex-wrap justify-content-center">
          {this.state.loading && <Spinner />}
          {this.state.heroes.map(hero => {
            return (
              <Card key={hero.id}
                name={hero.name}
                imageUrl={hero.image.url}
              />
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;
