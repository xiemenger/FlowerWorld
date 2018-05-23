import {Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductProvider {

  constructor(
              public http: Http) {
    
  }

  getProducts(){
    return this.http.get('/assets/data.json')
      .map(response => response.json());
  }
  
}
