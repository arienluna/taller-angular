import { ChangeDetectorRef, Component } from '@angular/core';
import { ComponenteProducto } from '../producto/producto';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/producto.model';
import { DatosServicio } from '../../services/datos-servicio';

@Component({
  selector: 'app-listado-productos',
  imports: [ComponenteProducto, FormsModule],
  templateUrl: './listado-productos.html',
  styleUrl: './listado-productos.css',
})
export class ComponenteListadoProductos {

  titulo:string="Listado de Productos";
  
  productos: {[llave:string]:Producto}={};

  constructor(
    private datosServicio:DatosServicio, 
    private cdr:ChangeDetectorRef)
  {}
  ngOnInit(){
    this.cargarProductos();
  }

  cargarProductos(){
    this.datosServicio.cargarProductos().subscribe((productos: {[llave:string]: Producto}) => {
      this.productos = productos;
      this.cdr.detectChanges();
    });
  }

  obtenerLlaves(): string[]{
    if(this.productos){
      return Object.keys(this.productos);
    }
    return [];
  }

  descripcionInput: string = '';
  precioInput: number | null = null;
  errorValidacion:string='';
  productoEditando: Producto | null = null;
  llaveProducto:string|null=null;

  guardarProducto(evento:Event) {
    evento.preventDefault();
    
    //Validación simple para evitar productos sin descripción o con precio cero
    if (this.descripcionInput.trim() === '' || this.precioInput == null || this.precioInput <= 0) {
      this.errorValidacion='Debe ingresar una descripción y un precio válidos';
      console.log(this.errorValidacion)
      return;
    }else{
      this.errorValidacion='';
    }

    //Valida que no exista una llave para agregar el nuevo producto
    if(this.llaveProducto===null){
      const producto = new Producto(this.descripcionInput, this.precioInput!);
      this.datosServicio.guardarProducto(producto).subscribe(() => {
        this.cargarProductos();
      });
    }else{  //Si existe una llave, edita el producto existente
      this.productoEditando!.descripcion = this.descripcionInput;
      this.productoEditando!.precio = this.precioInput;
      this.datosServicio.modificarProducto(this.productoEditando!,this.llaveProducto).subscribe(() => {
        this.cargarProductos();
      });
      this.productoEditando = null;
    }
    this.cdr.detectChanges();

    //Limpia los campos de entrada después de agregar el producto
    this.descripcionInput = '';
    this.precioInput = null;
  }

  editarProducto(producto:Producto,llave:string){
    this.llaveProducto=llave;
    this.productoEditando = producto;
    this.descripcionInput = producto.descripcion;
    this.precioInput = producto.precio;
  }

  eliminarProducto(producto:Producto,llave:string){
    this.llaveProducto=llave;
    if(this.llaveProducto !== null){
      this.datosServicio.eliminarProducto(this.llaveProducto).subscribe(() => {
        console.log(`Producto con llave ${this.llaveProducto} eliminado.`);
        this.cargarProductos();
      });;
    }

    //Si se estaba editando ese producto, limpiar el formulario
    if (this.productoEditando === producto) {
      this.productoEditando = null;
      this.descripcionInput = '';
      this.precioInput = null;
    }
  }

}
