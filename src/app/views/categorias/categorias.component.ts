import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/modelos/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categorias:Categoria[] = [];
  constructor(private categoriaService:CategoriaService,private router:Router) { }

  ngOnInit(): void {
    this.listar();
    
  }

  listar(){
    this.categoriaService.listarCategorias().subscribe((respuesta:any)=>{
      this.categorias = respuesta;
      console.log(this.categorias);
      
      
    })
  }
  redireccionarVistaAgregar(){
    this.router.navigateByUrl('/categorias/agregar');
  }

  eliminarCategoria(id:any){
    console.log(id);
    this.categoriaService.eliminarCategoria(id).subscribe(respuesta=>{
      console.log(respuesta);
      this.listar();
    })
  }
}
