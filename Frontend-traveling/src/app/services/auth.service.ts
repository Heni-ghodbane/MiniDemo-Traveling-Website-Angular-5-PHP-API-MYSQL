import { Injectable } from '@angular/core';
import { Http, } from '@angular/http';
import { HttpParams, HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Body } from '@angular/http/src/body';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

    // Login user
    login(loginReq){
      const body = loginReq;

      const url = 'http://localhost:8081/traveling-rest-api/v1/user?action=login';
      return new Promise((resolve, reject) => {
        this.http.post(url, JSON.stringify(body), { withCredentials: true }).subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
      });
    }

    // Logout User
    logout(){

    }
}
