import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponenteListadoProductos } from './components/listado-productos/listado-productos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ComponenteListadoProductos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected titulo = 'Tienda Productos';
}

