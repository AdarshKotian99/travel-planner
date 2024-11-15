import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { SharedItineraryComponent } from './shared-itinerary.component';

describe('SharedItineraryComponent', () => {
  let component: SharedItineraryComponent;
  let fixture: ComponentFixture<SharedItineraryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedItineraryComponent],
      imports:[RouterTestingModule,HttpClientTestingModule],
      providers:[]
    });
    fixture = TestBed.createComponent(SharedItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [SharedItineraryComponent],
  //     imports: [
  //       RouterTestingModule,
  //       HttpClientTestingModule
  //     ],
  //     providers: [
  //     ]
  //   })
  //   .compileComponents();
  //   fixture = TestBed.createComponent(SharedItineraryComponent);
  //   component = fixture.componentInstance;
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
