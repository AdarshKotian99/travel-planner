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
  styleUrls: ['./destination-details.component.css']
})
export class DestinationDetailsComponent implements OnInit{
  
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
  
  constructor(
    private http : HttpClient,
    private route : ActivatedRoute,
    private authService : AuthService
  ){}
  
  ngOnInit(): void {
    this.destinationName = this.route.snapshot.paramMap.get('name');
    console.log('this.destinationName:-',this.destinationName);
    this.http.get<Destination[]>('assets/mock-destinations.json').subscribe(
      data => {
        data.map(destination => {
          if(destination.name === this.destinationName){
            this.destination = destination;
          }
        }
      )
      console.log('this.destination',this.destination);
      this.fetchFeedbacks();
    }
    
  )
}

fetchFeedbacks(){
  this.http.get<user[]>('http://localhost:3000/signupUsersList').subscribe(
    data => {
      data.map(userData => {
        const feedbackList = userData.feedbacks;
        feedbackList.map(feedback => {
          if(feedback.destinationName === this.destinationName){
            this.feedbacks.push(feedback);
          }
        })
      })
    }
  )
}

stars(rating : number) {
  return Array(Math.floor(rating));
}

submitReview(){
  console.log('submitReview() called')
  try{
    //   let loggedInUser = this.authService.getLoggedInUser(); // Get logged-in user info
    // let feedbacks : Feedback[] = [{
    //   destinationName : this.destinationName,
    //   rating : this.rating,
    //   review : this.review 
    // }]
    // const updatedUserData = {
    //   ...loggedInUser,
    //   feedbacks : [...feedbacks],
    // };
    // console.log('feedback:-',feedbacks);
    // console.log('loggedInUser:-',loggedInUser);
    // console.log('updatedUserData:-',updatedUserData);
    this.authService.getUserData().subscribe(
      userData => {
        console.log('userData:-',userData)
        let feedbacks : Feedback[] = [{
          destinationName : this.destinationName,
          review : this.review,
          rating : this.rating 
        }]

        const updatedFeedbacks = [];
        updatedFeedbacks.push(...userData.feedbacks);
        updatedFeedbacks.push(...feedbacks);
        console.log('updatedFeedbacks:-',updatedFeedbacks);
        const updatedUserData = {
          ...userData,
          feedbacks : updatedFeedbacks,
        };
        console.log(`http://localhost:3000/signupUsersList/${userData.id}`);
        console.log('updatedUserData:-',updatedUserData);
        this.http.put(`http://localhost:3000/signupUsersList/${userData.id}`,updatedUserData).subscribe(
          next => this.feedbacks.push(...feedbacks)
        );
      }
      
    )
    
    
  }catch(e){
    console.log(e)
  }
  
  
}
}
