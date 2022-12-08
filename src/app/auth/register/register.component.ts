import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators,FormGroup} from '@angular/forms'
import { Router } from '@angular/router';
import { DetalleUsuario } from 'src/app/modelos/detalle';
import { Estado } from 'src/app/modelos/estado';
import { Rol } from 'src/app/modelos/rol';
import { Usuario } from 'src/app/modelos/usuario';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formularioRegistro = this.fb.group({
    nombres:["",Validators.required],
    apellidos:["",Validators.required],
    telefono:["",],
    email:["",Validators.required],
    password:["",Validators.required],
    repassword:["",Validators.required]
  },{validators:this.passwordIguales('password','repassword')});
   formularioEnviado:boolean = false;
  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  passwordIguales(campo1:string,campo2:string){
    return (form:FormGroup)=>{
      const pass1 = form.get(campo1);
      const pass2 = form.get(campo2);
      if(pass1?.value==pass2?.value){
        pass2?.setErrors(null);
      }else{
        pass2?.setErrors({noEsIgual:true})
      }
    }
  }

  enviarRegistroUsuario(){
    this.formularioEnviado = true;
    console.log("Fomulario",this.formularioRegistro.value);
    if(this.formularioRegistro.valid){
      let nuevoUsuario:Usuario = this.construirUsuario(this.formularioRegistro.value)
      console.log("Nuevo usuario",nuevoUsuario);
      this.authService.registrarUsuario(nuevoUsuario).subscribe((respuesta)=>{
        console.log(respuesta);
        if(respuesta){
          this.router.navigateByUrl('/iniciar-sesion');
        }
       
        
      })
    }
    
    
  }

  campoNoValido(campo:string){
    if(this.formularioRegistro.get(campo)?.invalid && this.formularioEnviado){
      return true;
    }else{
      return false;
    }
  }
  construirUsuario(data:any){
    const rol:Rol = new Rol("",Estado.ACTIVO,1)
    const detalle:DetalleUsuario = new DetalleUsuario(data.nombres,data.apellidos,data.telefono);
   return new Usuario(data.email,data.password,detalle,Estado.ACTIVO,rol);
  }

  passwordValido(){
    const pass1 = this.formularioRegistro.get('password')?.value;
    const pass2 = this.formularioRegistro.get('repassword')?.value;
    if(pass1==pass2){
      return true;
    }else{
      return false;
    }
  }

}
