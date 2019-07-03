import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  constructor(props) {
    super(props);
    // charmeleon image wasn't working, so we flipped it backwards by default
    this.state = {
      flipped: props.pokemon.name === "charmeleon" ? true : false
    };
  }
  findHp = (pokemon) => {
    // or without passing an arg we could do: const pokemon = this.props.pokemon;
    return pokemon.stats.find(stat => stat.name === "hp").value

    // Equivalent to:
    // const stat = pokemon.stats.find(stat => {
    //  return stat.name === "hp"
    // }
    // return stat.value;
  }
  handleFlip = () => {
    this.setState(prevState => {
      return {flipped: !prevState.flipped}
    })
  }
  render() {
    const pokemon = this.props.pokemon;
    return (
      <Card onClick={this.handleFlip}>
        <div>
          <div className="image">
            <img alt="oh no!" src={!this.state.flipped ? pokemon.sprites.front : pokemon.sprites.back}/>
          </div>
          <div className="content">
            <div className="header">{pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.findHp(pokemon)} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
