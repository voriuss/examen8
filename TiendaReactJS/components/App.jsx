import React from 'react';
import { BrowserRouter as Router, Route, Link, IndexRoute } from 'react-router-dom'
import update from 'immutability-helper'; //Manejo de arrays
import * as firebase from 'firebase';
import {IntlProvider, FormattedMessage} from 'react-intl';

import BarraNavegacion from './tienda/BarraNavegacion.jsx';
import Carrito from './tienda/Carrito.jsx';
import Tienda from './tienda/Tienda.jsx';
import Catalogo from './tienda/Catalogo.jsx';
import Producto from './tienda/Producto.jsx';

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      catalogo: [],
      productos: [],
      listaCarrito : [],
    }
  }
  //----------------------------------------------------------------------------
  componentWillMount(){

  }
  //----------------------------------------------------------------------------
  render(){
    return(
      <div className="tienda row">
        <div className="container">
          <Route exact path='/tienda/catalogo' activeClassName="active"  component={ Tienda }/>
          <Route exact path='/tienda/carrito'  activeClassName="active" component={ Carrito  }/>
          <Route path='/tienda/producto/:idProducto'  activeClassName="active" component={ Producto } />
        </div>
      </div>
    )
  }
    //=============================================================================
    //             Guardar Items en el carrito
    //--------------Actualizar Disponible------------------------------------------
    /*actualizarDisponible(item, cantidad, devolver:booleran = false){
      for (let productoLista of this.state.productos){
        if (productoLista.id == item.id){
          if(devolver == false){
            this.verificarCarrito(item, cantidad)
            productoLista.disponible = (Number(productoLista.disponible) - Number(cantidad))
          }
          else{
            productoLista.disponible = (Number(productoLista.disponible) + Number(cantidad))
          }
          this.setState({productos : this.state.productos})
          this.setState({listaCarrito : this.state.listaCarrito})
          this.contadorCarrito()
        }
      }
    }*/

    //-------------------------------------------------------------
    /*verificarCarrito(item, cantidad){
      if(this.guardarCarrito(item, cantidad) == false){
        this.state.listaCarrito.push(item)
      }
      sessionStorage.setItem("Carrito", JSON.stringify(this.state.listaCarrito));
    }
    //-----------------------------------------------------
    itemsCarrito(){
      if(sessionStorage.getItem("Carrito")){
        //this.state.listaCarrito = JSON.parse(sessionStorage.getItem("Carrito"));
        return JSON.parse(sessionStorage.getItem("Carrito"));
      }
      return [];
    }*/
    //-----------------------------------------------------
    /*contadorCarrito(){
      return this.itemsCarrito().length
    }*/
  }
  export default App;
