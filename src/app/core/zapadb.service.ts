import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ZapadbService {

  constructor(private firestore: AngularFirestore ) { }

  createZapatilla(zapa){
    return this.firestore.collection('zapatillas').add(zapa);
  }

  readZapatillas(){
    return this.firestore.collection('zapatillas').snapshotChanges();
  }

  readZapatillaById(zapaId){
    return this.firestore.doc('zapatillas/'+zapaId).snapshotChanges();
    
  }

  updateZapatilla(zapaId,zapatilla){
    this.firestore.doc('zapatillas/'+zapaId).update(zapatilla);
  }

  deleteZapatilla(zapaId){
    this.firestore.doc('zapatillas/'+zapaId).delete();
  }

}
