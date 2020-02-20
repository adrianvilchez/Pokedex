import React from 'react';

export default class Cabecera extends React.Component {

    handleChange = (e) => {
        //console.log(e.target.value);
        this.props.onChange(e.target.value);
        
      }

    render() {
       return (
        <header>
          <img src='https://images.wikidexcdn.net/mwuploads/esssbwiki/thumb/7/77/latest/20111028181540/TituloUniversoPok%C3%A9mon.png/550px-TituloUniversoPok%C3%A9mon.png' alt='' />

          <nav>
            <input className="busqueda" type="search" name="buscar" id="" placeholder="Buscar Pokemon..." onChange={this.handleChange}/>
          </nav> 
        </header>
       );
    }
  }