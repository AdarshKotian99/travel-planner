import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DestinationListComponent } from './destination-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { FetchService } from 'src/app/core/services/fetch.service';
import { Destination } from 'src/app/models/destination';
import { of, throwError } from 'rxjs';
import { user } from 'src/app/models/user';
import { TurncateDescriptionPipe } from 'src/app/shared/pipes/turncate-description.pipe';
import { CurrencyFormatPipe } from 'src/app/shared/pipes/currency-format.pipe';
import { HighlightFavoriteDirective } from 'src/app/shared/directives/highlight-favorite.directive';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

describe('DestinationListComponent', () => {
  let component: DestinationListComponent;
  let fixture: ComponentFixture<DestinationListComponent>;
  let fetchService: jasmine.SpyObj<FetchService>;
  let authService: AuthService;
  let router: Router;

  const mockDestinations: Destination[] = [
    { name: 'Paris', type: 'City', description: "test description", budget: 1500, rating: 4, isFavorite: true },
    { name: 'New York', type: 'City', description: "test description", budget: 2500, rating: 4, isFavorite: true },
    { name: 'Bali', type: 'Island', description: "test description", budget: 1000, rating: 4, isFavorite: true }
  ];

  const mockUserDestination: string[] = ['Paris'];

  beforeEach(() => {
    // Create a spy object for FetchService with methods to mock
    fetchService = jasmine.createSpyObj('FetchService', ['getAllDestinations', 'getUserDestinations', 'recommendDestinations']);

    // Set up spies for service methods to return observables
    fetchService.getAllDestinations.and.returnValue(of(mockDestinations));  // Mock observable for getAllDestinations
    fetchService.getUserDestinations.and.returnValue(of(mockUserDestination));  // Mock observable for getUserDestinations
    fetchService.recommendDestinations.and.returnValue(mockDestinations); // Mock observable for recommendDestinations

    TestBed.configureTestingModule({
      declarations: [DestinationListComponent, TurncateDescriptionPipe, CurrencyFormatPipe, HighlightFavoriteDirective],
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatIconModule
      ],
      providers: [
        {
          provide: FetchService,
          useValue: fetchService
        },
        {
          provide: AuthService,
          useValue: {
            getLoggedInUserId: jasmine.createSpy().and.returnValue('123')
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy()
          }
        }
      ]
    });

    fixture = TestBed.createComponent(DestinationListComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  // Positive Test Cases
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all destinations and recommendations in ngOnInit', fakeAsync(() => {
    // Log the mock values to ensure they are passed correctly
    console.log('Mock Destinations:', mockDestinations);
    console.log('Mock User Destinations:', mockUserDestination);

    // Ensure ngOnInit triggers and mock data is returned
    component.ngOnInit();

    tick();  // Simulate async passage of time

    // Check if destinations and recommendations are set correctly
    expect(component.destinations).toEqual(mockDestinations);
    expect(component.recommendedDestinations).toEqual(mockDestinations);
    expect(fetchService.getAllDestinations).toHaveBeenCalled();
    expect(fetchService.getUserDestinations).toHaveBeenCalled();
  }));

  it('should handle errors while fetching destinations in ngOnInit', fakeAsync(() => {
    // Simulate an error when fetching destinations
    fetchService.getAllDestinations.and.returnValue(throwError(() => new Error('Error fetching destinations')));

    component.ngOnInit();

    tick();  // Simulate async passage of time

    // Verify error handling for destinations fetch
    expect(component.fetchDestinationError).toBe('Error fetching destinations');
  }));

  it('should handle errors while fetching recommendations', fakeAsync(() => {
    // Simulate an error when fetching user destinations
    fetchService.getUserDestinations.and.returnValue(throwError(() => new Error('Error fetching recommendations')));

    component.ngOnInit();

    tick();  // Simulate async passage of time

    // Verify error handling for recommendation fetch
    expect(component.fetchRecommendationError).toBe('Error occured while fetching recommendations. Try reloading the page.');
  }));
});




// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { DestinationListComponent } from './destination-list.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { ReactiveFormsModule } from '@angular/forms';
// import { MatInputModule } from '@angular/material/input';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatSelectModule } from '@angular/material/select';
// import { FetchService } from 'src/app/core/services/fetch.service';
// import { Destination } from 'src/app/models/destination';
// import { of } from 'rxjs';
// import { user } from 'src/app/models/user';
// import { TurncateDescriptionPipe } from 'src/app/shared/pipes/turncate-description.pipe';
// import { CurrencyFormatPipe } from 'src/app/shared/pipes/currency-format.pipe';
// import { HighlightFavoriteDirective } from 'src/app/shared/directives/highlight-favorite.directive';
// import { MatIconModule } from '@angular/material/icon';
// import { AuthService } from 'src/app/core/services/auth.service';

// describe('DestinationListComponent', () => {
//   let component: DestinationListComponent;
//   let fixture: ComponentFixture<DestinationListComponent>;
//   let fetchService : FetchService;
//   let authService : AuthService;

//   const mockDestinations: Destination[] = [
//     { name: 'Paris', type: 'City',description: "test description", budget: 1500,rating: 4,isFavorite: true},
//     { name: 'New York', type: 'City',description: "test description", budget: 2500,rating: 4,isFavorite: true},
//     { name: 'Bali', type: 'Island',description: "test description", budget: 1000,rating: 4,isFavorite: true},
//   ];

//   const mockUser: user = 
//     {
//       id: '1',
//       userEmail: 'John@gmail.com',
//       pass : '123',
//       activities: [
//         { destination: 'Paris', description: 'Visit Eiffel Tower', date: new Date }
//       ]
//     };

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [DestinationListComponent,TurncateDescriptionPipe,CurrencyFormatPipe,HighlightFavoriteDirective],
//       imports:[
//         HttpClientTestingModule,
//         MatFormFieldModule,
//         ReactiveFormsModule,
//         MatInputModule,
//         MatSelectModule,
//         BrowserAnimationsModule,
//         MatIconModule,
//       ],
//       providers:[
//         {
//           provide: FetchService,
//           useValue:{
//             getAllDestinations : jasmine.createSpy().and.returnValue(of(mockDestinations)),
//             getUserDestinations : jasmine.createSpy().and.returnValue(of(mockUser))
//           }
//         },
//         {
//           provide: AuthService,
//           useValue:{
//             getLoggedInUserId : jasmine.createSpy().and.returnValue('123'),
//           }
//         }
//       ]
//     });
//     fixture = TestBed.createComponent(DestinationListComponent);
//     component = fixture.componentInstance;
//     fetchService = TestBed.inject(FetchService);
//     authService = TestBed.inject(AuthService);
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should fetch all destinations and recommendations in oninit',()=>{
//     spyOn(component,'fetchRecommendations');
//     component.ngOnInit();
//     expect(component.destinations).toEqual(mockDestinations);
//     expect(authService.getLoggedInUserId).toHaveBeenCalled();
//     expect(component.fetchRecommendations).toHaveBeenCalled();
//   });


// });
