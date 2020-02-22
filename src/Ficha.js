import React from 'react';
import ReactDOM from 'react-dom';

import IdPokemon from './IdPokemon.js';
import ImagenPokemon from './ImagenPokemon.js';
import Nombre from './Nombre.js';
import Peso from './Peso.js';
import Tipo from './Tipo.js';
import Habilidad from './Habilidad.js';

export default class Ficha extends React.Component {

  cerrarFicha = () => {

    let fichaPokemon = document.getElementById('fichaPokemon');
    ReactDOM.unmountComponentAtNode(fichaPokemon);
}

  render () {
    return (
      <div className='pokemon'>
        <button className="cerrarFicha" onClick = {() => this.cerrarFicha()}>X</button>
              
      <IdPokemon id = {this.props.id}/>
      <hr />

      <ImagenPokemon nombre = {this.props.nombre} imagen = {this.props.imagen}/>

      <hr />
      <p>Nombre:</p>
      <Nombre nombre = {this.props.nombre}/>

      <p>Peso:</p>
      <Peso peso =  {this.props.peso}/>

      <hr />
      <p>Tipo:</p>
      <hr />
      <div className="tipos">
        {this.props.tipos.map(tip => (
          // <Tipo tipo =  {item.type.name}/>
          <Tipo key={tip.type.name} tipo = {tip.type.name}/>
        ))}
      </div>

      <hr />
      <p>Habilidades:</p>
      <hr />
      <div className="habilidades">
        {this.props.movimientos.map(function(mov, i) {
          if (i < 6) {
            return <Habilidad key = {i} habilidad = {mov.move.name}/>
          }
        })}
      </div>
    </div>
    )
  }
}