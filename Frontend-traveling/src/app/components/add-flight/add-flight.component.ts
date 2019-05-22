import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { FlightsService } from '../../services/flights.service'
import { Flight } from 'app/models/flight';

import Utils from '../../utils/utils'
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {
  listFlights = [];
  flightReq: Flight = {
    fromCity: '',
    toCity: '',
    departureDate: '',
    returnDate: '',
    departureHour: '',
    returnHour: '',
    airlineName: '',
    flightDuration: '',
    classType: '',
    isFoodInkl: 0,
    seatsNbr: 0,
    price: 0,
  };

  departureDuration =  {
    hours: '0',
    minutes: '0'
  };

  returnDuration = {
    hours: '0',
    minutes: '0'
  };

  addFlightReq: any;
  minDate: NgbDateStruct;


  constructor(
    private flashMessagesService: FlashMessagesService,
    private flightsService: FlightsService,
    private route: ActivatedRoute,
    private router: Router) {
    this.getAvailableFlights();

      const current = new Date();

      // disable previous dates
      this.minDate = {
        year: current.getFullYear(),
        month: current.getMonth() + 1,
        day: current.getDate()
      };

    }




  getAvailableFlights() {
    this.flightsService.getAvailableFlights()
    .then(
      res => {
         this.listFlights = res;
      },
      error => console.log(error)
    );
  }

  onSubmitNewFlight({valid}: { valid: boolean}) {
    if (!valid) {
      this.router.navigate(['/dashboard']);
    } else {
      this.addFlightReq = this.flightReq;
      this.addFlightReq.departureDate = Utils.ngbDateToDateFomatter(this.flightReq.departureDate);
      this.addFlightReq.returnDate = Utils.ngbDateToDateFomatter(this.flightReq.returnDate);
      this.addFlightReq.departureHour = this.departureDuration.hours + ':' + this.departureDuration.minutes;
      this.addFlightReq.returnHour = this.returnDuration.hours + ':' + this.returnDuration.minutes;

      this.flightsService.addNewFlight(this.addFlightReq).then(
       res => {
        this.router.navigate(['/']);
        this.flashMessagesService.show("New Flight added successfully!", {cssClass:'alert-success', timeout:4000});
       },
       error => {console.log(error);
       this.flashMessagesService.show("Failed to add this New Flight!", {cssClass:'alert-danger', timeout:4000});
       }
      );
    }

  }

  calculateFlightDuration() {
    const hours =  parseInt(this.returnDuration.hours, 10) - parseInt(this.departureDuration.hours, 10);
    const minutes = parseInt(this.returnDuration.minutes, 10) - parseInt(this.departureDuration.minutes, 10);
    this.flightReq.flightDuration = hours + ':' + minutes;
    return hours + ':' + minutes
  }

  ngOnInit() {
  }

}
