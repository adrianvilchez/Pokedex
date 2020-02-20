import React from 'react';
import pokeball from './imagenes/pokeball.png';

export default class ImagenPokemon extends React.Component {
  render () {
    return (
      <div className="imagenPokemon">
        <img src={this.props.imagen || pokeball} alt={this.props.nombre} />
      </div>
    )
  }
}