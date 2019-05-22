import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service'

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {
  listClients = [];

  constructor(private clientService: ClientService) {
    this.getAllClients();
   }

   getAllClients() {
    this.clientService.getAllClients()
    .then(
      res => {
         this.listClients = res;
      },
      error => console.log(error)
    );
  }

  ngOnInit() {
  }

}
