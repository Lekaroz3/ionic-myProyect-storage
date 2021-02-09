import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ZapadbService } from '../core/zapadb.service';
import { IZapatilla } from '../shared/interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  id:string;
  zapa: IZapatilla;
  zapaForm: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private zapadbService: ZapadbService,
    public toastController: ToastController
  ) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.params.id;
    this.zapadbService.getItem(this.id).then(
      (data:IZapatilla) => {this.zapa = data;
        this.zapaForm = new FormGroup({
          nombre: new FormControl(this.zapa.nombre),
          descripcion: new FormControl(this.zapa.descripcion),
          precio: new FormControl(this.zapa.precio),
          urlImagen: new FormControl(this.zapa.urlImagen)
        });}
    );

    this.zapaForm = new FormGroup({
      nombre: new FormControl(''),
      descripcion: new FormControl(''),
      precio: new FormControl(''),
      urlImagen: new FormControl('')
    });

   
  }

  onSubmit(){
    this.zapa = this.zapaForm.value;
    
    let nextKey = this.id;
    this.zapa.id = nextKey;
    this.zapadbService.setItem(nextKey, this.zapa);
    this.zapadbService.remove(nextKey);
    console.warn(this.zapaForm.value);

    this.router.navigate(['']);
  }

}
