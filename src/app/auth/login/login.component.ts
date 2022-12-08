import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formularioEnviado:boolean = false;
  
  formularioSesion = this.fb.group({
    email:["",Validators.required],
    password:["",Validators.required],
   
  });
  constructor(private fb:FormBuilder) { }
  ngOnInit(): void {
  }

  campoNoValido(campo:string){
    if(this.formularioSesion.get(campo)?.invalid && this.formularioEnviado){
      return true;
    }else{
      return false;
    }
  }

  iniciarSesion(){
    console.log(this.formularioSesion.value);
    
  }
}
