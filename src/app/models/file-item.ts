export class FileItem {
  public archivo: File; // Propiedad archivo sera el archivo en fisico que estamos seleccionando
  public nombreArchivo: string; // Propiedad Nombre del archivo que se encuentra en file
  public url: string; // El url de la imagen - la url que nos retornara firebase
  public estaSubiendo: boolean; // Es una bandera que nos dice si se esta subiendo o no
  public progreso: number; // Esto nos dira el porcentaje que lleva subida la imagen

  constructor(archivo: File) { // Todos nuestros File Item a fuerza deben recibir un archivo
    // Seteamos
    this.archivo = archivo;
    this.nombreArchivo = archivo.name;

    this.estaSubiendo = false; // inicializamos el esta subiendo en false porque no hay nada subiendo hasta que carguen
    this.progreso = 0; // Comienza en 0
  }

}
