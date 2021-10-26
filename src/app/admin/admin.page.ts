import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  usuarios() {
    this.router.navigate(['admin/usuarios']);


  }
  feriados() {
    this.router.navigate(['admin/feriados']);


  }
  areas() {
    this.router.navigate(['admin/areas']);


  }
  asistencias() {
    this.router.navigate(['admin/asistencias']);


  }
  colaboradores() {
    this.router.navigate(['admin/colaboradores']);


  }
  francos() {
    this.router.navigate(['francos']);
  }

}
