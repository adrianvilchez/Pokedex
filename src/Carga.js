import React from 'react';
import cargando from './imagenes/cargando.gif';

export default class Carga extends React.Component {
  render () {
    return (
      <div className="cargando">
        <img src={cargando} alt="" />
      </div>
    )
  }
}