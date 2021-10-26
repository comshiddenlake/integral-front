import { Component, OnInit } from '@angular/core';

import { CalendarModalOptions, CalendarResult, CalendarModal } from 'ion2-calendar';

import { DayConfig } from 'ion2-calendar'
import { AsistenciaService } from '../services/asistencia.service';
import { TipoAsistenciaService } from '../services/tipo-asistencia.service';

import { Asistencia } from '../models/asistencia';
import { TipoAsistencia } from '../models/tipoAsistencia';
import { ColaboradoresService } from '../services/colaboradores.service';
import { Persona } from '../models/persona';
import { ModalController } from '@ionic/angular';
import { NullTemplateVisitor } from '@angular/compiler';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage implements OnInit {

  days;
  days_label = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
  inicio;
  asistencias: Asistencia[];
  presente = 0;
  ausente = 0;
  baja = 0;
  vacaciones = 0;
  franco = 0;
  licencia = 0;
  tipoAsistencia: TipoAsistencia[] = [];
  tipo = '';
  sele : Persona[];
  personas : Persona[];
  persona = new Persona();
  dates: string[] = [];

  _daysConfig: DayConfig[] = [];

  options: CalendarModalOptions = {
    pickMode: 'range',
    //showToggleButtons: true,
    weekdays: this.days_label,
    //monthPickerFormat: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
    color: 'dark',
    daysConfig: this._daysConfig,
  };

  constructor(private asistenciaService: AsistenciaService,
    private tipoAsistenciaService: TipoAsistenciaService,
    private colaboradesService: ColaboradoresService,
    private modalCtrl: ModalController) {

  }
  async ngOnInit() {
    await this.colaboradesService.getColaboradores().subscribe(
      (colaboradores) => {
        this.personas = colaboradores,
          console.log('personas: ' + JSON.stringify(this.personas) + 'asistencias persona0: ' + JSON.stringify(this.personas[0].asistencia))
      });
    this.tipoAsistenciaService.getTipoAsistencias().subscribe(
      (tipoAsistencia) => {
        this.tipoAsistencia = tipoAsistencia,
          console.log('tipo asistencia:' + JSON.stringify(this.tipoAsistencia))
      });
    if (this.persona != null)
      this.asistenciaService.getAistenciasByPersonaId("0").subscribe(
        (asistencias) => {
          //this.prepareCalendar(this.personas[0], asistencias)
          //this.prepareCalendar(this.personas)
          console.log("Personas: " + JSON.stringify(this.personas))

          //console.log("Personas 0 asistencias: " + JSON.stringify(this.personas[0].asistencia))
          //console.log("############################################pim: " + this.personas.asistencia.sort((a, b) => new Date(a.fecha).getTime() > new Date(b.fecha).getTime()));

        });

    var dt = new Date();
    var month = dt.getMonth(); // read the current month
    var year = dt.getFullYear(); // read the current year

    dt = new Date(year, month, 1);//Year , month,date format

    var first_day = dt.getDay(); //, first day of present 

    console.log("Primer día: " + first_day)

    dt.setMonth(month + 1, 0); // Set to next month and one day backward.
    var last_date = dt.getDate(); // Last date of present month

    console.log("last_date: " + last_date)
  }

  //async prepareCalendar(persona: Persona, asistencias: Asistencia[]) {
  async prepareCalendar(persona: Persona[]) {
    this.dates = [];
    /*console.log("Personita: " + JSON.stringify(personita.asistencia))*/
    console.log('prepareCalendar persona: ' + (JSON.stringify(persona)) +
      ' prepareCalendar asistencia: ')

    //console.log(JSON.stringify(persona.inicioActividad))
    this.presente = this.baja = this.franco = this.licencia = 0;
    console.log("asistencia length:" + JSON.stringify(persona[0].asistencia.length))
    if (persona[0].asistencia.length)
      for (let q = 0; q < persona[0].asistencia.length; q++) {
        let tipo = '';
        console.log('preparecalendar log1' + persona[0].asistencia[q].tipoAsistencia.tipoAsistencia)
        let aux = persona[0].asistencia[q].fecha.split("-")
        let year = parseInt(aux[2].substring(0, aux[2].length));
        let month = parseInt(aux[1].substring(0, aux[1].length)) - 1;
        let day = parseInt(aux[0].substring(0, aux[0].length));
        console.log(year + ' ' + month + ' ' + day)
        switch (persona[0].asistencia[q].tipoAsistencia.tipoAsistencia) {
          case ("AUSENTE"):
            tipo = 'my-day';
            this.ausente++;
            break;
          case ("PRESENTE"):
            tipo = 'presente';
            this.presente++;
            break;
          case ("FRANCO"):
            tipo = 'cofran';
            this.franco++;
            break;
          case ("VACACIONES"):
            tipo = 'vacaciones';
            this.vacaciones++;
            break;
        }
        this._daysConfig.push({
          date: new Date(year, month, day),
          cssClass: tipo
        })
      }
    console.log('persona inicio actividad:' + JSON.stringify(persona[0].inicioActividad))
    let aux = persona[0].inicioActividad.split("-")
    let yearInicioActividad = parseInt(aux[2].substring(0, aux[2].length));
    let monthInicioActividad = parseInt(aux[1].substring(0, aux[1].length)) - 1;
    let dayInicioActividad = parseInt(aux[0].substring(0, aux[0].length));

    const options: CalendarModalOptions = {
      title: 'Asistencias',
      from: new Date(yearInicioActividad, monthInicioActividad, dayInicioActividad),
      pickMode: 'multi',
      defaultDate: new Date(),
      //showToggleButtons: true,
      weekdays: this.days_label,
      //monthPickerFormat: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
      color: 'dark',
      daysConfig: this._daysConfig,
    };

    const myCalendar = await this.modalCtrl.create({
      component: CalendarModal,
      componentProps: { options }
    });

    myCalendar.present();

    const event: any = await myCalendar.onDidDismiss();
    const date = event.data;
    const from: CalendarResult = date.from;
    const to: CalendarResult = date.to;

    for (let t = 0; t < date.length; t++) {
      console.log('length: ' + date.length)
      console.log('date.string: ' + JSON.stringify(date))
      console.log('didmiss' + date[t].string)

      let aux = date[t].string.split("-")
      let day = parseInt(aux[2]);
      let month = parseInt(aux[1]);
      let year = parseInt(aux[0]);

      console.log('parsed ' + year + ' ' + month + ' ' + day)
      this.dates.push(day + '-' + month + '-' + year)
    }
    console.log('dates: ' + JSON.stringify(this.dates));
  }

  initializeCalendar() {
    console.log('cambio el select' + JSON.stringify(this.sele))
    /* console.log('persona.id: ' + this.persona.id)
     if (this.persona){
     this.asistenciaService.getAistenciasByPersonaId(this.persona.id).subscribe(
       (asistencias) => this.asistencias = asistencias);
     console.log('initializeCalendar(): ' + JSON.stringify(this.persona));
   }*/
  }

  openCalendar(asistencias) {
    this.presente = this.baja = this.franco = this.licencia = 0;
    for (let q = 0; q < asistencias.length; q++) {
      let tipo = '';
      console.log(asistencias[q].tipoAsistencia.tipoAsistencia)
      let aux = asistencias[q].fecha.split("-")
      let year = parseInt(aux[2].substring(0, aux[2].length));
      let month = parseInt(aux[1].substring(0, aux[1].length)) - 1;
      let day = parseInt(aux[0].substring(0, aux[0].length));
      console.log(year + ' ' + month + ' ' + day)
      switch (asistencias[q].tipoAsistencia.tipoAsistencia) {
        case ("AUSENTE"):
          tipo = 'my-day';
          this.ausente++;
          break;
        case ("PRESENTE"):
          tipo = 'presente';
          this.presente++;
          break;
        case ("FRANCO"):
          tipo = 'cofran';
          this.franco++;
          break;
      }
      this._daysConfig.push({
        date: new Date(year, month, day),
        cssClass: tipo
      })
    }
  }

  onChange($event) {
    console.log("onchange event called");
    for (let u = 0; u < $event.length; u++) {
      console.log($event[u]._d);
      let date = new Date($event[u]._d)
      console.log("date:" + date)
    }
  }

  async mandaleMecha(dates, persona: Persona, tipoAsistencia: TipoAsistencia) {
    let idPersona = persona.id
    let idTipoAsistencia = tipoAsistencia.id
    await this.asistenciaService.setAssistanceMulti(dates, idPersona, idTipoAsistencia);
    this.initializeVar();

  }

  initializeVar() {
    this.presente = 0;
    this.ausente = 0;
    this.baja = 0;
    this.franco = 0;
    this.licencia = 0;
    this.vacaciones = 0;
    this.dates = [];
    this.asistencias = [];
    this.persona = null;
    this.tipo = null;
  }

}
