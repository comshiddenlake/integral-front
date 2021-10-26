import { HttpClient, HttpHeaders } from '@angular/common/http';
import { destroyPlatform, Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';

import { BehaviorSubject, from, Observable, of } from 'rxjs';
//import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { ActivatedRoute, Router } from '@angular/router';

import { Platform, NavController } from '@ionic/angular';
import { User } from '../models/user';
import { AppComponent } from '../app.component';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  role;
  user: User;
  name;
  area;
  constructor(private http: HttpClient, private route: ActivatedRoute,
    private envService: EnvService, private navCtrl: NavController,
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('accessToken') !== null;
  }

  login(usernameOrEmail: string, password: string) {
    return this.http.post<User>(this.envService.API_URL + '/auth/signin', { usernameOrEmail, password }, { observe: 'response' }).pipe(tap(res => {
      localStorage.setItem('accessToken', res.headers.get('Authorization'));
      if (res) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(res.body));
        this.currentUserSubject.next(res.body);
        
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.name = this.user.persona.nombre
        let jwt = localStorage.getItem("accessToken")
        let jwtData = jwt.split('.')[1]
        let decodedJwtJsonData = window.atob(jwtData)
        let decodedJwtData = JSON.parse(decodedJwtJsonData)

        let isAdmin = decodedJwtData.scopes[0].authority

        //console.log('jwtData: ' + jwtData)
        //console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
        //console.log('decodedJwtData: ' + decodedJwtData)
        //console.log('Is admin: ' + isAdmin)

        if (isAdmin == 'ROLE_ADMIN') {
          localStorage.setItem('role', isAdmin)
          this.role = isAdmin;
        }

      }
    }))
  }
  /*
    register(signupmodel: signUpModel) {
        return this.http.post(apiUrl + '/auth/signup', JSON.stringify(signupmodel), httpOptions).pipe(
            tap(_ => console.log(`User registered successfully` + signUpModel.name)),
            catchError(this.handleError<any>('registerUser'))
        );
    }
  */
  logout() {
    // remove user from local storage to log user out
    this.user = null;
    this.role = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('role');
    this.currentUserSubject.next(null);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
