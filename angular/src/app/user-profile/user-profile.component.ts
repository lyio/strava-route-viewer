import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userName: string;
  profileUrl: string;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    const { name, profile} = this.authenticationService.getUser();
    this.userName = name;
    this.profileUrl = profile;
  }

  redirectToLogin() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
