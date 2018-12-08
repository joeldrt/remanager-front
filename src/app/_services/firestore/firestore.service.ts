import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: AngularFirestore
  ) {}

  // Crear mensaje nuevo
  public crearMensaje(data: { titulo: string, mensaje: string}) {
    return this.firestore.collection('mensajes').add(data);
  }

  // Obtiene un mensaje
  public obtenerMensaje(documentId: string) {
    return this.firestore.collection('mensajes').doc(documentId).snapshotChanges();
  }

  // Obtiene todos los mensajes
  public obtenerMensajes() {
    return this.firestore.collection('mensajes').snapshotChanges();
  }

  // Actualiza un mensaje
  public actualizarMensaje(documentId: string, data: any) {
    return this.firestore.collection('mensajes').doc(documentId).set(data);
  }

}
