import { Injectable } from '@angular/core';
import { SearchReq } from '../models/search-req'
import { Flight } from '../models/flight'
import { Http, } from '@angular/http';
import { HttpParams, HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FlightReservation } from '../models/flight-reservation';

import 'rxjs/add/operator/map';

@Injectable()
export class FlightsService {

  constructor(private http: Http) { }

  getAllBookings() {
    const url = 'http://localhost:8081/traveling-rest-api/v1/flight/booking';
   return this.http.get(url, { withCredentials: true }).toPromise()
   .then(response => response.json());
 }

  getAvailableFlights() {
     const url = 'http://localhost:8081/traveling-rest-api/v1/flights';
    return this.http.get(url, { withCredentials: true }).toPromise()
    .then(response => response.json());
  }

  getAvailableFlightsByReq(searchFlightReq) {
    /*
    {
    "departureDate": "2019-05-12",
    "fromCity": "Tunis",
    "passengerNbr": 1,
    "returnDate": "2019-05-21",
    "toCity": "Frankfurt"
    }
    */
    const body = searchFlightReq;
    /*let params = new HttpParams();
    params = params.append('searchParams', body);*/

    const url = 'http://localhost:8081/traveling-rest-api/v1/flight?action=search';
    return this.http.post(url, JSON.stringify(body), { withCredentials: true }).toPromise()
    .then(response => response.json());
  }

  getPaymentInfo(payment_id, payment_type) {
    const url = 'http://localhost:8081/traveling-rest-api/v1/payment?payment_id=' + payment_id + '&payment_type=' + payment_type;
   return this.http.get(url, { withCredentials: true }).toPromise()
   .then(response => response.json());
  }

  addNewFlight(flightInfo) {
    const body = flightInfo;
    const url = 'http://localhost:8081/traveling-rest-api/v1/flight';

    return new Promise((resolve, reject) => {
      this.http.post(url, JSON.stringify(body), { withCredentials: true }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  newBookingFlight(flightReservation: FlightReservation) {
    const body = flightReservation;
    const url = 'http://localhost:8081/traveling-rest-api/v1/flight/booking';

    /*const body = {
      id_flight: '1',
      firstName: 'Hana',
      lastName: 'Ghodbane',
      email: 'hana.ghodbane@gmail.com.ghodbane@gmail.com',
      address: 'Amalienstr 4',
      addressOpt: '',
      country: 'DE',
      state: 'Karlsruhe',
      zipCode: '76133',
      paymentMethod: true,
      paymentInfos: {
        'credit': {
          cardHolder: 'Tawfik Ghodbane',
          cardNumber: 'DE 2145 4785 1122 3356 4196',
          expiryMonth: '09',
          expiryYear: '2020',
          cvvCode: '133'
        },
        'debit': {
          bankHolder: 'Hana Ghodbane',
          ibanNumber: 'DE 2145 4785 1122 3356 4196',
          bankName: 'Tunsi Bank',
          expiryMonth: '12',
          expiryYear: '2019'
        }
      }
    };*/
    return new Promise((resolve, reject) => {
      this.http.post(url, JSON.stringify(body), { withCredentials: true }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });

  }
}
