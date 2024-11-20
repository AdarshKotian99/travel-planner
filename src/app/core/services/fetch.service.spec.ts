import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { FetchService } from './fetch.service';
import { Destination } from 'src/app/models/destination';
import { user } from 'src/app/models/user';
import { Feedback } from 'src/app/models/feedback';

describe('FetchService', () => {
  let service: FetchService;
  let httpMock: HttpTestingController;

  const mockDestinations: Destination[] = [
    { name: 'Paris', type: 'City',description: "test description", budget: 1500,rating: 4,isFavorite: true},
    { name: 'New York', type: 'City',description: "test description", budget: 2500,rating: 4,isFavorite: true},
    { name: 'Bali', type: 'Island',description: "test description", budget: 1000,rating: 4,isFavorite: true},
  ];

  const mockUsers: user[] = [
    {
      id: '1',
      userEmail: 'John@gmail.com',
      pass : '123',
      activities: [
        { destination: 'Paris', description: 'Visit Eiffel Tower', date: new Date }
      ]
    }
  ];

  const mockFeedbacks: Feedback[] = [
    {
      destinationName : "Tokyo",
      review: "comment 1",
      rating: 3,
      userId : "123"
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(FetchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all destinations', () => {
    service.getAllDestinations().subscribe(destinations => {
      expect(destinations).toEqual(mockDestinations);
    });

    const req = httpMock.expectOne('assets/mock-destinations.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockDestinations);
  });

  it('should handle error when fetching destinations', () => {
    service.getAllDestinations().subscribe({
      next: () => {},
      error: (error) => {
        expect(error.message).toBe('Error occured while fetching destination. Try reloading the page.');
      }
    });

    const req = httpMock.expectOne('assets/mock-destinations.json');
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });

  it('should fetch all users data', () => {
    service.getAllUsersData().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('http://localhost:3000/signupUsersList');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should fetch all feedbacks', () => {
    service.getAllFeedbacks().subscribe(feedbacks => {
      expect(feedbacks).toEqual(mockFeedbacks);
    });

    const req = httpMock.expectOne('http://localhost:3000/feedbacks');
    expect(req.request.method).toBe('GET');
    req.flush(mockFeedbacks);
  });
});
