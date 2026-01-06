import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-producto',
  imports: [FormsModule],
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class ComponenteProducto {
  descripcion = 'Nuevo Producto';
  precio = 100.00;
}

