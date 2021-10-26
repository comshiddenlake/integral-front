import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Area } from 'src/app/models/area';
import { Persona } from 'src/app/models/persona';
import { User } from 'src/app/models/user';
import { AreasService } from 'src/app/services/admin/areas.service';
import { UsuariosService } from 'src/app/services/admin/usuarios.service';
import { ColaboradoresService } from 'src/app/services/admin/colaboradores.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  userForm: FormGroup;
  newUser:User;
  submitted = false;
  usuarios: User[];
  personas: Persona[];
  areas: Area[];
  persona:Persona;
  area: Area;
  fechaNac;

  constructor(private formBuilder: FormBuilder,
    private areaAdminService: AreasService,
    private colaboradorService: ColaboradoresService,
    private usuarioService: UsuariosService,
    private router: Router) {
    this.userForm = this.formBuilder.group({
      id: [''],
      username: [''],
      password: [''],
      area: [''],
      persona: [''],
      email: [''],
      role: ['']
    });
  }

  ngOnInit() {
    this.usuarioService.getAll().subscribe((temp) =>
      this.usuarios = temp
    );
    this.colaboradorService.getAll().subscribe((temp) =>
      this.personas = temp
    );
    this.areaAdminService.getAll().subscribe((temp) =>
      this.areas = temp);

  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
    this.newUser = new User(this.userForm.value);
    this.newUser.area = this.area;
    this.newUser.persona = this.persona;
    this.usuarioService.addUsuario(this.newUser).subscribe((result) => {
      this.router.navigate(['']);
    }, (err) => {
      console.log(err);
    });
  }
}
