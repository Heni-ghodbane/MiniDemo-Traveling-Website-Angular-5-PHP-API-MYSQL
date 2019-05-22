import { Injectable } from '@angular/core';
import { Http, } from '@angular/http';
import { HttpParams, HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Body } from '@angular/http/src/body';

@Injectable()
export class ClientService {

  constructor(private http: Http) { }

  register(clientReq){
    const body = clientReq;
    const url = 'http://localhost:8081/traveling-rest-api/v1/user?action=register';
    return new Promise((resolve, reject) => {
      this.http.post(url, JSON.stringify(body), { withCredentials: true }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  getAllClients() {
     const url = 'http://localhost:8081/traveling-rest-api/v1/users';
     return this.http.get(url, { withCredentials: true }).toPromise()
    .then(response => response.json());
  }

}
