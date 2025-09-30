export interface UsuarioEstado {
  estado: string;
  mensaje: string;
}

export interface usuarios {
  usuarioc: any;
  exists: boolean;
  success: boolean;
  nodocumento: number;
  nombreapellido: string;
  correo: string;
  telefono: string;
  estado: string;
  fechaingreso: Date;
  ciudadid: number;
  contrasena: string;
}
export interface usuarioCrear {
  msg: string;
  usuario: {
  nodocumento: number;
  nombreapellido: string;
  correo: string;
  telefono: string;
  estado: string;
  fechaingreso: Date;
  ciudadid: number;
  contrasena: string;
  };
}

export interface actualizarUsuario {
  msg: string;
  usuario: {
  nodocumento: number;
  nombreapellido: string;
  correo: string;
  telefono: string;
  estado: string;
  fechaingreso: Date;
  ciudadid: number;
  contrasena: string;
  };
}
export interface usuariosEliminar {
  msg: string;
  usuario: {
   nodocumento: number;
  nombreapellido: string;
  correo: string;
  telefono: string;
  estado: string;
  fechaingreso: Date;
  ciudadid: number;
  contrasena: string;
  };
}

/* Actualizar contraseña */
export interface ActualizarContrasena {
  msg: string;
  contrasena: string;
}

/* Actualizar estado */
export interface ActualizarEstado {
  msg: string;
  estado: string;
  usuarioInactivado?: number; // Nuevo campo opcional
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
  nombreapellido: string;
  correo: string;
  token?: string;
  estado: string;
}
