import { Component, OnInit } from '@angular/core';
import { AUTHORIZE_URL } from '../api-url.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  startStravaWorkflow() {
    window.open(AUTHORIZE_URL, '_self');
    return false;
  }
}
