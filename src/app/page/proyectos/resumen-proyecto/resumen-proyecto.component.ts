proyecto = {
  nombre: '',
  descripcion: '',
  ciudad: '',
  fechaInicio: '',
  fechaFin: ''
};

ciudades = [
  { id: 'bogota', nombre: 'Bogotá' },
  { id: 'medellin', nombre: 'Medellín' },
  { id: 'cali', nombre: 'Cali' },
  { id: 'barranquilla', nombre: 'Barranquilla' }
];

getCiudadNombre(id: string): string {
  const ciudad = this.ciudades.find(c => c.id === id);
  return ciudad ? ciudad.nombre : 'No disponible';
}

cerrarResumen(): void {
  // lógica para cerrar o volver atrás
}

editarProyecto(): void {
  // lógica para volver al formulario de edición
}

confirmarProyecto(): void {
  // lógica para guardar o enviar el proyecto
}
