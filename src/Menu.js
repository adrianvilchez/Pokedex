import React from 'react';

export default class Menu extends React.Component {
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