import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {
  api = environment.apiRest;

  constructor( private  http: HttpClient ) { }

  getUrls() {
    return this.http.get(`${this.api}/urls`);
  }
}
