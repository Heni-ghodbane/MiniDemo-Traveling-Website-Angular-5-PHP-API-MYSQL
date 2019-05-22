import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchReq } from '../../models/search-req'
import {NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { FlightsSearchListComponent } from '../flights-search-list/flights-search-list.component';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Utils from '../../utils/utils'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchFlightReq: SearchReq = {};
  searchHotelReq: SearchReq = {};

  searchReq: SearchReq = {
    fromCity: '',
    toCity: '',
    departureDate: '',
    returnDate: '',
    passengerNbr: 1
  }
  minDate: NgbDateStruct;
  @ViewChild('flightsSearchListChild') flightsSearchListChild: FlightsSearchListComponent;

  constructor(
     private ngbDateParserFormatter: NgbDateParserFormatter,
    private route: ActivatedRoute,
    private router: Router) {

    const current = new Date(); // get today date

    // disable previous dates
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };

  }

    onSubmitSearchFlights({valid}: { valid: boolean}) {
    if (!valid) {
      this.router.navigate(['/']);

    } else {
        //console.log("I will  my childComp");
      
        this.searchFlightReq = this.searchReq; 
        this.searchFlightReq.departureDate = Utils.ngbDateToDateFomatter(this.searchReq.departureDate);
        this.searchFlightReq.returnDate = Utils.ngbDateToDateFomatter(this.searchReq.returnDate);
        this.flightsSearchListChild.getFlightsByReq(this.searchFlightReq);
      }
   }

   onSubmitSearchHotels(f) {
    console.log('test:' + JSON.stringify(this.searchReq))
  }

  onSelectDate(date: NgbDateStruct){
    if (date != null) {
      return this.ngbDateParserFormatter.format(date);
    }
  }

  ngOnInit() {

  }


}
