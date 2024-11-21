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
import { of } from 'rxjs';
import { FetchService } from 'src/app/core/services/fetch.service';
import { user } from 'src/app/models/user';

describe('ItineraryPlannerComponent', () => {
  let component: ItineraryPlannerComponent;
  let fixture: ComponentFixture<ItineraryPlannerComponent>;
  let authService: AuthService;
  // let mockFetchService: jasmine.SpyObj<FetchService>;

  beforeEach(() => {
    // mockFetchService = jasmine.createSpyObj('FetchService', ['updateUserData']);

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
        BrowserAnimationsModule
      ],
      providers:[
        {
          provide:AuthService,
          useValue:{
            getLoggedInUserId: jasmine.createSpy().and.returnValue('123'),
            getUserData: jasmine.createSpy().and.returnValue(of({ activities: [] })),
          }  
        },
        // { provide: FetchService, useValue: mockFetchService },
      ]
    });
    fixture = TestBed.createComponent(ItineraryPlannerComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the logged-in user ID and user activities',()=>{
    spyOn(component, 'loadUserActivities');
    component.ngOnInit();
    expect(authService.getLoggedInUserId).toHaveBeenCalled();
    expect(component.loadUserActivities).toHaveBeenCalled();
  });

  it('should check offline status', () => {
    spyOn(component, 'checkOffline');
    component.ngOnInit();
    expect(component.checkOffline).toHaveBeenCalled();
  });

  it('should synchronize offline and online data', fakeAsync(() => {
    // const mockUser: user = {
    //   id: '123',
    //   userEmail: 'test@example.com',
    //   pass: 'password',
    //   activities: [
    //     {
    //     destination: 'Paris',
    //     description: 'Eiffel Tower Visit',
    //     date: new Date,
    //     }
    //   ]  // Initialize with an empty activities array
    // };
    // mockFetchService.updateUserData.and.returnValue(of(mockUser))
    component.isOffline = false;
    const offlineActivities = [
      { destination: 'Paris', description: 'Eiffel Tower Visit', date: new Date },
    ];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(offlineActivities));
    component.syncData();
    tick(1);

    //expect(component.activities).toEqual(offlineActivities);
     expect(component.activities[0].destination).toEqual(offlineActivities[0].destination);
     expect(component.activities[0].description).toEqual(offlineActivities[0].description);
  }));

  it('should add a valid activity', fakeAsync(() => {
    // const mockUser: user = {
    //   id: '123',
    //   userEmail: 'test@example.com',
    //   pass: 'password',
    //   activities: [
    //     {
    //       destination: 'Paris',
    //     description: 'Eiffel Tower Visit',
    //     date: new Date,
    //     }
    //   ]  // Initialize with an empty activities array
    // };
    // mockFetchService.updateUserData.and.returnValue(of(mockUser))
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

    expect(component.activities.length).toBe(1);
    expect(component.activities[0].destination).toEqual(activity.destination);
    expect(component.activities[0].description).toEqual(activity.description);
  }));

  
});
