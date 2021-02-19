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
  zapa:any;
  zapaForm: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private zapadbService: ZapadbService,
    public toastController: ToastController
  ) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.params.id;
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
          this.zapaForm = new FormGroup({
            nombre: new FormControl(this.zapa.nombre),
            descripcion: new FormControl(this.zapa.descripcion),
            precio: new FormControl(this.zapa.precio),
            urlImagen: new FormControl(this.zapa.urlImagen)
      })
        }
      }
      );


    })



   


    this.zapaForm = new FormGroup({
      nombre: new FormControl(''),
      descripcion: new FormControl(''),
      precio: new FormControl(''),
      urlImagen: new FormControl('')
    });

   
  }

  onSubmit(){
    this.zapa = this.zapaForm.value;
    this.UpdateRecord(this.zapa);

    this.router.navigate(['']);
  }

  EditZapatilla(zapa){
    zapa.isEdit = true;
    zapa.EditNombre = zapa.nombre;
    zapa.EditDescripcion = zapa.descripcion;
    zapa.EditPrecio = zapa.precio;
    zapa.EditUrlImagen = zapa.urlImagen;
  }

  UpdateRecord(zapaRow){
    let zapa = {};
    zapa['nombre'] = zapaRow.EditNombre;
    zapa['descripcion'] = zapaRow.EditDescripcion;
    zapa['precio'] = zapaRow.EditPrecio;
    zapa['urlImagen'] = zapaRow.EditUrlImagen;

    this.zapadbService.updateZapatilla(this.id,zapaRow);
    zapaRow.isEdit = false;
  }

}
