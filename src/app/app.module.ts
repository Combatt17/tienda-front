import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SubmenuComponent } from './components/submenu/submenu.component';
import { CarritoComponent } from './views/carrito/carrito.component';
import { PedidosComponent } from './views/pedidos/pedidos.component';
import { ProductosComponent } from './views/productos/productos.component';
import { CategoriasComponent } from './views/categorias/categorias.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './views/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AgregarComponent } from './views/categorias/agregar/agregar.component';
import { EditarComponent } from './views/categorias/editar/editar.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    HeaderComponent,
    NavbarComponent,
    SubmenuComponent,
    CarritoComponent,
    PedidosComponent,
    ProductosComponent,
    CategoriasComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AgregarComponent,
    EditarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
