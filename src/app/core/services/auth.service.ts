import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private readonly ApiUrl='https://6271c5d2c455a64564b7a629.mockapi.io';
  sesion: any = {
    activa: false,
    usuario: {},
  };
  sesion2: any[]  = [{
    activa: false,
    usuario: {},
  }];

  Usuario$!:Observable<any[]>;
  rol: any;

  isAuthenticatedSrc: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    localStorage.getItem('sessionPFCristhian')?
    JSON.parse(localStorage.getItem('sessionPFCristhian') || 'false'):false
  );

  get isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSrc.asObservable();
  }

 get isAdmin(): Observable<boolean> {
    return this.rol;
  }

  constructor(private http: HttpClient, private ruta: Router) {
    this.Usuario$ = new Observable((suscripcion)=>{
      suscripcion.next(this.sesion2)
      suscripcion.complete()
    })
    var values = JSON.parse(localStorage.getItem('sessionPFCristhian') || 'false');
    console.log('gaa',values);
    
    if (values.usuario !== undefined) {
      if (values.usuario.rol === 1) {
        this.rol = true;
      } else {
        this.rol = false;
      }
    } else {
      this.rol = false;
    }
    
  }
  getSesion(): Observable<any[]>{
    return this.Usuario$
  }
  //Inicio de sesión del usuario.
  IniciarSesion(usuario: string, contrasena: string): Observable<Usuario[]> {
    return this.http
      .get<Usuario[]>(`${this.ApiUrl}/usuario`)
      .pipe(
        map((usuarios: Usuario[]) => {
          console.log(usuarios,usuario,contrasena);
          return usuarios.filter(
            (u) => u.usuario === usuario && u.contrasena === contrasena
          );
        })
      )
      .pipe(
        tap((res: any) => {
          console.log(res[0]);
          if (res.length === 1) {
            this.isAuthenticatedSrc.next(true);
            if (res[0].rol == 1) {
              this.rol =  true;
            } else {
              this.rol =  false;
            }
          }
        })
      );
  }

  //Hace el logout del usuario.
  CerrarSesion(): void {
    this.sesion = {
      activa: false,
      usuario: {},
    };
    localStorage.removeItem('sessionPFCristhian');
    this.ruta.navigate(['login']);
    this.isAuthenticatedSrc.next(false);
  }

  establecerSesion(sesionActiva: boolean, usuario: Usuario) {
    this.sesion = {
      activa: sesionActiva,
      usuario: usuario,
    };
    this.sesion2 = [{
      activa: sesionActiva,
      usuario: usuario,
    }]
    localStorage.setItem('sessionPFCristhian', JSON.stringify(this.sesion));
    this.ruta.navigate(['']);
  }
}
