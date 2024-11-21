import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { FetchService } from 'src/app/core/services/fetch.service';
import { Destination } from 'src/app/models/destination';
import { Feedback } from 'src/app/models/feedback';

@Component({
  selector: 'app-destination-details',
  templateUrl: './destination-details.component.html',
  styleUrls: ['./destination-details.component.css'],
  standalone:false
})
export class DestinationDetailsComponent implements OnInit{
  
  //destination !: Destination;
  public destination : Destination = {
    name : 'Unknown',
    description : 'Unknown',
    type : 'Unknown',
    budget: 0,
    rating : 0,
    isFavorite: false,
  };
  private destinationName : string = '';
  public feedbacks : Feedback[] = [];
  public rating : number = 0;;
  public review : string = '';
  public fetchFeedBackError : string = '';
  public submitReviewError : string = '';
  public fetchDestinationError : string = '';
  
  constructor(
    private route : ActivatedRoute,
    private authService : AuthService,
    private fetchService : FetchService
  ){}
  
  ngOnInit(): void {
    //fetching destination details from route parameter name
    this.destinationName = this.route.snapshot.paramMap.get('name') || 'Unknown';
    this.fetchService.getAllDestinations().subscribe({
      next : (data) =>{
        data.map(destination => {
          if(destination.name === this.destinationName){
            this.destination = destination;
          }
        })
        this.fetchFeedbacks();  //fetch feedbacks
      },
      error : (err) => {
        this.fetchDestinationError = err.message;
      }
    })
  }
  
  
  private fetchFeedbacks(){ //fetch feedback of specific destination
    this.fetchService.getAllFeedbacks().subscribe({
      next : (feedbackdata) => {
        feedbackdata.map(feedback => {
          if(feedback.destinationName === this.destinationName){
            this.feedbacks.push(feedback);
          }
        })
      },
      error : (err) => {
        this.fetchFeedBackError = err.message;
      }
    })
  }
  
  public stars(rating : number) {
    return Array(Math.floor(rating));
  }
  
  public submitReview(){ //updates feedback data in db
    const userId : string = this.authService.getLoggedInUserId()
    const userFeedback : Feedback = {
      destinationName : this.destinationName,
      review : this.review,
      rating : this.rating,
      userId : userId
    }
    
    this.fetchService.addFeedback(userFeedback).subscribe({
      next : (data) => {
        console.log('data:-',data)
        this.feedbacks.unshift(userFeedback); // Adds new feedback at the top

      },
      error : (err) => {
        console.log('error:-',err)
        this.submitReviewError = err.message;
      }
    })
  }
}
