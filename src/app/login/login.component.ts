import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  pwd:string='123456';
  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private router:Router){
    localStorage.clear();
  }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      // username:new FormControl(),
      // pwd:new FormControl(),

      username:["",[Validators.required,Validators.email]],
      pwd:["",[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
        Validators.pattern('^[a-zA-Z0-9]+$')
        ]]
     
    });
  }
  
  loginUser(){
    // console.log(this.loginForm.value);
    // console.log(this.loginForm);
    
    var isChecked:boolean;
    if(!this.loginForm.valid){
      for(var a in this.loginForm.controls){
        this.loginForm.controls[a].markAsDirty();
        this.loginForm.controls[a].updateValueAndValidity();
        isChecked=false;
      }
    }
    
    if(this.loginForm.valid){
      alert('Logged in successfull!');
      console.log(this.loginForm.value);
      localStorage.setItem('token',"https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE1MTYyMzkwMjJ9.DOUBRPQUnUqYdHXIlMQHo_T7vFAHiW5t4jbl5l0Oz_w");
      
      if(this.loginForm.value.username=="admin@gmail.com"){
        localStorage.setItem('userType','admin');
      }
      else{
        var user=this.loginForm.value.username;
        localStorage.setItem('userType',user);
      }
      this.loginForm.reset();
      this.router.navigate(['home']);

    }
   
    else{
      alert('Not a registered user.');
    }


  }

}
