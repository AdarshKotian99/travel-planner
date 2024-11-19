import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone:false
})
export class SignupComponent{

  constructor(private auth : AuthService, private router : Router){}

  userEmail : string = '';
  pass : string = '';
  errorMessage: string = '';

  handleSubmit(formData : any){
      this.auth.signUp(formData.value).subscribe({
        next : () => {
          this.router.navigate(['/destinations']);  //navigate to destinations page
        },
        error : (err) => {
          this.errorMessage = err;
        }
      })  
  }
  // handleSubmit(formData : any){
  //   //this.auth.signUp(formData.value)
  //   try {
  //     this.auth.signUp(formData.value).add(()=>this.router.navigate(['/destinations']))  
  //   } catch (error) {
  //     console.log('error occurred when signup',error);
  //   }
  // }

  redirectToLogin(){
    this.router.navigate(['/login']);
  }

}
