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


  zapatillas:any;
  zapaNombre: string;
  zapaDescripcion:string;
  zapaPrecio:string;
  zapaUrlImagen:string;



  constructor(private zapadbService: ZapadbService, private route: Router) {}

  ngOnInit() {
    this.zapadbService.readZapatillas().subscribe(data=>{
      this.zapatillas = data.map(e=>{
        return {
          id: e.payload.doc.id,
          nombre: e.payload.doc.data()['nombre'],
          descripcion: e.payload.doc.data()['descripcion'],
          precio:e.payload.doc.data()['precio'],
          urlImagen:e.payload.doc.data()['urlImagen']
        };
      })
      console.log(this.zapatillas);
      
    })
  }

  
  

  RemoveZapatilla(zapaId){
    this.zapadbService.deleteZapatilla(zapaId);
  }

  

  

  
  zapaTapped(zapa){
    this.route.navigate(['details', zapa.id]);
  }


}
