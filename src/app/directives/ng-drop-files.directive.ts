import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {FileItem} from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos: FileItem[] = []; // Los archivos que necesitamos controlar
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseSobre.emit(true);
    this._prevenirDetener();
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseSobre.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    const transferencia = this._getTransferencia(event); // Ya obtenemos la informacion de los archivos, eso vendria del dataTransfer pero extendemos mejor la compatibilidad
    if (!transferencia) { // Sino hay transferencia no hacemos nada
      return;
    }
    this._extraerArchivos(transferencia.files); // Los archivos se encuentran en la transferencia file
    this._prevenirDetener(); // Para que no lo abra aun
    this.mouseSobre.emit(false);
  }

  private _getTransferencia(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer; // Extendemos la compatibilidad de navegadores
  }

  private _extraerArchivos(archivosLista: FileList) {
    console.log(archivosLista);
    // Extraemos el objeto y lo pasamos a un arreglo
    for (const propiedad in Object.getOwnPropertyNames(archivosLista)) {
      const archivoTemporal = archivosLista[propiedad];
      if (this._archivoPuedeSerCargado(archivoTemporal)) { // Verificamos si el archivo puede ser cargado
        const nuevoArchivo = new FileItem(archivoTemporal); // Seteamos las propiedades para que sean guardadas en el nuevo archivo
        this.archivos.push(nuevoArchivo); // La insertamos en el arreglo
      }
    }
    console.log(this.archivos);
  }

  // Validaciones

  private _archivoPuedeSerCargado(archivo: File): boolean { // Verificamos su el archivo fue dropeado y si es una imagen
    if (!this._archivoYaFueDroppeado(archivo.name) && this._esImagen(archivo.type)) { // this._esImagen(archivo.type) ahi viene el tipo de archivo
      return true;
    } else {
      return false;
    }
  }

  private _prevenirDetener(){ // Evitar que chrome abra la imagen al hacer el drop
  event.preventDefault();
  event.stopPropagation();
  }

  private _archivoYaFueDroppeado(nombreArchivo: string): boolean { // para saber si el archivo existe en el arreglo
    for (const archivo of this.archivos) {
      if (archivo.nombreArchivo === nombreArchivo) {
        console.log('El archivo' + nombreArchivo + ' ya esta agregado');
        return true;
      }
    }
    return false;
  }

  private _esImagen(tipoArchivo: string): boolean { // Verificamos si lo que esta en el drog sea una imagen si y solo si
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image'); // tipoArchivo.startsWith('image') verificamos el tipo de imagen
  }

}
