import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TipoAsistencia } from '../models/tipoAsistencia';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class TipoAsistenciaService {

  constructor(private http: HttpClient,
    private env: EnvService) { }

  getTipoAsistencias() {
    return this.http.get<TipoAsistencia[]>(this.env.API_URL + "/asistencias_tipo")
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
