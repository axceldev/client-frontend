import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../models/producto';
import { ActivatedRoute, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';


@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  productoForm: FormGroup;
  titulo = 'Crear Producto'
  id: string | null;
  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _productService: ProductoService,
              private aRouter: ActivatedRoute) {
    this.productoForm = this.fb.group({
      producto:  ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto(){

    const productoObj : Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value
    }

    if (this.id !== null) {

      this._productService.editarPorducto(this.id, productoObj).subscribe(data =>{
        this.toastr.info('Producto actualizado con exito', 'Producto actulizado.');
        this.router.navigate(['/'])
      }, error =>{
        console.log(error);
        this.toastr.error('Error', 'Al actualizar el producto.');
        this.productoForm.reset();
      })

    }else{

      this._productService.guardarProducto(productoObj).subscribe(data =>{
        this.toastr.success('Producto registrado con exito', 'Producto Registrado');
        this.router.navigate(['/'])
      }, error =>{
        console.log(error);
        this.toastr.error('Error', 'Al registrar el producto.');
        this.productoForm.reset();
      });

    }
  }

  esEditar(){
    if (this.id !== null) {
      this.titulo = 'Editar Producto';
      this._productService.obtenerProducto(this.id).subscribe(data =>{
        this.productoForm.setValue({
          producto:  data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio,
        })
      })
    }
  }

}
