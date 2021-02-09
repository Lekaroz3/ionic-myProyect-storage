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
  public zapa:IZapatilla;

  constructor(private activatedRouter: ActivatedRoute,
    private router: Router,
    private zapadbService: ZapadbService,
    public toastController: ToastController) { }

  ngOnInit() {
    this.id = this.activatedRouter.snapshot.params.id;
    this.zapadbService.getItem(this.id).then(
      (data:IZapatilla) => this.zapa = data
    );
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
            this.zapadbService.remove(id);
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

}
