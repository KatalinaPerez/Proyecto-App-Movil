import { inject, Injectable } from '@angular/core';
import {
  CanActivate,
  UrlTree,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { FirebaseService } from '../service/firebase.service';
import { UtilsService } from '../service/utils.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class noAuthGuard implements CanActivate {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    return new Promise((resolve) => {
      //onAuthStateChanged nos indica si un usuario está autenticado o no
      this.firebaseSvc.getAuth().onAuthStateChanged((auth) => {
        if (!auth) resolve(true);
        else {
          this.utilsSvc.routerLink('/main/home');
          resolve(false);
        }
      });
    });
  }
}
