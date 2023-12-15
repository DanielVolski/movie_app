import { Injectable, NgZone } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {
  getAuth,
  signInWithPopup,
  browserPopupRedirectResolver,
  GoogleAuthProvider,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  dataUser: any;
  constructor(
    private firebase: FirebaseService,
    private fireAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.dataUser = user;
        localStorage.setItem('user', JSON.stringify(this.dataUser));
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }

  public signInWithEmailAndPassword(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  public signUpWithEmailAndPassword(email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  public signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider, browserPopupRedirectResolver);
  }

  public recoverPassword(email: string) {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  public SignOut() {
    return this.fireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['signin']);
    });
  }

  public getUserLogged() {
    const user: any = JSON.parse(localStorage.getItem('user') || 'null');
    if (user != null) {
      return user;
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return user !== null ? true : false;
  }
}
