import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isSubmitted = false;
  returnUrl = '';

  public loginForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [ localStorage.getItem('email') || '', [ Validators.required, Validators.email ] ],
      password: ['', Validators.required ]
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  get fc() {
    return this.loginForm.controls;
  }

  submit() {
    console.log( this.loginForm.value );
    this.isSubmitted = true;
    if ( !this.loginForm.valid ) {
      return;
    }

    this.authService.login({
      email: this.fc['email'].value,
      password: this.fc['password'].value
    })
      .subscribe({
        next: user => {
          console.log( user );
          this.router.navigateByUrl( this.returnUrl );
        },
        error: error => console.log( error )
      });
  }

}
