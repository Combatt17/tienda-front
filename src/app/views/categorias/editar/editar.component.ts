import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/modelos/categoria';
import { Estado } from 'src/app/modelos/estado';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  categorias:Categoria []=[];
  formularioCategoria = this.fb.group({
    id:[''],
    nombre:['',Validators.required],
    subcategoria:['']
  })
  id:string|null ='';
  constructor(private fb:FormBuilder,
     private categoriaService:CategoriaService,
     private router:Router, private activateRoute:ActivatedRoute) {
      this.id = this.activateRoute.snapshot.paramMap.get('id');
      console.log(this.id);
      
      }

  ngOnInit(): void {
    
    this.listar();
    this.categoriaService.obtenerCategoriaPorId(this.id).subscribe((respuesta:any)=>{
      console.log(respuesta);
      this.formularioCategoria.setValue({
        id:respuesta.id,
        nombre:respuesta.nombre,
        subcategoria:respuesta.subCategoria
      })
      
    })
  }
  listar(){
    this.categoriaService.listarCategorias().subscribe((respuesta:any)=>{
      this.categorias = respuesta;
      console.log(this.categorias);
      
      
    })
  }
  actualizarCategoria(){
    let categoria:Categoria = this.transformaCategoria(this.formularioCategoria.value)
    console.log(categoria);

    this.categoriaService.editarCategoria(categoria).subscribe(respuesta=>{
      console.log(respuesta);
      if(respuesta){
        this.router.navigateByUrl('/categorias')
      }
      
    })
    
  }

  transformaCategoria(data:any){
    let subcategoria = new Categoria(undefined,undefined,data.subcategoria);
    return new Categoria(data.nombre,Estado.ACTIVO,data.id,[subcategoria]);
  }
}
