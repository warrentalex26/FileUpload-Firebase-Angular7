import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
// import * as firebase from 'firebase/app';
import * as firebase from 'firebase';
import {FileItem} from '../models/file-item';


@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  // Aqui sera el lugar donde nosotros colocaremos las imagenes
  private CARPETA_IMAGENES = 'img';

  constructor(private db: AngularFirestore) { }

  // Recibimos imagenes de tipo FileItem
  cargarImagenesFirebase(imagenes: FileItem[]) {
    console.log(imagenes);
  }

  // Grabamos a Firebase
  private guardarImagen(imagen: {nombre: string, url: string}) {
    this.db.collection(`/${this.CARPETA_IMAGENES}`) // Especificamos el objeto o el lugar donde lo guardaremos
      .add(imagen); // .add guardamos el objeto en este caso la "imagen" que recibimos
  }
}
