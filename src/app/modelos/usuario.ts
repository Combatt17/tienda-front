import { DetalleUsuario } from "./detalle";
import { Estado } from "./estado";
import { Rol } from "./rol";

export class Usuario{

    constructor(
        public email:string,
        public password:string,
        public detalle:DetalleUsuario,
        public estado:Estado,
        public rol:Rol,
        public fechaRegistro?:Date,
        public id?:number){

    }
}