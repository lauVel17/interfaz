import { Routes } from '@angular/router';
import { AdminComponent } from './page/admin/admin.component';
import { InicioComponent } from './page/inicio/inicio.component';
import { LoginComponent } from './page/login/login.component';
import { ListaUsuariosComponent } from './page/usuarios/lista-usuarios/lista-usuarios.component';
import { RecUsuariosComponent } from './page/usuarios/rec-usuarios/rec-usuarios.component';
import { ListaProyectosComponent } from './page/proyectos/lista-proyectos/lista-proyectos.component';
import { ResumenProyectoComponent } from './page/proyectos/resumen-proyecto/resumen-proyecto.component';

export const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'usuarios', component: ListaUsuariosComponent },
      { path: 'infoU/:nodocumento', component: RecUsuariosComponent },
      { path: 'proyectos', component: ListaProyectosComponent },
       { path: 'infoP/:idproyecto', component: ResumenProyectoComponent},
    ],
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
];
