export interface UsuarioEstado {
  estado: string;
  mensaje: string;
}

export interface proyecto {
  exists: boolean;
  success: boolean;
  idproyecto: number;
  nombre: string;
  descripcion: string;
  ciudadid: number;
  fechainicio: Date;
  fechafin: Date;
}
export interface ProyectoResponse {
  msg: string;
  proyectos: proyecto[];
}
export interface proyectoCrear {
  msg: string;
  proyecto: {
    idproyecto: number;
    nombre: string;
    descripcion: string;
    ciudadid: number;
    fechainicio: Date;
    fechafin: Date;
  };
}

export interface actualizarproyecto {
  msg: string;
  proyecto: {
    idproyecto: number;
    nombre: string;
    descripcion: string;
    ciudadid: number;
    fechainicio: Date;
    fechafin: Date;
  };
}
export interface proyecto {
  msg: string;
  proyecto: {
    idproyecto: number;
    nombre: string;
    descripcion: string;
    ciudadid: number;
    fechainicio: Date;
    fechafin: Date;
  };
}
