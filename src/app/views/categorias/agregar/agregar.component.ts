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
  subcategorias:Categoria []=[];
  constructor(private fb:FormBuilder,private categoriaService:CategoriaService,private router:Router) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.categoriaService.listarCategorias().subscribe((respuesta:any)=>{
      this.categorias = respuesta;
    
    })
  }
  selectCategorias(event:any){
    const {target:{checked,value}}= event;
    if(checked){
      this.subcategorias.push({id:value, nombre: "",estado: Estado.ACTIVO})
    }else{
      const index = this.subcategorias.indexOf(value);
      this.subcategorias.splice(index,1);
    }
      
        
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

      return new Categoria(data.nombre,Estado.ACTIVO,undefined,this.subcategorias);
    
   
  }

}
