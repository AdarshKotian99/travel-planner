import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ItineraryPlannerComponent } from './itinerary-planner.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { Activity } from 'src/app/models/activity';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FetchService } from 'src/app/core/services/fetch.service';
import { user } from 'src/app/models/user';
import { from, of, throwError } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('ItineraryPlannerComponent', () => {
  let component: ItineraryPlannerComponent;
  let fixture: ComponentFixture<ItineraryPlannerComponent>;
  let authService: AuthService;
   let mockFetchService: jasmine.SpyObj<FetchService>;
  //  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authService = TestBed.inject(AuthService);
     mockFetchService = jasmine.createSpyObj('FetchService', ['updateUserData']);
    //  mockAuthService = jasmine.createSpyObj('AuthService', ['getLoggedInUserId','getUserData']);

     const mockUser: user = {
      id: '123',
      userEmail: 'test@example.com',
      pass: 'password',
      activities: [
        {
          destination: 'Paris',
          description: 'Eiffel Tower Visit',
          date: new Date,
          }
      ] 
    };

     TestBed.configureTestingModule({
      declarations: [ItineraryPlannerComponent],
      imports:[
        HttpClientTestingModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatSnackBarModule
      ],
      providers:[
        {
          provide:AuthService,
          useValue:{
            getLoggedInUserId: () => ('123'),
            // getLoggedInUserId: jasmine.createSpy().and.returnValue('123'),
            getUserData: () => (of(mockUser)),
            // getUserData: jasmine.createSpy().and.returnValue(of({ activities: [] })),
          }  
        },
        //  {provide : AuthService , useValue :mockAuthService},
        {provide: FetchService, useValue: mockFetchService },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItineraryPlannerComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    // const mockUser : user = {
    //   id: '123',
    //   userEmail: 'test@example.com',
    //   pass: 'password',
    //   activities: [
    //     {
    //       destination: 'Paris',
    //       description: 'Eiffel Tower Visit',
    //       date: new Date,
    //       }
    //   ] 
    // };
    // expect(component.userData).toEqual(mockUser);
    //spyOn(mockAuthService,'getUserData').and.returnValue(of(mockUser))
    expect(component).toBeTruthy();
  });

  it('should load the logged-in user ID and user activities',fakeAsync(()=>{
   // mockAuthService.getLoggedInUserId.and.returnValue('123');
   const mockUser: user = {
    id: '123',
    userEmail: 'test@example.com',
    pass: 'password',
    activities: [
      {
        destination: 'Paris',
        description: 'Eiffel Tower Visit',
        date: new Date,
        }
    ] 
  };
   spyOn(authService,'getLoggedInUserId'); 
   spyOn(component, 'loadUserActivities');
   spyOn(authService,'getUserData');
    component.ngOnInit();
    tick(1);
    expect(authService.getLoggedInUserId).toHaveBeenCalled();
    expect(component.loadUserActivities).toHaveBeenCalled();
    expect(authService.getUserData).toHaveBeenCalled();
    //expect(component.activities).toEqual(mockUser.activities);


  }));

  // it('should handle error during loading UserActivities',fakeAsync(()=>{
  //   spyOn(component, 'loadUserActivities');
  //    spyOn(authService,'getUserData');

  //   //spyOn(authService,'getUserData').and.returnValue(throwError(() => new Error("error")));
  //   component.ngOnInit();
  //   tick(1);
  //   expect(component.loadUserActivities).toHaveBeenCalled();
  //   expect(authService.getUserData).toHaveBeenCalled();
  //   console.log('component.userData:-',component.userData);
  //   expect(component.loadUserActiviesError).toBe('Error occured while loading activities.');
  // }));

  it('should check offline status', () => {
    spyOn(component, 'checkOffline');
    spyOn(component, 'loadUserActivities');
    component.ngOnInit();
    expect(component.checkOffline).toHaveBeenCalled();
    expect(component.isOffline).toBe(false);
    expect(component.loadUserActivities).toHaveBeenCalled();

  });

  it('should synchronize offline and online data', fakeAsync(() => {
    
    const mockUser: user = {
      id: '123',
      userEmail: 'test@example.com',
      pass: 'password',
      activities: [
        {
        destination: 'Paris',
        description: 'Eiffel Tower Visit',
        date: new Date,
        }
      ] 
    };
    mockFetchService.updateUserData.and.returnValue(of(mockUser))

    component.isOffline = false;
    const offlineActivities = [
      { destination: 'Paris', description: 'Eiffel Tower Visit', date: new Date },
    ];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(offlineActivities));
    // spyOn(authService,'getUserData').and.returnValue(of(mockUser))
    component.syncData();
    tick(1);

    //expect(component.activities).toEqual(offlineActivities);
     expect(component.activities[0].destination).toEqual(offlineActivities[0].destination);
     expect(component.activities[0].description).toEqual(offlineActivities[0].description);
  }));

  it('should add a valid activity', fakeAsync(() => {
    const mockUser: user = {
      id: '123',
      userEmail: 'test@example.com',
      pass: 'password',
      activities: [
        {
          destination: 'Paris',
        description: 'Eiffel Tower Visit',
        date: new Date,
        }
      ] 
    };
    mockFetchService.updateUserData.and.returnValue(of(mockUser))
    // Set form values
    component.itineraryForm.setValue({
      startDate: new Date('2024-11-01'),
      endDate: new Date('2024-11-30'),
      destination: 'Paris',
      description: 'Eiffel Tower Visit',
      date: new Date,  // activity date is within the range
    });

    const activity: Activity = {
      destination: 'Paris',
      description: 'Eiffel Tower Visit',
      date: new Date,
    };

    component.addActivity();
    tick(1);

    //expect(component.activities.length).toBe(1);
    expect(component.activities[0].destination).toEqual(activity.destination);
    expect(component.activities[0].description).toEqual(activity.description);
  }));

  
});
