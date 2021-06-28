import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      visible: false,
      timer: 10,
      // timerRunning: true
    }
  }

  componentDidMount() {
    console.log('Component did mount')

  }

  componentDidUpdate() {
    console.log('component did update',)
    this.countdown = setInterval(() => 
      this.tick(), 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.countdown)
  }

  fetchPokemon() {
    // this.setState({ timerRunning: false, timeRemaining: 10 })
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      // setInterval(() => this.tick(), 1000);
      })
      .catch((err) => console.log(err))
  }


  tick(){
    if (this.state.timer > 0){
      this.setState({
        timer: this.state.timer - 1
      })
    }
  }


  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >{this.state.timer}</h1>
        <div className={'pokeWrap'}>
          <img className={'pokeImg'} src={this.state.pokeSprite} />
          <h1 className={'pokeName'}>{this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}


export default PokeFetch;