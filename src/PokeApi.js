import React from 'react';
import Cabecera from 'Cabecera.js';
import Peso from 'Peso.js';

export default class PokeApi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      estaBuscando: false,
      isLoaded: false,
      pokemons: [],
      pokemon: null,
      userInput: null,
      habilidades: [],
      pokemonsFiltrados: []
      
    };
  }

  datosInput = (e) => {

    const pokemonsFiltrados = [];

    console.log(e);

    if (e.length >= 3) {
      this.state.pokemons.forEach(pk => {
        if (pk.name.includes(e)) {
          pokemonsFiltrados.push(pk);
        }
      });
    }

    this.setState({
      pokemonsFiltrados
    })
    
  }
  
  datosPokemon(url) {
     return fetch(url)
     .then(res => res.json())
     .then(resp => {
       return resp;
     })
  }

  handleClick = (i) => {
    this.setState({
        pokemon: this.state.pokemons[ - this.state.pokemons.length + (this.state.pokemons.length - 1 + i)],

        estaBuscando: true,
    });
    
    
   /*setTimeout(() => {
      console.log('this is:', this.state.pokemon );

      this.setState({
        habilidades: this.state.pokemon.moves
      });

      console.log(this.state.habilidades[2]);
      

    }, 1000); */
  }

  componentDidMount() {

    let pokemonImagen = [];

    //const URL = "https://pokeapi.co/api/v2/pokemon-form/?limit=980";
    const URL = "https://pokeapi.co/api/v2/pokemon/?limit=150";
    fetch(URL)
      .then(res => res.json())
      .then(
        (result) => {

          result.results.forEach(poke => {

            
            pokemonImagen.push(this.datosPokemon(poke.url));
            
          });

          Promise.all(pokemonImagen).then(resp => {
            
            this.setState({
              isLoaded: true,
  
              // Almacenamos el contenido de cada pokemon (nombre y url) en pokemons
              pokemons: resp,
            })
            
          })
        }
      )

      /*fetch(pokemonAtributo)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          
        })*/

        
        
  }

  render() {

    
    const { error, isLoaded, pokemonsFiltrados, estaBuscando, habilidades } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Cargando...</div>;
    } else {
      return (
        <div>
        <Cabecera onChange={this.datosInput} />
        <div id='pokemons'>
          {pokemonsFiltrados.map(pokemon => (
            <div data-id={pokemon.id} id={pokemon.name} className='pokemon' onClick={(i) => this.handleClick(pokemon.id)} key={pokemon.name}>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <p>{pokemon.name}</p>
              {console.log(pokemon)}

              <Peso peso =  {pokemon.weight}/>
            </div>
          ))}

          {/* <div className='ventanaPokemon'>
            {habilidades.map(habilidad => (
              <div key={habilidad.move.name}>
                <p>{habilidad.move.name}</p>
              </div>
            ))}
          </div> */}
          
        </div>
      </div>
      );
    }
  }
}