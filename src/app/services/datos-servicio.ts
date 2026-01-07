import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root',
})
export class DatosServicio {
  url='https://ejemplo-taller-3663a-default-rtdb.firebaseio.com/'
  
  constructor(private httpClient: HttpClient) {}

  cargarProductos(): Observable<{[llave:string]: Producto}>{
    return this.httpClient.get<{[llave:string]: Producto}>(this.url + 'datos.json');
  }

  guardarProducto(producto: Producto): Observable<any>{
    // Aqui se genera el valor de la llave de manera automatica
    return this.httpClient.post(`${this.url}datos.json`, producto);
  }

  modificarProducto(producto: Producto, llave: string): Observable<any>{
    const url_modificar = `${this.url}datos/${llave}.json`;
    return this.httpClient.put(url_modificar, producto);
  }

  eliminarProducto(llave: string): Observable<any>{
    const url_eliminar = `${this.url}datos/${llave}.json`;
    return this.httpClient.delete(url_eliminar);
  }
}
