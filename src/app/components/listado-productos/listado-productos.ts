import { Component } from '@angular/core';
import { ComponenteProducto } from '../producto/producto';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-listado-productos',
  imports: [ComponenteProducto, FormsModule],
  templateUrl: './listado-productos.html',
  styleUrl: './listado-productos.css',
})
export class ComponenteListadoProductos {

  titulo:string="Listado de Productos";
  
  productos: Producto[] = [
    new Producto('Pantalón', 130.0),
    new Producto('Camisa', 80.0),
    new Producto('Polera', 50.0),
  ];

  descripcionInput: string = '';
  precioInput: number | null = null;
  productoEditando: Producto | null = null;

  guardarProducto() {
    //Validación simple para evitar productos sin descripción o con precio cero
    if (this.descripcionInput.trim() === '' || this.precioInput == null || this.precioInput <= 0) {
      console.log('Debe ingresar una descripción y un precio válidos');
      return;
    }

    //Validación para la edición
    if (this.productoEditando) {
      this.productoEditando.descripcion = this.descripcionInput;
      this.productoEditando.precio = this.precioInput;
      this.productoEditando = null;
    }else{
      const producto = new Producto(this.descripcionInput, this.precioInput);
      this.productos.push(producto);
    }
    
    //Limpia los campos de entrada después de agregar el producto
    this.descripcionInput = '';
    this.precioInput = 0;
  }

  editarProducto(producto:Producto){
    this.productoEditando = producto;
    this.descripcionInput = producto.descripcion;
    this.precioInput = producto.precio;
  }

  eliminarProducto(producto:Producto){
    const indice = this.productos.indexOf(producto);
    console.log(indice);
    if(indice!==-1){
      this.productos.splice(indice,1);
    }

    //Si se estaba editando ese producto, limpiar el formulario
    if (this.productoEditando === producto) {
      this.productoEditando = null;
      this.descripcionInput = '';
      this.precioInput = null;
    }
  }

}
