import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FlightReservation } from '../../models/flight-reservation';
import { FlightsService } from '../../services/flights.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-flight-booking',
  templateUrl: './flight-booking.component.html',
  styleUrls: ['./flight-booking.component.css']
})
export class FlightBookingComponent implements OnInit, OnDestroy {
  private id_flight_param: string;
  private sub: Subscription;

  flightReservation: FlightReservation = {
    id_flight: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    addressOpt: '',
    country: '',
    state: '',
    zipCode: '',
    paymentMethod: true,
    paymentInfos: {
      'credit': {
        cardHolder: '',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvvCode: ''
      },
      'debit': {
        bankHolder: '',
        ibanNumber: '',
        bankName: '',
        expiryMonth: '',
        expiryYear: ''
      }
    }
  }

  constructor(
    private flashMessagesService: FlashMessagesService,
    private filghtsService: FlightsService,
    private route: ActivatedRoute,
    private router: Router
  ) {

   }

  ngOnInit() {
    // assign the subscription to a variable so we can unsubscribe to prevent memory leaks
    this.sub = this.route.params.subscribe(params => {
      this.id_flight_param = params['id'];
      if (this.id_flight_param) {
        this.flightReservation.id_flight = this.id_flight_param;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmitBookFlight({value, valid}: { value: FlightReservation, valid: boolean}) {
      if (!valid) {
         this.router.navigate(['flight/booking/' + this.id_flight_param]);
         this.flashMessagesService.show("Failed to book this Flight!", {cssClass:'alert-danger', timeout:4000});

      } else {
        // Add new client
        this.filghtsService.newBookingFlight(value);
        this.router.navigate(['/']);
        this.flashMessagesService.show("Flight was booked successfully!", {cssClass:'alert-success', timeout:4000});

      }
  }
}
