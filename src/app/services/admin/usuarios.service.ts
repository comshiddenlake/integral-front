import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Asistencia } from 'src/app/models/asistencia';
import { User } from 'src/app/models/user';
import { AlertService } from '../alert-service.service';
import { EnvService } from '../env.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient,
    private env: EnvService,
    private alertService: AlertService) { }

  getAll() {
    return this.http.get<User[]>(this.env.API_URL + "/admin/users");
  }

  addUsuario(usuario: User): Observable<any> {
    console.log("Personas Admin Service: " + JSON.stringify(usuario))
    return this.http.post<any>(this.env.API_URL + '/admin/users', JSON.stringify(usuario), httpOptions).pipe(
      tap((usuario) => console.log(`added usuario w/ id=${usuario.id}`)),
      catchError(this.handleError<any>('addPersona'))
    );
  }

  getAistenciasByPersonaId(idPersona) {
    return this.http.get<Asistencia[]>(this.env.API_URL + "/asistencias/persona/" + idPersona);
  }

  setAssistanceMulti(date: string, idPersona: string, idTipoAsistencia: string) {

    let asistencia: Asistencia[] = [];
    for (let u = 0; u < date.length; u++) {
      let asist: Asistencia = new Asistencia();
      asist.id = ""
      asist.fecha = date[u]
      console.log(JSON.stringify(asistencia))
      asistencia.push(asist)
    }
    //Object.keys(order).forEach(slug => slugs.push(order[slug].slug));
    return this.http.post(this.env.API_URL + "/asistencias/multi/" + idPersona + "/" + idTipoAsistencia, asistencia).subscribe(data => {
      this.alertService.presentToast('Carga realizada con éxito')
      window.alert('Carga realizada con éxito')
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
