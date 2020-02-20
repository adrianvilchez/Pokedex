import React from 'react';

export default class Nombre extends React.Component {
  render () {
    return (
      <div className="nombre">
        {this.props.nombre}
      </div>
    )
  }
}