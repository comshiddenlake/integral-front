import { Component, OnInit } from '@angular/core';
import { Persona } from '../models/persona';
import { ColaboradoresService } from '../services/colaboradores.service';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.page.html',
  styleUrls: ['./colaboradores.page.scss'],
})
export class ColaboradoresPage implements OnInit {

  colaboradores: Persona[];

  constructor(private colaboradoresService:ColaboradoresService) { }

  ngOnInit() {
  }

  boton() {
    this.colaboradoresService.getColaboradores().subscribe(
      user => {
        this.colaboradores = user;
        console.log(JSON.stringify(user))
      }
    );
  }

  

}
