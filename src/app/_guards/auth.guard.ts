import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CompartidoService } from '../compartido/compartido.service';
import jwt_decode, { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {

  const compartidoServicio = inject(CompartidoService);
  const router = inject(Router);
  const cookieService = inject(CookieService);
  const usuario = compartidoServicio.obtenerSesion();
  let token = cookieService.get("Authorization");

  if (token && usuario) {
    token = token.replace('Bearer ', '');
    const decodeToken: any = jwtDecode(token);
    const fechaExpiracion = decodeToken.exp * 1000;
    const fechaActual = new Date().getTime();
    if (fechaExpiracion < fechaActual) {
      router.navigate(['login']);
      return false;
    }
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
