import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Area } from 'src/app/models/area';
import { Persona } from 'src/app/models/persona';
import { AreasService } from 'src/app/services/admin/areas.service';
import { ColaboradoresService } from 'src/app/services/admin/colaboradores.service';
import {
  CalendarModal,
  CalendarModalOptions,
  DayConfig,
  CalendarResult
} from 'ion2-calendar';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.page.html',
  styleUrls: ['./colaboradores.page.scss'],
})
export class ColaboradoresPage implements OnInit {

  colaboradoresForm: FormGroup;
  newPersona: Persona;
  submitted = false;
  personas: Persona[];
  areas: Area[];
  area: Area;
  fechaNac;

  constructor(private formBuilder: FormBuilder,
    private areaAdminService: AreasService,
    private colaboradorService: ColaboradoresService,
    private router: Router,
    public modalCtrl: ModalController) {
    this.colaboradoresForm = this.formBuilder.group({
      id: [''],
      nombre: [''],
      apellido: [''],
      fechaNacimiento: [''],
      inicioActividad: [''],
      finActividad: [''],
      area: ['']
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

    if (detail === 'fechaNacimiento')
      this.f.fechaNacimiento.setValue(this.parseDate(date))
    else if (detail === 'inicioActividad')
      this.f.inicioActividad.setValue(this.parseDate(date))
    else
      this.f.finActividad.setValue(this.parseDate(date))
  }

  ngOnInit() {
    this.colaboradorService.getAll().subscribe((temp) =>
      this.personas = temp
    );
    this.areaAdminService.getAll().subscribe((temp) =>
      this.areas = temp);

  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.colaboradoresForm.invalid) {
      return;
    }
    this.newPersona = new Persona(this.colaboradoresForm.value);
    this.newPersona.area = this.area;
    this.colaboradorService.addPersona(this.newPersona).subscribe((result) => {
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
  get f() { return this.colaboradoresForm.controls; }
}
