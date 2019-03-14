import { Component, OnInit, EventEmitter,ElementRef, HostListener, Input, Output } from '@angular/core';
import {FileItem} from '../../models/file-item';
import {CargaImagenesService} from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.scss']
})
export class CargaComponent implements OnInit {

  // Un arreglo de Archivos que quiero subir, el file-item es el modelo que nosotros creamos
  archivos: FileItem[] = [];
  // nos dira cuando se este haciendo un drop
  estaSobreElemento = false;

  constructor(public cargaImagenesService: CargaImagenesService) { }

  ngOnInit() {
  }

  cargarImagenes() {
      // Va a tomar todos los archivos que tengamos y los mandara en el servicio
      this.cargaImagenesService.cargarImagenesFirebase(this.archivos);
  }

  limpiarArchivos() {
    this.archivos = [];
  }

}
