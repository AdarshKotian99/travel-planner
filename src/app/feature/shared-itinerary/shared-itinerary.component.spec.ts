import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedItineraryComponent } from './shared-itinerary.component';

describe('SharedItineraryComponent', () => {
  let component: SharedItineraryComponent;
  let fixture: ComponentFixture<SharedItineraryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedItineraryComponent]
    });
    fixture = TestBed.createComponent(SharedItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
