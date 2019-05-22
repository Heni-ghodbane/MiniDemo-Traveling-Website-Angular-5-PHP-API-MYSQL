import { Component, OnInit, Input } from '@angular/core';
import { SearchReq } from '../../models/search-req'

@Component({
  selector: 'app-hotels-search-list',
  templateUrl: './hotels-search-list.component.html',
  styleUrls: ['./hotels-search-list.component.css']
})
export class HotelsSearchListComponent implements OnInit {
  @Input() searchHotelReq: SearchReq;
  availibleFlights: Object[];
  constructor() { }

  ngOnInit() {
  }

}
