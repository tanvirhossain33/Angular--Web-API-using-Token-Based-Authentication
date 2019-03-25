import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/user.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.+\.[a-z]{2,4}]$';
  roles: any[];

  constructor(private userService: UserService, private toaster: ToastrService) { }

  ngOnInit() {
    this.resetForm();
    this.userService.getAllRoles().subscribe((data: any) => {
      data.forEach(obj => obj.selected = false);
      this.roles = data;
    });
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }

    this.user = {
      UserName: '',
      Password: '',
      Email: '',
      FirstName: '',
      LastName: ''
    };
    if (this.roles) {
      this.roles.map(x => x.selected = false);
    }
  }

  OnSubmit(form: NgForm) {
    var x = this.roles.filter(c => c.selected).map(y => y.Name);
    this.userService.registerUser(form.value, x)
    .subscribe((data: any) => {
      if (data.Succeeded === true) {
        this.resetForm();
        this.toaster.success('User registration successfull');
      } else {
        this.toaster.error(data.Errors[0]);
      }
    });
  }

  updateSelectedRoles(index){
    this.roles[index].selected = !this.roles[index].selected;
  }

}
