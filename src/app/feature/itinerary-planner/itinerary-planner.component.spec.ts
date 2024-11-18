import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ItineraryPlannerComponent } from './itinerary-planner.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatNativeDateModule } from '@angular/material/core';
import { of } from 'rxjs';
import { Activity } from 'src/app/models/activity';

describe('ItineraryPlannerComponent', () => {
  let component: ItineraryPlannerComponent;
  let fixture: ComponentFixture<ItineraryPlannerComponent>;
  let authService: AuthService;

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
        {
          provide:AuthService,
          useValue:{
            getLoggedInUser: jasmine.createSpy().and.returnValue('123'),
            getUserData: jasmine.createSpy().and.returnValue(of({ activities: [] })),
          }  
        }
        
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ItineraryPlannerComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load the logged-in user ID and user activities',()=>{
    spyOn(component, 'loadUserActivities');
    component.ngOnInit();
    expect(authService.getLoggedInUser).toHaveBeenCalled();
    expect(component.loadUserActivities).toHaveBeenCalled();
  });

  it('should check offline status', () => {
    spyOn(component, 'checkOffline');
    component.ngOnInit();
    expect(component.checkOffline).toHaveBeenCalled();
  });

  it('should synchronize offline and online data', fakeAsync(() => {
    component.isOffline = false;
    const offlineActivities = [
      { destination: 'Paris', description: 'Eiffel Tower Visit', date: new Date('2024-11-18') },
    ];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(offlineActivities));
    component.syncData();
    tick();

    expect(component.activities[0].destination).toEqual(offlineActivities[0].destination);
    expect(component.activities[0].description).toEqual(offlineActivities[0].description);
  }));

  it('should add a valid activity', fakeAsync(() => {
    // Set form values
    component.itineraryForm.setValue({
      startDate: new Date('2024-11-01'),
      endDate: new Date('2024-11-30'),
      destination: 'Paris',
      description: 'Eiffel Tower Visit',
      date: new Date('2024-11-18'),  // activity date is within the range
    });

    const activity: Activity = {
      destination: 'Paris',
      description: 'Eiffel Tower Visit',
      date: new Date('2024-11-18'),
    };

    component.addActivity();
    tick();

    expect(component.activities.length).toBe(1);
    expect(component.activities[0].destination).toEqual(activity.destination);
    expect(component.activities[0].description).toEqual(activity.description);
  }));

});
