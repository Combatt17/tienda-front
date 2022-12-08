import { Estado } from "./estado";

export class Categoria{
    constructor( public nombre?:string,
         public estado?:Estado,
         public id?:number,
         public subCategoria?:any,
        ){

    }
}