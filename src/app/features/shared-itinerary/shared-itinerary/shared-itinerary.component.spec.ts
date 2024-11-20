import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedItineraryComponent } from './shared-itinerary.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';

describe('SharedItineraryComponent', () => {
  let component: SharedItineraryComponent;
  let fixture: ComponentFixture<SharedItineraryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedItineraryComponent],
      imports:[
        RouterTestingModule,
        HttpClientTestingModule,
        MatTableModule
      ]
    });
    fixture = TestBed.createComponent(SharedItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
