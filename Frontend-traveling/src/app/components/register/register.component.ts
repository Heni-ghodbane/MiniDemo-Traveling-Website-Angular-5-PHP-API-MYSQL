import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClientService } from '../../services/client.service';
 import Utils from '../../utils/utils'
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerReq = {
    fullName: '',
    birthday: '',
    email: '',
    username: '',
    password: ''
  };

  constructor(
    private flashMessagesService: FlashMessagesService,
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService) {
    }


  onSubmitRegister({valid}: { valid: boolean}) {
    if (!valid) {
      this.router.navigate(['/register']);
    } else {
        this.registerReq.birthday = Utils.ngbDateToDateFomatter(this.registerReq.birthday);

        this.clientService.register(this.registerReq)
        .then((res) => {
           this.router.navigate(['/login']);
           this.flashMessagesService.show("Your are registred successfully!", {cssClass:'alert-success', timeout:4000});

        })
        .catch((err) => {
           this.router.navigate(['/register']);
           this.flashMessagesService.show("Registration was failed!", {cssClass:'alert-success', timeout:4000});

        });

      }
   }


  ngOnInit() {
  }

}
