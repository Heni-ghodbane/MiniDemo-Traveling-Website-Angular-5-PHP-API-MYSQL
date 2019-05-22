import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../../services/flights.service'


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  listReservations = [];

  constructor(
    private flightsService: FlightsService) {

    this.getBookings();

   }

   getBookings() {
    this.flightsService.getAllBookings()
    .then(
      res => {
         this.listReservations = res;
      },
      error => console.log(error)
    );
  }

  getPaymentInfo(id_payment, payment_type) {
    this.flightsService.getPaymentInfo(id_payment, payment_type)
    .then(
      res => {
         return res;
      },
      error => console.log(error)
    );
  }



  ngOnInit() {
  }

}
