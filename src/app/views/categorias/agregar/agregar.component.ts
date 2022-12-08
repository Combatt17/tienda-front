import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/modelos/categoria';
import { Estado } from 'src/app/modelos/estado';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  categorias:Categoria[] = [];
  formularioCategoria = this.fb.group({
    nombre:['',Validators.required],
    subcategoria:['']
  })
  constructor(private fb:FormBuilder,private categoriaService:CategoriaService,private router:Router) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.categoriaService.listarCategorias().subscribe((respuesta:any)=>{
      this.categorias = respuesta;
      console.log(this.categorias);
      
      
    })
  }
  registrarCategoria(){
    let categoria:Categoria = this.transformaCategoria(this.formularioCategoria.value)
    console.log(categoria);

    this.categoriaService.guardarCategoria(categoria).subscribe(respuesta=>{
      console.log(respuesta);
      if(respuesta){
        this.router.navigateByUrl('/categorias')
      }
      
    })
    
  }

  transformaCategoria(data:any){
    let subcategoria = new Categoria(undefined,undefined,data.subcategoria);
    return new Categoria(data.nombre,Estado.ACTIVO,undefined,[subcategoria]);
  }

}
