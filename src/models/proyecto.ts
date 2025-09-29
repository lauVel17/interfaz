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


/* Actualizar estado */
export interface ActualizarEstado {
  msg: string;
  estado: string;
  proyectoInactivado?: number; // Nuevo campo opcional
}

/*  TOKENS */

export interface tokens {
  exists: boolean;
  success: boolean;
  idUsuarioToken: number;
  usuarioId: number;
  token: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface tokenCrear {
  msg: string;
  token: {
    idUsuarioToken: number;
    usuarioId: number;
    token: string;
  };
}
export interface inicioS {
  msg: string;
  success: any;
  nodocumento: number;
  nombre: string;
  correo: string;
  token?: string;
  estado: string;
}
