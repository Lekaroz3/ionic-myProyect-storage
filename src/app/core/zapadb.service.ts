import { Injectable } from '@angular/core';
import { IZapatilla } from '../shared/interface';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ZapadbService {

  auxZapa: IZapatilla;
  auxZapaList: IZapatilla[] = [];
  constructor(private storage: Storage) { }

  setItem(reference: string, value: IZapatilla){
    this.storage.set(reference,{id: value.id, nombre: value.nombre, descripcion:value.descripcion, precio: value.precio, urlImagen:value.urlImagen})
      .then(
        (data) => console.log('Stored first item!', data),
        error => console.error('Error storing item', error)
        
      );
  }

    //Gets a stored item
    getItem(refence):Promise<IZapatilla>{
      return this.storage.get(refence);
    }
  
    empty(){
      return this.storage.keys()
        .then(
          (data) => {return true},
          error => {return false}
        );
    }
  
    //Retrieving all keys
    keys(): Promise<string[]>{
      return this.storage.keys();
    }
  
    getAll():Promise<IZapatilla[]>{
      return this.storage.keys().then((k)=>{
        k.forEach(element => {
          this.getItem(element).then(
            (data:IZapatilla) => this.auxZapaList.push(data)
          );
        });
        return this.auxZapaList;
      }
      )
    }
    //Remove s single stored item
  
    remove(reference:string){
      this.storage.remove(reference)
        .then(
          data => console.log(data),
          error => console.error(error)               
        );
    }
  
    //Remove all stored values
    clear(){
      this.storage.clear();
    }
}
