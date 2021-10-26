import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Area } from 'src/app/models/area';
import { User } from 'src/app/models/user';
import { AreasService } from 'src/app/services/admin/areas.service';
import { UsuariosService } from 'src/app/services/admin/usuarios.service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.page.html',
  styleUrls: ['./areas.page.scss'],
})
export class AreasPage implements OnInit {

  areaForm: FormGroup;
  newArea: Area;
  submitted = false;
  users:User[];
  areas:Area[];
  lider:User;
  referente:User;
  //breeds: Breed[];
  //species: Specie[];
  //selectedSpecie: Specie;
  //selectedBreed: Breed;
  

  constructor(private formBuilder: FormBuilder,
    private areaAdminService:AreasService,
    private router:Router,
    private usuarioService:UsuariosService) {
    this.areaForm = this.formBuilder.group({
      id: [''],
      nombre: [''],
      referente:[''],
      lider:['']
      /*birthdate: [''],
      castration: ['false'],
      mating: ['false'],
      adoptable: ['false'],
      lost: ['false'],
      //species: [this.species],
      //breeds: [this.breeds],
      qrFile: [''],
      profilePic: ['']*/
    });
  }

  ngOnInit() {
    this.usuarioService.getAll().subscribe((temp) => 
      this.users = temp
    //console.log(JSON.stringify(temp)
  );
  this.areaAdminService.getAll().subscribe((temp) =>
  this.areas = temp);
    
  }

 

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.areaForm.invalid) {
      return;
    } 
    this.newArea = new Area(this.areaForm.value);
    this.newArea.referente = this.referente;
    this.newArea.lider = this.lider;
    //console.log('Selected breed: '+JSON.stringify(this.selectedBreed[0]) + '\n newPet: '+ JSON.stringify(this.newPet));
    //this.newPet.breeds = this.selectedBreed[0];
    //this.newPet.species = this.selectedSpecie;
    console.log(JSON.stringify(this.newArea))
    this.areaAdminService.addArea(this.newArea).subscribe((result) => {
      this.router.navigate(['']);
    }, (err) => {
      console.log(err);
    });
  }

  editarArea(area:Area) {
    console.log(area.id)
  }

  //esta funcion pedorra hace que puedas acceder desde el formulario con f. a los campos
  get f() { return this.areaForm.controls; }
}
