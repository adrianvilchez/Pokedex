import React from 'react';

export default class Peso extends React.Component {
  render () {
    return (
      <div className="peso">
        {this.props.peso / 10 } Kg
      </div>
    )
  }
}