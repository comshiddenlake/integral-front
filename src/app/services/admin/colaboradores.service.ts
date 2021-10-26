import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Area } from 'src/app/models/area';
import { Asistencia } from 'src/app/models/asistencia';
import { Persona } from 'src/app/models/persona';
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
export class ColaboradoresService {

  constructor(private http: HttpClient,
    private env: EnvService,
    private alertService:AlertService) {
    }

    getAll():Observable<Persona[]> {
      return this.http.get<Persona[]>(this.env.API_URL + '/admin/persona');
    }

    addPersona(persona:Persona): Observable<any> {
      console.log("Personas Admin Service: " + JSON.stringify(persona))
      return this.http.post<any>(this.env.API_URL + '/admin/persona', JSON.stringify(persona), httpOptions).pipe(
        tap((persona) => console.log(`added persona w/ id=${persona.id}`)),
        catchError(this.handleError<any>('addPersona'))
      );
    }
  
    updatePet(pet: Area): Observable<any> {
      return this.http.put(this.env.API_URL + '/pets', JSON.stringify(pet), httpOptions).pipe(
        tap(_ => console.log(`updated pet id=${pet.id}`)),
        catchError(this.handleError<any>('updatePet'))
      );
    }
  
    deletePet(id): Observable<any> {
      return this.http.delete<any>(this.env.API_URL + '/pets' + id, httpOptions).pipe(
        tap(_ => console.log(`deleted pet id=${id}`)),
        catchError(this.handleError<any>('deletePet'))
      );
    }

  getAistencias() {
    return this.http.get<Asistencia[]>(this.env.API_URL + "/asistencias");
  }

  getAistenciasByPersonaId(idPersona) {
    return this.http.get<Asistencia[]>(this.env.API_URL + "/asistencias/persona/" + idPersona);
  }

  setAssistanceMulti(date: string, idPersona: string, idTipoAsistencia: string) {

    let asistencia:Asistencia[] = [];
    for (let u = 0; u < date.length; u++) {
    let asist:Asistencia = new Asistencia();
    asist.id = ""
    asist.fecha = date[u]
    console.log(JSON.stringify(asistencia))
    asistencia.push(asist)
    }
    //Object.keys(order).forEach(slug => slugs.push(order[slug].slug));
    return this.http.post(this.env.API_URL + "/asistencias/multi/"+idPersona+"/"+idTipoAsistencia, asistencia).subscribe(data => {
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