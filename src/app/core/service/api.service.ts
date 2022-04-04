import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  //'https://fakestoreapi.com/products'
  //Original api is not stable so I am using Mock Api to copy it!
  //'https://mocki.io/v1/4cf7c399-ba7e-4d22-89e7-ab85b0b5ea0c'

  getProduct() {
    return this.http
      .get<any>('https://mocki.io/v1/4cf7c399-ba7e-4d22-89e7-ab85b0b5ea0c')
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
