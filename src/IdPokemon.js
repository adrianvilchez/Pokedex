import React from 'react';

export default class IdPokemon extends React.Component {
  render () {
    return (
      <div className="id">
        <p>#{this.props.id}</p>
      </div>
    )
  }
}