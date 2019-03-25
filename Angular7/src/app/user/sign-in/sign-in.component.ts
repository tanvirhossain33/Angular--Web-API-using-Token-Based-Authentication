import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  isLoginError = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  OnSubmit(userName, password) {
    this.userService.userAuthentication(userName, password).subscribe(
      (data: any) => {
        localStorage.setItem('userToken', data.access_token);
        localStorage.setItem('userRoles', data.role);
        this.router.navigate(['/home']);
        this.isLoginError = false;
    },
    (error: HttpErrorResponse) => {
      this.isLoginError = true;
    });
  }

}
