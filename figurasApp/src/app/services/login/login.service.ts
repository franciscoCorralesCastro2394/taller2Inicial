import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DataService } from '../data/data.service';
import { SnotifyService } from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  titulo$: Subject<string>;
  currentUser: Usuario;
  userSuscription: Subscription;

  constructor(
     private angularFireAuth: AngularFireAuth, private router: Router,
     private dataService: DataService, private snotifyService: SnotifyService
    ) {
    this.titulo$ = new Subject<string>();

  }

  recovery(email: string) {
    this.angularFireAuth.auth.sendPasswordResetEmail(email)
      .then(() => this.snotifyService.success('Se ha enviado un correo para restaurar su cuenta', 'Excelente'))
      .catch((error) => this.snotifyService.warning('Se ha presentado el siguiente error: ' + error, 'Atención'))
  }

  register(user: Usuario, password: string) {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, password).then((result) => {
      user.userId = result.user.uid;
      this.dataService.saveUsuario(user);
      this.snotifyService.success('El usuario fue registrado correctamente, Bienvenido!', 'Excelente');
      this.login(user.email, password);
    }).catch((error) => {
      this.snotifyService.warning('No se ha podido registrar el usuario por:' + error, 'Registro de usuarios');

    });

  }

  logout() {
    this.currentUser = null;
    this.angularFireAuth.auth.signOut();
    this.router.navigateByUrl('/account/login');
  }

  login(email: string, password: string) {
    this.angularFireAuth.auth.signInWithEmailAndPassword(email, password).then((value) => {
      this.setCurrentUser(email);
      this.router.navigateByUrl('/secure/principal');
    }).catch((error) => {
      this.snotifyService.warning('No se ha podido iniciar sesión', 'Atención');
    });
  }

  getTitulo(): Observable<string> {
    return this.titulo$;
  }

  setTitulo(titulo: string) {
    this.titulo$.next(titulo);
  }

  getUsuario(): Usuario {
    return this.currentUser;

  }

  setCurrentUser(email: string) {
    this.userSuscription = this.dataService.getUsuarioByEmail(email).subscribe((usuarios) => {
      this.currentUser = usuarios[0];
    });
  }
}
