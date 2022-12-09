import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
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
  subcategorias:Categoria []=[];
  subcategoriasaux:Categoria []=[];
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
  
    this.listar();
   
  
      }

  ngOnInit(): void {
 
    this.categoriaService.obtenerCategoriaPorId(this.id).subscribe((respuesta:any)=>{
     console.log(respuesta);
     this.formularioCategoria.controls['id'].setValue(respuesta.id);
     this.formularioCategoria.controls['nombre'].setValue(respuesta.nombre);
    //  this.formularioCategoria.controls['subcategoria'].setValue(respuesta.subCategoria);
     this.subcategoriasaux = respuesta.subCategoria; 
    })
  }
  selectCategorias(event:any,categoria:any){
    const {target:{checked,value}}= event;
    if(checked){
      this.subcategorias.push({id:value,nombre:categoria.nombre,estado:categoria.estado})
    }else{
      const index = this.subcategorias.indexOf(value);
      this.subcategorias.splice(index,1);
    }
    console.log(this.subcategorias);
    
       
        
  }
  listar(){
    this.categoriaService.listarCategorias().subscribe((respuesta:any)=>{
      this.categorias = respuesta;
      
      
      
    })
  }
  actualizarCategoria(){
    let categoria:Categoria = this.transformaCategoria(this.formularioCategoria.value)
   

    this.categoriaService.editarCategoria(categoria).subscribe(respuesta=>{
     
      if(respuesta){
        this.router.navigateByUrl('/categorias')
      }
      
    })
    
  }

  transformaCategoria(data:any){
  
    return new Categoria(data.nombre,Estado.ACTIVO,data.id,this.subcategorias);
  
  }

  marcar(id:any){
    
   
      for (let j = 0; j < this.subcategorias.length; j++) {
        if(id ==this.subcategorias[j].id){
          return true;
        }else{
          return false;
        }
      
    }
  }
}
