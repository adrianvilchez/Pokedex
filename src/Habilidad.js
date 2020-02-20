import React from 'react';

export default class Habilidad extends React.Component {
  render () {
    return (
      <div className="habilidad">{this.props.habilidad}</div>
    )
  }
}