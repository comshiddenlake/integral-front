import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommerceService } from '../services/commerce.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute,
    private commerceService : CommerceService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  onChange($event) {
    console.log('oli)')
    console.log($event);
  }

  boton() {
    /*this.commerceService.getProducts().subscribe(
      user => {
        console.log(JSON.stringify(user))
      }
    );*/
  }

}
