import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from '../../services/producto.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {

  listarProductos: Producto[] = [];

  constructor(private _productoService: ProductoService,
              private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.obtenerProducto();
  }

  obtenerProducto(){

    this._productoService.getProductos().subscribe(data =>{
      console.log(data);
      this.listarProductos = data;
    }, error =>{
      console.log(error);
    })
  }

  eliminarProducto(id: any){
    this._productoService.eliminarProducto(id).subscribe(data =>{
      this.toastr.error('El producto fue eliminado','El producto ');
      this.obtenerProducto();
    }, error =>{
      console.log(error);
      this.toastr.error('Error','Error al eliminar');
    });
  }

}
