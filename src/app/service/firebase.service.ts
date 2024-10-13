import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { User } from '../models/user.model';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  //  ::::::::::::::::::::: AUTENTIFICACION :::::::::::::::::::::

  //variables con instancias de distintos servicios que me permiten validar
  auth = inject(AngularFireAuth);
  firebase = inject(AngularFirestore);

  //Entrar a la app
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.contrasena);
  }
  //Registrarse
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.contrasena);
  }
  //Actualizar nombre usuario
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName })
  }

  //  ::::::::::::::::::::: BASE DE DATOS :::::::::::::::::::::

  // Crear o reemplazar un documento. Guardamos datos del usuario
  setDocumento (path:string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

}
