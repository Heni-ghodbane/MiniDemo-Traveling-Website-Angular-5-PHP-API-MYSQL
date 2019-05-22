import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StorageService } from 'app/services/storage-service.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn;
  isUser;
  isAdmin;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService) {

  }

  onLogoutClick() {
    this.storageService.clearItems();
    this.router.navigate(['/login']);
    this.flashMessagesService.show("Your are you've been logged out of space!", {cssClass:'alert-success', timeout:4000});
  }

  ngOnInit() {
    this.storageService.watchStorage().subscribe((data:string) => {
    // this will call whenever your localStorage data changes
    // use localStorage code here and set your data here for ngFor
    this.isLoggedIn =  localStorage.getItem('isLoggedIn') === 'true' ? true : false;
    this.isUser = localStorage.getItem('isUser') === 'true' ? true : false;
    this.isAdmin = localStorage.getItem('isAdmin') === 'true' ? true : false;

    });
  }

}
