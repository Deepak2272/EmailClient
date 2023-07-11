import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl('',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
  })
  constructor(private authService : AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    if(this.authForm.invalid){
      return;
    }
    this.authService.signIn(this.authForm.value).subscribe({
      next:response=>{
        this.router.navigateByUrl('/inbox')
        console.log("successfully login")
      },
      error: err=>{
        if(err.error.username || err.error.password){
          this.authForm.setErrors({EmailNotFound:true, PasswordInCorrect:true})
        }
      }
    })
  }
}
