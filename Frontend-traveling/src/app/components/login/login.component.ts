import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StorageService } from 'app/services/storage-service.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginReq = {
    username: '',
    password: '',
    usertype: ''
  };

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private flashMessagesService: FlashMessagesService
    ) { }

  onSubmitLogin ({value, valid}: { value: any, valid: boolean}) {
    if (!valid) {

      this.router.navigate(['/login']);
    } else {
    this.authService.login(value)
      .then((res) => {
        if (res[0]['usertype'] === 'admin') {
          this.storageService.setItem('isLoggedIn', 'true');
          this.storageService.setItem('isAdmin', 'true');

          this.router.navigate(['/dashboard']);
          this.flashMessagesService.show("Welcome to your Dashboard!", {cssClass:'alert-success', timeout:4000});
        } else if (res[0]['usertype'] === 'client') {
          this.storageService.setItem('isLoggedIn', 'true');
          this.storageService.setItem('isUser', 'true');

          this.router.navigate(['/myspace']);
          this.flashMessagesService.show("Welcome to your Space", {cssClass:'alert-success', timeout:4000});
        } else {
          this.router.navigate(['/login']);
          this.flashMessagesService.show("Login credentials are incorrect!", {cssClass:'alert-danger', timeout:4000});
        }

      })
      .catch((err) => {
         this.router.navigate(['/login']);
         this.flashMessagesService.show("Failed to Login!", {cssClass:'alert-danger', timeout:4000});
      });
    }
  }


  ngOnInit() {
  }



}
