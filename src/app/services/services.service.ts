import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class GeneralServices {
  private idiomaActual: string;
  evento_actual: string;


  data_identidadRef: AngularFireObject<any[]>;
  data_identidad: Observable<any[]>;
  general_infoRef: AngularFireObject<any[]>;
  general_info: Observable<any[]>;
  ponentesDataRef: AngularFireObject<any[]>;
  ponentesData: Observable<any[]>;


  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    this.evento_actual = '2017-2';
    this.initIdiomas('es');
    this.loadDatosHedPorEpoca(this.evento_actual, this.idiomaActual);
  }

  initIdiomas(idioma: string): void {
    this.loadDB(idioma, this.evento_actual);
    console.log('entro');
  }

  loadDB(idioma: string, eventoActual: string) {
    this.idiomaActual = idioma;
    this.data_identidadRef = this.db.object('hed_identidad/' + idioma);
    this.data_identidad = this.data_identidadRef.valueChanges();
    this.general_infoRef = this.db.object('general_info/');
    this.general_info = this.general_infoRef.valueChanges();
  }

  loadDatosHedPorEpoca(epoca: string, idioma: string) {
    this.ponentesDataRef = this.db.object(epoca + '/ponentes/' + idioma);
    this.ponentesData = this.ponentesDataRef.valueChanges();
  }

  getIdentidad(): Observable<any[]> {
    return this.data_identidad;
  }

  getGeneral_Info(): Observable<any[]> {
    return this.general_info;
}

 getPonentesInfo(): Observable<any[]> {
    return this.ponentesData;
 }

}
