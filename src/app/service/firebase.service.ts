import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, query, where, getDocs, collection } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}

  // ::::::::::::::::::::: INSTANCIAS :::::::::::::::::::::

  // Variables con instancias de distintos servicios que permiten validación y gestión de datos
  auth = inject(AngularFireAuth);
  firebase = inject(AngularFirestore);
  utilsSvc = inject(UtilsService);

  // ::::::::::::::::::::: AUTENTICACIÓN :::::::::::::::::::::

  /* Obtiene la instancia de autenticación de Firebase.
   */
  getAuth() {
    return getAuth();
  }

  /* Permite a un usuario iniciar sesión con correo y contraseña.*/
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.contrasena);
  }

  /* Permite a un usuario registrarse con correo y contraseña.*/
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.contrasena);
  }

  /* Actualiza el nombre del usuario en su perfil.*/
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }

  /* Cierra la sesión del usuario actual.*/
  signOut() {
    getAuth().signOut();
    localStorage.removeItem('users'); // Limpia datos locales
    this.utilsSvc.routerLink('/autenticacion'); // Redirige al login
  }

  // ::::::::::::::::::::: BASE DE DATOS :::::::::::::::::::::

  /* Crea o reemplaza un documento en una ruta específica.*/
  setDocumento(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  /* Obtención de datos de usuario.*/
  async getDocumento(path: string): Promise<User> {
    const docSnap = await getDoc(doc(getFirestore(), path));
    return docSnap.exists() ? (docSnap.data() as User) : null;
  }

  /* Busca un usuario en la base de datos por su correo.
  async getUserByEmail(email: string) {
    const firestore = getFirestore();
    const usersCollection = collection(firestore, 'users');
    const q = query(usersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { uid: doc.id, ...doc.data() }; // Incluye UID en los datos
    } else {
      throw new Error('No se encontró un usuario con este correo.');
    }
  }*/

  /* Actualiza un documento existente en una ruta específica.*/
  async updateDocumento(path: string, data: any): Promise<void> {
    try {
      await this.firestore.doc(path).update(data);
      console.log(`Documento en la ruta "${path}" actualizado correctamente.`);
    } catch (error) {
      console.error(`Error al actualizar el documento en la ruta "${path}":`, error);
      throw error; // Lanzar el error para manejarlo en los métodos que llamen esta función
    }
  }
  async sendPassEmail(email: string){
    return sendPasswordResetEmail(getAuth(), email);
  }

  /* Obtiene correo de la sesion iniciada */
  async getCurrentUser() {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged(
        (user) => {
          resolve(user); // Devuelve el usuario actual cuando cambia el estado
        },
        (error) => reject(error) // Rechaza la promesa si hay un error
      );
    });
  }

  // ::::::::::::::::::::: CANCIONES :::::::::::::::::::::

  /* Agrega una calificación a una canción y actualiza su promedio.*/
  async addRating(cancionId: string, rating: number) {
    const cancionRef = this.firestore.collection('canciones').doc(cancionId);

    // Agregar calificación a la subcolección "ratings"
    await cancionRef.collection('ratings').add({ rating });

    // Obtener todas las calificaciones para calcular el promedio
    const ratingsSnapshot = await cancionRef.collection('ratings').get().toPromise();
    const allRatings = ratingsSnapshot.docs.map(doc => doc.data() as { rating: number });
    const averageRating =
      allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length;

    // Actualizar el promedio en el documento principal de la canción
    await cancionRef.set({ averageRating },{ merge: true });
  }

  /* Obtiene el promedio de calificaciones de una canción específica.*/
  async getSongAverage(cancionId: string): Promise<number> {
    const cancionDoc = await this.firestore.collection('canciones').doc(cancionId).get().toPromise();
    const cancionData = cancionDoc.data() as { averageRating?: number };
    return cancionData?.averageRating || 0;
  }

  /* Obtiene todas las calificaciones asignadas a una canción específica.*/
  async getRatings(cancionId: string): Promise<any[]> {
    const ratingsSnapshot = await this.firestore
      .collection('canciones')
      .doc(cancionId)
      .collection('ratings')
      .get()
      .toPromise();
    return ratingsSnapshot.docs.map(doc => doc.data());
  }
}