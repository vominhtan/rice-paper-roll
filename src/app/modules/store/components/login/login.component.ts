import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'rpr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authenticationSrv: AuthenticationService,
    private snackBar: MatSnackBar,
    ) {
    this.form = fb.group({
      password: ['', [Validators.required]],
      username: [''],
    });
  }

  ngOnInit() {}

  login() {
    this.authenticationSrv.login(this.form.value).subscribe(() => {
      this.snackBar.open('Hế lô! Chào mừng đã trở lại', '', {
        duration: 2000,
      });
    });
  }
}
