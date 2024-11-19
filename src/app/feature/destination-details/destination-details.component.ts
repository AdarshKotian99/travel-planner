import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Destination } from 'src/app/models/destination';
import { Feedback } from 'src/app/models/feedback';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-destination-details',
  templateUrl: './destination-details.component.html',
  styleUrls: ['./destination-details.component.css'],
  standalone: false
})
export class DestinationDetailsComponent implements OnInit{
   
  //destination !: Destination;
  destination : Destination = {
    name : 'Unknown',
    description : 'Unknown',
    type : 'Unknown',
    budget: 0,
    rating : 0,
    isFavorite: false,
    reviews : [],
  };
  destinationName : string|any = '';
  feedbacks : Feedback[] = [];
  rating : number = 0;;
  review : string = '';
  fetchFeedBackError : boolean = false;
  submitReviewError : boolean = false;
  fetchDestinationError : boolean = false;
  
  constructor(
    private http : HttpClient,
    private route : ActivatedRoute,
    private authService : AuthService
  ){}
  
  ngOnInit(): void {
    //fetching destination details from route parameter name
    this.destinationName = this.route.snapshot.paramMap.get('name');
    this.http.get<Destination[]>('assets/mock-destinations.json').subscribe({
      next : (data) => {
        data.map(destination => {
          if(destination.name === this.destinationName){
            this.destination = destination;
          }
        })
        this.fetchFeedbacks();  //fetch feedbacks
      },
      error : (err) => {
        this.fetchDestinationError = true;
      }
    })
    }


fetchFeedbacks(){ //fetch feedback of specific destination
  this.http.get<user[]>('http://localhost:3000/signupUsersList').subscribe({
    next : (data) => {
      data.map(userData => {
        const feedbackList = userData.feedbacks;
        feedbackList.map(feedback => {
          if(feedback.destinationName === this.destinationName){
            this.feedbacks.push(feedback);
          }
        })
      })
    },
    error : (err) => {
      console.log('error occured while fetching feedbacks,error:-',err);
      this.fetchFeedBackError = true;
    }
  }
)
}

stars(rating : number) {
  return Array(Math.floor(rating));
}

submitReview(){ //updates feedback data in db
  this.authService.getUserData().subscribe({
    next : (userData) => {
      let feedbacks : Feedback[] = [{
        destinationName : this.destinationName,
        review : this.review,
        rating : this.rating 
      }]
      
      const updatedFeedbacks = [];
      updatedFeedbacks.push(...userData.feedbacks);
      updatedFeedbacks.push(...feedbacks);
      const updatedUserData = {
        ...userData,
        feedbacks : updatedFeedbacks,
      };

      this.http.put(`http://localhost:3000/signupUsersList/${userData.id}`,updatedUserData).subscribe({
        next : ()=> {
          this.feedbacks.push(...feedbacks)  
        },
        error : ()=>{
          this.submitReviewError = true;    
        }

      })
    },
    error : () => {
      this.submitReviewError = true;
    }
  }
)
//   this.authService.getUserData().subscribe(
//     userData => {
//       let feedbacks : Feedback[] = [{
//         destinationName : this.destinationName,
//         review : this.review,
//         rating : this.rating 
//       }]
      
//       const updatedFeedbacks = [];
//       updatedFeedbacks.push(...userData.feedbacks);
//       updatedFeedbacks.push(...feedbacks);
//       const updatedUserData = {
//         ...userData,
//         feedbacks : updatedFeedbacks,
//       };
//       this.http.put(`http://localhost:3000/signupUsersList/${userData.id}`,updatedUserData).subscribe({
//         next : ()=> {
//           this.feedbacks.push(...feedbacks)  
//         }
//       }
//       // this.http.put(`http://localhost:3000/signupUsersList/${userData.id}`,updatedUserData).subscribe(()=>{
//       //   this.feedbacks.push(...feedbacks)
//       // }
//     );
//   }
// )
}
}
