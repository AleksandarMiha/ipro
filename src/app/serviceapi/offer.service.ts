import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private _BASE_URL: string = "https://selfcare-service.demo.melita.com/interview/api/offers"

  constructor(private http: HttpClient) { }

  getOffers(){
    return this.http.get(this._BASE_URL);
  }
}
