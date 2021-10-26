import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoAsistencia } from 'src/app/models/tipoAsistencia';
import { TipoAsistenciaService } from 'src/app/services/admin/tipo-asistencia.service';

@Component({
  selector: 'app-tipo-asistencias',
  templateUrl: './tipo-asistencias.page.html',
  styleUrls: ['./tipo-asistencias.page.scss'],
})
export class TipoAsistenciasPage implements OnInit {
  tipoAsistenciaForm: FormGroup;
  submitted = false;
  newTipoAsistencia: TipoAsistencia;
  tipoAsistencias: TipoAsistencia[];

  constructor(private formBuilder: FormBuilder,
    private tipoAsistenciaService: TipoAsistenciaService,
    private router: Router) {
    this.tipoAsistenciaForm = this.formBuilder.group({
      id: [''],
      tipoAsistencia: ['']
    });
  }

  ngOnInit() {
    this.tipoAsistenciaService.getAll().subscribe((temp) =>
      this.tipoAsistencias = temp);

  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.tipoAsistenciaForm.invalid) {
      return;
    }
    this.newTipoAsistencia = new TipoAsistencia(this.tipoAsistenciaForm.value);

    this.tipoAsistenciaService.addTipoAsistencia(this.newTipoAsistencia).subscribe((result) => {
      this.router.navigate(['']);
    }, (err) => {
      console.log(err);
    });
  }
}
