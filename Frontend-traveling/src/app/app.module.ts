import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

import { AddFlightComponent } from './components/add-flight/add-flight.component';
import { AddHotelComponent } from './components/add-hotel/add-hotel.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { AddReservationComponent } from './components/add-reservation/add-reservation.component';
import { FlightsSearchListComponent } from './components/flights-search-list/flights-search-list.component';
import { HotelsSearchListComponent } from './components/hotels-search-list/hotels-search-list.component';
import { FlightBookingComponent } from './components/flight-booking/flight-booking.component';
import { HotelBookingComponent } from './components/hotel-booking/hotel-booking.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ListClientsComponent } from './components/list-clients/list-clients.component';
import { AdminSettingsComponent } from './components/admin-settings/admin-settings.component';
import { ClientMyspaceComponent } from './components/client-myspace/client-myspace.component'

import { FlightsService } from './services/flights.service';
import { AuthService } from './services/auth.service';
import { ClientService } from './services/client.service';
import { HotelsService } from './services/hotels.service';
import { StorageService } from './services/storage-service.service';

import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomNgbDateParserFormatter } from './custom-ngbDateParserFormatter';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'index', component: HomeComponent},
  {path: 'myspace', component: ClientMyspaceComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'add-flight', component: AddFlightComponent},
  {path: 'add-hotel', component: AddHotelComponent},
  {path: 'client-details/:id', component: ClientDetailsComponent},
  {path: 'edit-client/:id', component: EditClientComponent},
  {path: 'add-reservation', component: AddReservationComponent},
  {path: 'flights-search-list', component: FlightsSearchListComponent},
  {path: 'hotels-search-list', component: HotelsSearchListComponent},
  {path: 'flight/booking/:id', component: FlightBookingComponent},
  {path: 'hotel/booking/:id', component: HotelBookingComponent},
  {path: '**', component: PageNotFoundComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    AddFlightComponent,
    AddHotelComponent,
    ClientDetailsComponent,
    EditClientComponent,
    AddReservationComponent,
    FlightsSearchListComponent,
    HotelsSearchListComponent,
    FlightBookingComponent,
    HotelBookingComponent,
    PageNotFoundComponent,
    SidebarComponent,
    HomeComponent,
    ListClientsComponent,
    AdminSettingsComponent,
    ClientMyspaceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    FlashMessagesModule,
    HttpModule
  ],  
  providers: [ 
              FlightsService, AuthService, ClientService, HotelsService, StorageService
             ,{
                provide: NgbDateParserFormatter, useFactory: CustomNgbDateParserFormatterFactory()
             }
            ] ,
  bootstrap: [AppComponent]
})
export class AppModule { }

export function CustomNgbDateParserFormatterFactory() {
  return () => new CustomNgbDateParserFormatter('dd-MM-yyyy');
}



