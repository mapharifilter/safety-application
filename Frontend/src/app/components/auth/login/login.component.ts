import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //=================================properties================================
  LoginForm!:UntypedFormGroup;

  user_id :any;
  user:any
  usertype:any
  department:any
  name:any
  surname:any

  //==================================methods==================================

  get_login()
  {
     const user = 
     {
       email:this.LoginForm.value.email,
       password:this.LoginForm.value.password
     }

     console.log("From Login Form ",user)

    
     if(this.LoginForm.invalid)
     {
      return
     }else{
       

        this.auth.set_login(user).subscribe((login_data:any)=>{

          console.log("From backend",login_data)
            this.name = login_data.user[0].name;
            this.surname = login_data.user[0].surname;
             this.user_id = login_data.user[0].user_id;
             this.usertype = login_data.user[0].usertype;
             this.department = login_data.user[0].department;

             localStorage.setItem('name',this.name);
             localStorage.setItem('surname',this.surname);
             localStorage.setItem('user_id',this.user_id);
             localStorage.setItem('usertype',this.usertype);
             localStorage.setItem('department',this.department);

 
               //route to the dashboard after loggin in

            // if (this.usertype === "Admin"){
            //  this.path.navigate(['/admin'])
            // }
            // else{
            //   this.path.navigate(['/admin'])
            // }
            this.path.navigate(['/welcome'])

            },
             (err) => {
               alert("User does not exist, Register First")
              return err.error.errorMessage;
            
            }
          );
     }
  }

  get validate() {
    return this.LoginForm.controls;
  }

  //=================================defaults====================================
  constructor(private auth:AuthService,private path:Router) { }
  ngOnInit(): void {

    this.LoginForm = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('',[Validators.required])
    })
  }
}
