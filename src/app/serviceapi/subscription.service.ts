import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private _BASE_URL: string = "https://selfcare-service.demo.melita.com/interview/api/offers"
  constructor(private http: HttpClient) { }

  getSubscriptions(){
    const endpoint = `${this._BASE_URL}/100/subscriptions`;
    return this.http.get(endpoint);
  }

}
