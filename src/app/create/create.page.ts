import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ZapadbService } from '../core/zapadb.service';
import { IZapatilla } from '../shared/interface';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  zapa: IZapatilla;
  zapatillas:IZapatilla[];
  zapaForm: FormGroup;

  constructor(
    private router: Router,
    private zapadbService: ZapadbService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.zapaForm = new FormGroup({
      nombre: new FormControl(''),
      descripcion: new FormControl(''),
      precio: new FormControl(''),
      urlImagen: new FormControl('')
    });
  }

  async onSubmit(){
    const toast = await this.toastController.create({
      header: 'Guardar zapatilla',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.saveZapa();
            this.router.navigate(['home']);
          }
          },
          {
            text: 'CANCELAR',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }             
            
          }
        
      ]
    });
    toast.present();
  }

  saveZapa(){
    this.zapadbService.getAll().then(data => {this.zapatillas = data
      
      
    }).finally(()=>{
      this.zapa = this.zapaForm.value;
      this.zapa.id = (Math.max.apply(Math, this.zapatillas.map(function(o) { return o.id; }))+1).toString();
      this.zapadbService.setItem(this.zapa.id, this.zapa);
    console.warn(this.zapaForm.value);});
    
   
  }

}
