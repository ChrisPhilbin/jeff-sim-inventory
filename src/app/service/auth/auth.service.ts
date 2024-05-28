import { Injectable, inject } from '@angular/core';
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { FirebaseApp } from '@angular/fire/app';
import { BehaviorSubject } from 'rxjs';
import { AppUser } from '../../model/app-user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firebaseApp: FirebaseApp = inject(FirebaseApp);
  private auth = getAuth(this.firebaseApp);
  public user$: BehaviorSubject<AppUser> = new BehaviorSubject<AppUser>(
    this.createEmaptyAppUser()
  );
  constructor(private router: Router) {}

  public async createUser(email: string, password: string): Promise<void> {
    if (!email || !password || password.length < 8 || !this.isEmailValid(email))
      return;
    try {
      const createdUser: UserCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user: User = createdUser.user;
      this.user$.next(await this.createAppUser(user));
    } catch (error) {
      console.error('Something went wrong creating new user: ', error);
    }
  }

  public async signIn(email: string, password: string): Promise<void> {
    if (!email || !password) return;
    try {
      const user: UserCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      if (user.user) {
        this.router.navigate(['/']);
      }
    } catch (error) {
      console.error('Something went wrong attempting to sign in: ', error);
    }
  }

  public async logout(): Promise<void> {
    await this.auth.signOut();
    this.user$.next(this.createEmaptyAppUser());
    this.router.navigate(['/auth']);
  }

  public async onAuthStateChange(): Promise<void> {
    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        this.user$.next(await this.createAppUser(user));
      }
    });
  }

  public isUserLoggedIn(): boolean {
    return this.user$.value.isUserValid();
  }

  private isEmailValid(email: string): boolean {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  public createEmaptyAppUser(): AppUser {
    return new AppUser('', '', '');
  }

  private async createAppUser(user: User): Promise<AppUser> {
    return new AppUser(user.email as string, await user.getIdToken(), user.uid);
  }
}
