import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationListComponent } from './destination-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { FetchService } from 'src/app/core/services/fetch.service';
import { Destination } from 'src/app/models/destination';
import { of } from 'rxjs';
import { user } from 'src/app/models/user';
import { TurncateDescriptionPipe } from 'src/app/shared/pipes/turncate-description.pipe';
import { CurrencyFormatPipe } from 'src/app/shared/pipes/currency-format.pipe';
import { HighlightFavoriteDirective } from 'src/app/shared/directives/highlight-favorite.directive';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/core/services/auth.service';

describe('DestinationListComponent', () => {
  let component: DestinationListComponent;
  let fixture: ComponentFixture<DestinationListComponent>;
  let fetchService : FetchService;
  let authService : AuthService;

  const mockDestinations: Destination[] = [
    { name: 'Paris', type: 'City',description: "test description", budget: 1500,rating: 4,isFavorite: true},
    { name: 'New York', type: 'City',description: "test description", budget: 2500,rating: 4,isFavorite: true},
    { name: 'Bali', type: 'Island',description: "test description", budget: 1000,rating: 4,isFavorite: true},
  ];

  const mockUser: user = 
    {
      id: '1',
      userEmail: 'John@gmail.com',
      pass : '123',
      activities: [
        { destination: 'Paris', description: 'Visit Eiffel Tower', date: new Date }
      ]
    };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinationListComponent,TurncateDescriptionPipe,CurrencyFormatPipe,HighlightFavoriteDirective],
      imports:[
        HttpClientTestingModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatIconModule,
      ],
      providers:[
        {
          provide: FetchService,
          useValue:{
            getAllDestinations : jasmine.createSpy().and.returnValue(of(mockDestinations)),
            getUserDestinations : jasmine.createSpy().and.returnValue(of(mockUser))
          }
        },
        {
          provide: AuthService,
          useValue:{
            getLoggedInUserId : jasmine.createSpy().and.returnValue('123'),
          }
        }
      ]
    });
    fixture = TestBed.createComponent(DestinationListComponent);
    component = fixture.componentInstance;
    fetchService = TestBed.inject(FetchService);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all destinations and recommendations in oninit',()=>{
    spyOn(component,'fetchRecommendations');
    component.ngOnInit();
    expect(component.destinations).toEqual(mockDestinations);
    expect(authService.getLoggedInUserId).toHaveBeenCalled();
    expect(component.fetchRecommendations).toHaveBeenCalled();
  });


});
