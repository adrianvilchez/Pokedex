import React from 'react';
import ReactDOM from 'react-dom';
import './pokedex.css';

// Importamos los componentes que formarán la web
// import Cabecera from './Cabecera.js';
// import Menu from './Menu.js';

// import PokeApi from './PokeApi.js';
import Carga from './Carga.js';
import IdPokemon from './IdPokemon.js';
import ImagenPokemon from './ImagenPokemon.js';
import Nombre from './Nombre.js';
import Peso from './Peso.js';
import Tipo from './Tipo.js';
import Habilidad from './Habilidad.js';
import Pie from './Pie.js';

class PokeApi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      cargando: true,
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
        if (pk.name.includes(e.toLowerCase())) {
          pokemonsFiltrados.push(pk);
        } else {
        }
      });

    } else if (e.length === 0){
      this.state.pokemons.forEach(pk => {
        if (pk.name.includes(e.toLowerCase())) {
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

        // cargando: true,
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
    const URL = "https://pokeapi.co/api/v2/pokemon/?limit=2000";
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
              pokemonsFiltrados: resp,
              cargando: false
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
    const { error, pokemonsFiltrados, cargando } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (cargando) {
       return (
         <div className="principal">
         <Cabecera/>
         <Menu onChange={this.datosInput} />

         <hr />

         <Carga/>  
         <Pie/>
       </div>
       );
     } else {
      return (
        <div className="principal">
        <Cabecera/>
        <Menu onChange={this.datosInput} />

        <hr />

        <div id='pokemons'>
          {pokemonsFiltrados.map(pokemon => (

            <div data-id={pokemon.id} id={pokemon.name} className='pokemon' onDoubleClick={(i) => this.handleClick(pokemon.id)} key={pokemon.id}>
              
              <IdPokemon id = {pokemon.id}/>
              <hr />

              <ImagenPokemon nombre = {pokemon.name} imagen = {pokemon.sprites.front_default}/>

              <hr />
              <p>Nombre:</p>
              <Nombre nombre = {pokemon.name}/>

              {console.log(pokemon)}

              <p>Peso:</p>
              <Peso peso =  {pokemon.weight}/>

              <hr />
              <p>Tipo:</p>
              <hr />
              <div className="tipos">
                {pokemon.types.map(tip => (
                  // <Tipo tipo =  {item.type.name}/>
                  <Tipo key={tip.type.name} tipo = {tip.type.name}/>
                ))}
              </div>

              <hr />
              <p>Habilidades:</p>
              <hr />
              <div className="habilidades">
                {pokemon.moves.map(function(mov, i) {
                  if (i < 6) {
                    return <Habilidad key = {i} habilidad = {mov.move.name}/>
                  }
                })}
              </div>
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
        
        <Pie/>
      </div>
      );
    }
  }
}

class Cabecera extends React.Component {
  render() {
     return (
      <header>
        <img src='https://images.wikidexcdn.net/mwuploads/esssbwiki/thumb/7/77/latest/20111028181540/TituloUniversoPok%C3%A9mon.png/550px-TituloUniversoPok%C3%A9mon.png' alt='' />
      </header>
     );
  }
}

class Menu extends React.Component {
  handleChange = (e) => {
    //console.log(e.target.value);
    this.props.onChange(e.target.value);
  }

  render() {
     return (
      <nav>
        <input className="busqueda" type="search" name="buscar" id="" placeholder="Buscar Pokemon..." onChange={this.handleChange}/>
      </nav>
     );
  }
}

class App extends React.Component {
  render() {
     return (
      <div>
        <Cabecera/>
        <Menu/>
        <PokeApi/> 
        <Pie/>
      </div>
     );
  }
}
// ========================================

ReactDOM.render(
  <PokeApi />, document.getElementById('root')
);