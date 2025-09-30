import { usuarios } from './usuarios';

/* Identificación usuario */
export interface identificacionUs {
  success: any;
  msg: string;
  existeIdent: boolean;
  usuario?: usuarios;
}
export interface identificacionUsa {
  success: any;
  msg: string;
  existeIdent: boolean;
}

/* Países ciudades y departamentosa */
export interface consultarPaís {
  success: any;
  idPais: number;
  nombre: string;
  codigo: string;
}
export interface consultarDepartamento {
  success: any;
  iddepartamento: number;
  idpais: number;
  nombre: string;
}
export interface consultarCiudad {
  success: any;
  idciudad?: number;
  iddepartamento: number;
  nombre: string;
}
export interface consultarCiudades {
  success: any;
  idciudad: number;
  iddepartamento: number;
  nombre: string;
}


/*Nit clientes*/
export interface nitClientes {
  success: any;
  msg: string;
  existeNit: boolean;
}

/*Identifiacion contacto clientes */
export interface identificacionCon {
  succes: any;
  msg: string;
  existeIdentificacion: boolean;
}
