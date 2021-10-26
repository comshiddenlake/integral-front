import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DayConfig, CalendarModalOptions, CalendarModal, CalendarResult } from 'ion2-calendar';
import { Asistencia } from 'src/app/models/asistencia';
import { Persona } from 'src/app/models/persona';
import { TipoAsistencia } from 'src/app/models/tipoAsistencia';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { ColaboradoresService } from 'src/app/services/colaboradores.service';
import { TipoAsistenciaService } from 'src/app/services/tipo-asistencia.service';

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
  vacaciones= 0;
  franco = 0;
  licencia = 0;
  tipoAsistencia: TipoAsistencia[] = [];
  tipo = '';
  personas;
  persona = null;
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
          console.log(JSON.stringify(this.personas))
      });
    this.tipoAsistenciaService.getTipoAsistencias().subscribe(
      (tipoAsistencia) => {
        this.tipoAsistencia = tipoAsistencia,
          console.log('tipo asistencia:' + JSON.stringify(this.tipoAsistencia))
      });
    if (this.persona != null)
      this.asistenciaService.getAistenciasByPersonaId("0").subscribe(
        (asistencias) => this.prepareCalendar(this.personas[0], asistencias));
  }

  async prepareCalendar(persona: Persona, asistencias: Asistencia[]) {
    this.dates = [];
    console.log('prepareCalendar persona:' + JSON.stringify(persona) + 'asistencia: ' + JSON.stringify(asistencias))
    console.log(JSON.stringify(persona.inicioActividad))
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

    let aux = persona.inicioActividad.split("-")
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
    if (this.persona){
    this.asistenciaService.getAistenciasByPersonaId(this.persona.id).subscribe(
      (asistencias) => this.asistencias = asistencias);
    console.log('initialize' + JSON.stringify(this.persona));
  }
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
