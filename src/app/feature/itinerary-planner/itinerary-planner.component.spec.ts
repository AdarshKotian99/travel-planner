import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItineraryPlannerComponent } from './itinerary-planner.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { of } from 'rxjs';
import { MatNativeDateModule } from '@angular/material/core';

describe('ItineraryPlannerComponent', () => {
  let component: ItineraryPlannerComponent;
  let fixture: ComponentFixture<ItineraryPlannerComponent>;
  let httpMock: HttpTestingController;
  let authService: AuthService;
  let mockUser = { id: 1, activities: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItineraryPlannerComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatIconModule,
        BrowserAnimationsModule,
        DragDropModule,
        MatNativeDateModule,
      ],
      providers: [
        FormBuilder,
        AuthService
      ]
    })
    .compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);

    // Mock the AuthService to return a logged-in user
    spyOn(authService, 'getLoggedInUser').and.returnValue(mockUser);

    fixture = TestBed.createComponent(ItineraryPlannerComponent);
    component = fixture.componentInstance;

    // Trigger initial detectChanges and handle the initial GET request if ngOnInit fires it
    fixture.detectChanges();
    const initialReq = httpMock.expectOne(`http://localhost:3000/signupUsersList/${mockUser.id}`);
    initialReq.flush({ activities: [] });
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.itineraryForm).toBeDefined();
    expect(component.itineraryForm.controls['startDate']).toBeTruthy();
    expect(component.itineraryForm.controls['endDate']).toBeTruthy();
    expect(component.itineraryForm.controls['destination']).toBeTruthy();
    expect(component.itineraryForm.controls['description']).toBeTruthy();
    expect(component.itineraryForm.controls['date']).toBeTruthy();
  });

  it('should load user activities on init', () => {
    const mockActivities = [
      { destination: 'Paris', description: 'Eiffel Tower Visit', date: new Date() }
    ];

    // Call ngOnInit explicitly if needed
    component.ngOnInit();

    // Mock the HTTP response for the GET request
    const req = httpMock.expectOne(`http://localhost:3000/signupUsersList/${mockUser.id}`);
    expect(req.request.method).toBe('GET');
    req.flush({ activities: mockActivities });  // Mock response with activities

    expect(component.activities.length).toBe(1); // Check if the activities are loaded
    expect(component.activities[0].destination).toBe('Paris');
  });

  it('should add an activity and make an HTTP PUT request', () => {
    component.itineraryForm.setValue({
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      destination: 'London',
      description: 'Visit Big Ben',
      date: new Date('2024-06-01')
    });

    // Add activity to the activities array
    component.addActivity();

    const req = httpMock.expectOne(`http://localhost:3000/signupUsersList/${mockUser.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body.activities.length).toBe(1); // Should include the new activity
    req.flush({});

    expect(component.itineraryForm.value.destination).toBe('');
    expect(component.activities.length).toBe(1);
  });

  it('should show alert when activity date is outside the travel dates', () => {
    component.itineraryForm.setValue({
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      destination: 'Paris',
      description: 'Eiffel Tower Visit',
      date: new Date('2025-01-01') // Date outside travel dates
    });

    spyOn(window, 'alert'); // Mock alert function
    component.addActivity();

    expect(window.alert).toHaveBeenCalledWith('Activity date must be within the travel dates.');
  });

  it('should delete an activity and update the user data', () => {
    component.activities = [
      { destination: 'Paris', description: 'Eiffel Tower Visit', date: new Date() }
    ];

    component.deleteActivity(0);

    const req = httpMock.expectOne(`http://localhost:3000/signupUsersList/${mockUser.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body.activities.length).toBe(0); // Activity list should be empty
    req.flush({});

    expect(component.activities.length).toBe(0);
  });
});
