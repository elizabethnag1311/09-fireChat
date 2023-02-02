import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Mensaje } from "../interface/mensaje.interface";
import { map } from "rxjs/operators";

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection!: AngularFirestoreCollection<Mensaje>;

  public chats  : Mensaje[] = [];
  public usuario: any = {};

  constructor( private afs: AngularFirestore,
               public auth: AngularFireAuth ) { 

  this.auth.authState.subscribe( user => {
    console.log('estado del usuario', user);

    if (!user) {
      return
    }
    this.usuario.nombre = user.displayName;
    this.usuario.uid = user.uid;
   })
  }

  login( proveedor: string) {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.usuario = {};
    this.auth.signOut();
  }

  cargarMensaje(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy( 'fecha', 'asc' )
                                                                           .limitToLast( 5 ));
    return this.itemsCollection.valueChanges()
                               .pipe(
                                map(( mensajes: Mensaje[]) => {
                                console.log(mensajes);
    return this.chats = mensajes;
    }))
  }

  agregarMensaje( texto: string ){

    
    let mensaje: Mensaje = {
      nombre  : this.usuario.nombre,
      mensaje : texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    }
    return this.itemsCollection.add( mensaje )
  }
}
