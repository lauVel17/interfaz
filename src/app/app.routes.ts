import { Routes } from '@angular/router';
import { AdminComponent } from './page/admin/admin.component';
import { InicioComponent } from './page/inicio/inicio.component';
import { LoginComponent } from './page/login/login.component';
import { ListaUsuariosComponent } from './page/usuarios/lista-usuarios/lista-usuarios.component';

export const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [{ path: 'usuarios', component: ListaUsuariosComponent }],
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
];
