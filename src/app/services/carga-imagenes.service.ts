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
    // console.log(imagenes);
    // Referencia al storage que esta en firebase
    const storageRef = firebase.storage().ref();
    // Barrido de todas las imagenes
    for (const item of imagenes) {
      // Validamos que se esta subiendo el archivo
      item.estaSubiendo = true;
      // Esta validacion nos dice que el archivo ya se subio y se salta con el continue a la otra iteraccion de las imagenes
      if (item.progreso >= 100) {
        continue;
      }
      const uploadTask: firebase.storage.UploadTask =
        storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`) // la ruta donde se subira
          .put(item.archivo); // Subir el archivo con su tipo y todo
      // Ejecutamos la tarea que se va a disparar cada vez que el estado cambie
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        // Callbacks que recibimos osea lo que va hacer y dividimos los bytes en porcentaje
        (snapshot: firebase.storage.UploadTaskSnapshot) => item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => console.error('Error al subir', error), // Mandamos el error que pueda pasar con firebase
        () => { // Callback cuando todo lo hace correctamente
          console.log('Imagen cargada correctamente'); // Se cargo la imagen
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            item.url = downloadURL; // Ocupamos la url completa de la imagen que se subio que esta en uploadTask que retorna firebase
            item.estaSubiendo = false; // Porque ya se subio se pone en falso
            this.guardarImagen({ // Guardamos la referencia
              nombre: item.nombreArchivo,
              url: item.url
            });
          });
      });
    }
  }

  // Grabamos a Firebase
  private guardarImagen(imagen: {nombre: string, url: string}) {
    this.db.collection(`/${this.CARPETA_IMAGENES}`) // Especificamos el objeto o el lugar donde lo guardaremos
      .add(imagen); // .add guardamos el objeto en este caso la "imagen" que recibimos
  }
}
