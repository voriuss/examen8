import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router'; ¿
//======================Importar Servicios======================================
import { AuthService } from "../../../services/auth.service";
import { TiendaService} from '../../../services/tienda.service';
import { CarritoService} from '../../../services/carrito.service';
import { BarraSuperiorComponent  } from '../../barra-superior/barra-superior.component';
//======================Importar Modelos========================================
import { Producto } from '../../../models/Producto';
import { ProductoCarrito } from '../../../models/ProductoCarrito';
//==============================================================================

@Component({
  selector: 'detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
  private informacionProducto : Producto;
  private productoCarrito : ProductoCarrito;

  constructor(private tiendaService : TiendaService,
    private router : Router,
    private auth : AuthService,
    private carritoService : CarritoService,
    private activatedRoute : ActivatedRoute) { }

    ngOnInit() {
      if (!this.auth.checkSession()){
        this.router.navigate(['/login'])
      }else{
        this.detalleProducto()
      }
    }
    //------------------------------------------------------------------------------
    detalleProducto(){
    this.activatedRoute.params.subscribe(params => {
      if(this.tiendaService.cargarCatalogo()){
        this.informacionProducto = this.tiendaService.getDetalleProductos(params['id']);
      }else{
        this.tiendaService.getProductos().subscribe(
          () => {
            this.checkCarrito();
            this.informacionProducto = this.tiendaService.getDetalleProductos(params['id']);
          })
        }
      });
    }
    //------------------------------------------------------------------------------------
    agregarProducto(id:number, value:number){
    for (let item of this.tiendaService.productosCatalogo){
      if(item.id == id){
        if(item.disponible < value){
          window.alert('Máxima existencia es: '+ item.disponible);
        }else{
          let cantidadActual = item.disponible;
          this.productoCarrito = {
            "id": item.id,
            "descripcion": item.descripcion,
            "imagen": item.imagen,
            "precio": item.precio,
            "cantidad": value
          }
          this.carritoService.verificarCarrito(this.productoCarrito);
          item.disponible = cantidadActual - value;

        }
      }
    }
  }
  //---------------------------------------------------------------------------
  obtenerCantidad(id:number){
    for(let item of this.carritoService.listaCarrito){
      if(item.id == id){
        return item.cantidad
      }
    }
    return null
  }
  //----------------------------------------------------------------------------
  checkCarrito(){
    for(let itemCarrito of this.carritoService.listaCarrito){
      this.tiendaService.actualizarDisponible(itemCarrito.id, itemCarrito.cantidad)
    }
  }
  //-----------------------------------------------------------------------------
  navegacionAtras(id:number){
    let value = Number(id-1);
    if(value >= 0){
      return value;
    }
    return id
  }
  //------------------------------------------------------------------------------
  navegacionSiguiente(id:number){
    if(id < this.tiendaService.cargarCatalogo().length){
      let value = Number(id+1);
      return value;
    }
    return id
  }
}
