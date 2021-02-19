import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ZapadbService } from '../core/zapadb.service';
import { IZapatilla } from '../shared/interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  id:string;
  public zapa:any;

  constructor(private activatedRouter: ActivatedRoute,
    private router: Router,
    private zapadbService: ZapadbService,
    public toastController: ToastController) { }

  ngOnInit() {
    this.id = this.activatedRouter.snapshot.params.id;
    //this.zapa = this.zapadbService.readZapatillaById(this.id);
    
    this.zapadbService.readZapatillas().subscribe(data=>{
      let zapatillas = data.map(e=>{
        return {
          id: e.payload.doc.id,
          nombre: e.payload.doc.data()['nombre'],
          descripcion: e.payload.doc.data()['descripcion'],
          precio:e.payload.doc.data()['precio'],
          urlImagen:e.payload.doc.data()['urlImagen']
        };
      })
      console.log(zapatillas);
      zapatillas.forEach( element =>{
        if(element.id == this.id){
          this.zapa = element;
        }
      }
      );


    })
    
  }

  editRecord(movie){
    this.router.navigate(['edit', movie.id]) 
  }

  async removeRecord(id){
    const toast = await this.toastController.create({
      header: 'Eliminar zapatilla',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'delete',
          text: 'ACEPTAR',
          handler: () =>{
            this.RemoveZapatilla(id);
            this.router.navigate(['home']);
          }
        },
        {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () =>{
            console.log('Cancel clicked');
            
          }
        }
      ]
    });
    toast.present();
  }


  
  RemoveZapatilla(zapaId){
    this.zapadbService.deleteZapatilla(zapaId);
  }

}
