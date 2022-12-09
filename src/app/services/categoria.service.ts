import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Categoria } from '../modelos/categoria';

const url = environment.url;
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http:HttpClient) { }

  listarCategorias(){
    return this.http.get(url+"/categorias/listado");
  }

  obtenerCategoriaPorId(id:string|null){
    return this.http.get(url+"/categorias/obtenerPorId/"+id);
  }
  guardarCategoria(categoria:Categoria){
    return this.http.post(url+"/categorias/guardar",categoria);
  }

  editarCategoria(categoria:Categoria){
    return this.http.put(url+"/categorias/actualizar/"+categoria.id,categoria);
  }

  eliminarCategoria(id:number){
    return this.http.delete(url+"/categorias/eliminar/"+id);
  }
}
