import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CalendarModal, CalendarModalOptions, CalendarResult } from 'ion2-calendar';
import { Feriado } from 'src/app/models/feriado';
import { TipoAsistencia } from 'src/app/models/tipoAsistencia';
import { FeriadosService } from 'src/app/services/admin/feriados.service';
import { TipoAsistenciaService } from 'src/app/services/tipo-asistencia.service';

@Component({
  selector: 'app-feriados',
  templateUrl: './feriados.page.html',
  styleUrls: ['./feriados.page.scss'],
})
export class FeriadosPage implements OnInit {
  feriadoForm: FormGroup;
  submitted = false;
  newFeriado: Feriado;
  newTipoAsistencia: TipoAsistencia;
  tipoAsistencias: TipoAsistencia[];
  feriados: Feriado[];
  constructor(private formBuilder: FormBuilder,
    private tipoAsistenciaService: FeriadosService,
    private router: Router,
    public modalCtrl: ModalController) {
    this.feriadoForm = this.formBuilder.group({
      id: [''],
      fecha: [''],
      descripcion: ['']
    });
  }

  async openCalendar(detail) {
    console.log("detail: " + detail)
    const options: CalendarModalOptions = {
      title: 'BASIC'
    };

    const myCalendar = await this.modalCtrl.create({
      component: CalendarModal,
      componentProps: { options }
    });

    myCalendar.present();

    const event: any = await myCalendar.onDidDismiss();
    const date: CalendarResult = event.data;

    this.f.fecha.setValue(this.parseDate(date))

  }

  ngOnInit() {
    this.tipoAsistenciaService.getAll().subscribe((temp) =>
      this.feriados = temp);

  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.feriadoForm.invalid) {
      return;
    }
    this.newFeriado = new Feriado(this.feriadoForm.value);

    this.tipoAsistenciaService.addFeriado(this.newFeriado).subscribe((result) => {
      this.router.navigate(['']);
    }, (err) => {
      console.log(err);
    });
  }

  parseDate(date) {
    console.log("this.newPersona.fechaNacimiento.string" + date)
    let aux = date.string.split("-")
    console.log(aux[2] + " p " + aux[1] + " o " + aux[0])
    let day = parseInt(aux[2]);
    let month = parseInt(aux[1]);
    let year = parseInt(aux[0]);
    return day + '-' + month + '-' + year
  }
  //esta funcion pedorra hace que puedas acceder desde el formulario con f. a los campos
  get f() { return this.feriadoForm.controls; }
}
