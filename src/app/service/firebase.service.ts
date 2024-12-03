import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';

import { query, where, getDocs, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) {}
  
  //variables con instancias de distintos servicios que me permiten validar
  auth = inject(AngularFireAuth);
  firebase = inject(AngularFirestore);
  utilsSvc = inject(UtilsService);

  //  ::::::::::::::::::::: AUTENTIFICACION :::::::::::::::::::::
  getAuth() {
    return getAuth();
  }
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
  async getDocumento(path: string): Promise<User> {
    const docSnap = await getDoc(doc(getFirestore(), path));
    return docSnap.exists() ? (docSnap.data() as User) : null;
  }

  async getUserByEmail(email: string) {
    const firestore = getFirestore();
    const usersCollection = collection(firestore, 'users');
    const q = query(usersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(q);
  
    if (!querySnapshot.empty) {
      // Retorna el primer documento que coincide
      const doc = querySnapshot.docs[0];
      return { uid: doc.id, ...doc.data() }; // Incluye UID en los datos
    } else {
      throw new Error('No se encontró un usuario con este correo.');
    }
  }

  /*async updateDocumento(path: string, data: any): Promise<void> {
    const docRef = this.firebase.doc(path);
    return docRef.update(data);
  }*/

  async updateDocumento(path: string, data: any): Promise<void> {
    try {
      await this.firestore.doc(path).update(data);
      console.log(`Documento en la ruta "${path}" actualizado correctamente.`);
    } catch (error) {
      console.error(`Error al actualizar el documento en la ruta "${path}":`, error);
      throw error; // Lanzar el error para manejarlo en los métodos que llamen esta función
    }
  }

  // Enviar emal para cambio de contraseña
  recoverPassEmail(email:string) {
    return sendPasswordResetEmail(getAuth(),email);
  }
}