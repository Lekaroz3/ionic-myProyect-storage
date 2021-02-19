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
  
  zapatillas:any;
  zapaNombre: string;
  zapaDescripcion:string;
  zapaPrecio:string;
  zapaUrlImagen:string;
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
            this.CreateZapatilla();
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

  CreateZapatilla(){
    this.zapatillas = this.zapaForm.value;
    let zapa = {};
    zapa['nombre'] = this.zapatillas.nombre;
    zapa['descripcion'] = this.zapatillas.descripcion;
    zapa['precio'] = this.zapatillas.precio;
    zapa['urlImagen'] = this.zapatillas.urlImagen;
    
    this.zapadbService.createZapatilla(zapa).then(resp =>{
      this.zapaNombre = "";
      this.zapaDescripcion = "";
      this.zapaPrecio = "";
      this.zapaUrlImagen = "";
    }).catch(error => {
      console.log(error);
      
    });
  }

}
