import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH_LOGIN_URL } from 'src/app/shared/constants/urls';
import { LoginForm } from 'src/app/shared/interfaces/login.interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>( this.getUserFromLocalStorage() );
  public userObservable!: Observable<any>;

  constructor(
    private http: HttpClient
  ) {
    this.userObservable = this.userSubject.asObservable();
  }

  // Getters
  public get currentUser(): any {
    return this.userSubject.value;
  }


  login( formData: LoginForm | any ): Observable<any> {
    return this.http.post( AUTH_LOGIN_URL, formData )
      .pipe(
        tap({
          next: ( user: any ) => {
            if ( user.token ) {
              this.setUserToLocalStorage( user );
              this.userSubject.next( user );
            } 
          },
          error: ( error ) => {
            console.log('Error: ', error );
          }
        })
      );
  }

  logout() {
    this.userSubject.next('');
    localStorage.removeItem( TOKEN_KEY );
    window.location.reload();
  }

  private setUserToLocalStorage( token: string ) {
    localStorage.setItem( TOKEN_KEY, JSON.stringify( token ));
  }

  private getUserFromLocalStorage(): string {
    const userJson = localStorage.getItem( TOKEN_KEY );
    if ( userJson ) return userJson;
    return '';
  }

}
