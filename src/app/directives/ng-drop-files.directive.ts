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
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseSobre.emit(false);
  }

  // Validaciones

  private _archivoPuedeSerAcargado(archivo: File): boolean { // Verificamos su el archivo fue dropeado y si es una imagen
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
        console.log('El archivo' + nombreArchivo + 'ya esta agregado');
        return true;
      }
    }
    return false;
  }

  private _esImagen(tipoArchivo: string): boolean { // Verificamos si lo que esta en el drog sea una imagen si y solo si
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image'); // tipoArchivo.startsWith('image') verificamos el tipo de imagen
  }

}
