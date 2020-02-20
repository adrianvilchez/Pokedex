import React from 'react';
import classnames from 'classnames';

export default class Tipo extends React.Component {
  render () {
    return (
      <div className={classnames("tipo", this.props.tipo)}>{this.props.tipo}</div>  
    );
  }
}