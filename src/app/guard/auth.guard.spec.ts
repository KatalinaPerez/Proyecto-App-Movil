import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../service/auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: { isLoggedIn: () => true } // Mock del método isLoggedIn
        }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation when logged in', () => {
    expect(guard.canActivate(new ActivatedRouteSnapshot(), {} as RouterStateSnapshot)).toBeTrue(); // Simula la activación
  });
  
  it('should not allow activation when not logged in', () => {
    // Cambia el mock para simular que el usuario no está autenticado
    authService.isLoggedIn = () => false;
    expect(guard.canActivate(new ActivatedRouteSnapshot(), {} as RouterStateSnapshot)).toBeFalse(); // Simula la activación
  });
});
