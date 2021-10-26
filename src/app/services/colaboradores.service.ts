import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { EnvService } from './env.service';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class ColaboradoresService {

  constructor(private http: HttpClient,
    private env: EnvService) {
    console.log('Hello ProviersMarketsProvider Provider');
  }

  getColaboradores() {
    return this.http.get<Persona[]>(this.env.API_URL + '/persona');
  }

  getColaborador(id) {
    return this.http.get(this.env.API_URL + '/persona/'+ id);
  }

  getOrders() {
    return this.http.get('http://'+this.env.API_URL + 'auth/user/orders')
  }

  newOrder(SLUG, IDENTIFICABLE, order) {
    let slugs = new Array();
    Object.keys(order).forEach(slug => slugs.push(order[slug].slug));
    return this.http.post('http://' + SLUG + this.env.API_URL + 'orders', { 'Products': slugs, 'Commerce': SLUG, 'Board': IDENTIFICABLE }, {
    }).subscribe(data => {
    }, error => {
      console.log(JSON.stringify(error));
    });
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