import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemons: [],
      filteredPokemons: [],
      mostRecentlyFlipped: null
    };
  }

  componentDidMount(){
    fetch("http://localhost:3000/pokemon")
    .then(res => res.json())
    .then(res => {
      this.setState({
        pokemons: res,
        filteredPokemons: res
      })
    })
  }

  // we can infer that Search contains some code like:
  // this.props.onSearchChange(event, props)
  searchCallback = (e, semanticProps) => {
    console.log('🤔')
    const query = semanticProps.value;

    this.setState(prevState => {
      const filteredPokemons = prevState.pokemons.filter(pokemon => {
        return pokemon.name.includes(query);
      });
      return {filteredPokemons: filteredPokemons};
    })
  }

  setMostRecentlyFlipped = (name) => {
    this.setState({mostRecentlyFlipped: name});
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        The most recently flipped pokemon is: {this.state.mostRecentlyFlipped}
        <br />
        <Search onSearchChange={_.debounce(this.searchCallback, 500)} showNoResults={false} />
        <br />
        <PokemonCollection pokemons={this.state.filteredPokemons} onCollectionClick={this.setMostRecentlyFlipped}/>
        <br />
        <PokemonForm />
      </div>
    )
  }
}

export default PokemonPage
