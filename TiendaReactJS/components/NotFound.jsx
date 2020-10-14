
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import BarraNavegacion from './tienda/BarraNavegacion.jsx';

class NotFound extends React.Component{
constructor(props) {
  super(props)
  this.state = {
  }
}
//--------------------------------------------------------------
componentWillMount(){
}
render(){
  if(!sessionStorage.getItem('Session')){
    return <Redirect to="/" />
  }

  return(
    <div className="error row">
      <div className="container">
        <BarraNavegacion contador={this.contadorCarrito()}/>
        <div className="left lista-productos box">
          <div className="col s12 blue darken-1 animated fadeInDown fast">
            <h4 className="col s12 white-text left center-align ">Página no encontrada</h4>
          </div>
          <div className="col s12 center-align" style={{padding: '5%'}}>
            <div  style={{height : 'calc(70vh - 100px)', display : 'table-cell', verticalAlign : 'middle'}} ><img style={{height : '100px',}} src="../../assets/img/error.png"/> <h5>Hubo un error al cargar la página. Lo invitamos a dar un paseo por nuestra <Link to="/tienda">Tienda Virtual</Link></h5></div>
          </div>
        </div>
      </div>
    </div>
  )
}

//------------------------------------------------------------------------------

itemsCarrito(){
  if(sessionStorage.getItem("Carrito")){
    this.state.listaCarrito = JSON.parse(sessionStorage.getItem("Carrito"));
    return JSON.parse(sessionStorage.getItem("Carrito"));
  }
  return 0;
}
//--------------------Contador de items en menu---------------------------------
contadorCarrito(){
  return this.itemsCarrito().length
}
}
export default NotFound;
