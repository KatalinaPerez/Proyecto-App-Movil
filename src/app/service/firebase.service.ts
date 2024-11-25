import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { User } from '../models/user.model';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';


import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  //variables con instancias de distintos servicios que me permiten validar
  auth = inject(AngularFireAuth);
  firebase = inject(AngularFirestore);
  utilsSvc = inject(UtilsService);

  //  ::::::::::::::::::::: AUTENTIFICACION :::::::::::::::::::::
  getAuth() {
    return getAuth();
  }
  //Entrar a la app
  signIn(email: string, password: string) {
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDhx4nEiQVRY7U6K_xBgNOSWlaUx4N_knY`,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
  
  //Registrarse
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.contrasena);
  }
  //Actualizar nombre usuario
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName })
  }
  // Cierrre sesión 
  signOut(){
    getAuth().signOut();
    localStorage.removeItem('users');
    this.utilsSvc.routerLink('/autenticacion');
  }

  //  ::::::::::::::::::::: BASE DE DATOS :::::::::::::::::::::

  // Crear o reemplazar un documento. Guardamos datos del usuario
  setDocumento (path:string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  //Obtencion de datos de usuario
  async getDocumento (path:string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

}
