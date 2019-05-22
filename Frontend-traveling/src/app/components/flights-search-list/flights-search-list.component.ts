import { Component, OnInit, Input } from '@angular/core';
import { FlightsService } from '../../services/flights.service'
import { SearchReq } from '../../models/search-req'
import { Flight } from '../../models/flight'

@Component({
  selector: 'app-flights-search-list',
  templateUrl: './flights-search-list.component.html',
  styleUrls: ['./flights-search-list.component.css']
})
export class FlightsSearchListComponent implements OnInit {
  @Input() searchFlightReq: SearchReq;
  availibleFlights: Object[];

  constructor(private flightsService: FlightsService) {
    this.availibleFlights = [];
    this.getFlights();
  }

  ngOnInit() {

  }
  //search flight by Params
  getFlightsByReq(searchFlightReq) {
    //console.log("I was called from parentComp");

    this.flightsService.getAvailableFlightsByReq(searchFlightReq)
    .then(
      res => {
         this.availibleFlights = res;
      },
      error => console.log(error)
    );
  }

  getFlights() {
    this.flightsService.getAvailableFlights()
    .then(
      res => {
        debugger
         this.availibleFlights = res;
      },
      error => console.log(error)
    );
  }

}
