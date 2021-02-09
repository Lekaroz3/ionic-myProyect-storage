import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ZapadbService } from '../core/zapadb.service';
import { IZapatilla } from '../shared/interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public zapatillas: IZapatilla[];
  zapatillasinit: IZapatilla[] = [
    {
      id: "0",
      nombre: 'Adidas boost',
      descripcion: 'Muy comodas para ir a correr',
      precio: "120",
      urlImagen: 'https://www.roadrunningreview.com/Adidas-Ultraboost-20_1024_1_100663.jpg'
  },
  {
    id: "1",
    nombre: 'Adidas boostrap',
    descripcion: 'Muy comodas para ir a correr',
    precio: "70",
    urlImagen: 'https://www.roadrunningreview.com/Adidas-Ultraboost-20_1024_1_100663.jpg'
}

  ]

  constructor(private zapadbService: ZapadbService, private route: Router) {}

  ngOnInit() {
    //If database is empty set initial values
    this.inicialization();
  }

  ionViewDidEnter(){
    //Remove elements if it already has values
    if(this.zapatillas !== undefined){
      this.zapatillas.splice(0);
    }
    this.retrieveValues();
  }

  inicialization(){
    if(this.zapadbService.empty()){
      this.zapatillasinit.forEach(zapa => {
        this.zapadbService.setItem(zapa.id, zapa);
      });
    }
  }

  retrieveValues(){
    //Retrieve values
    this.zapadbService.getAll().then(
      (data) => this.zapatillas = data
    );      
  }
  
  zapaTapped(zapa){
    this.route.navigate(['details', zapa.id]);
  }


}
