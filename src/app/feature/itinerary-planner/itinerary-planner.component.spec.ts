import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryPlannerComponent } from './itinerary-planner.component';

describe('ItineraryPlannerComponent', () => {
  let component: ItineraryPlannerComponent;
  let fixture: ComponentFixture<ItineraryPlannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItineraryPlannerComponent]
    });
    fixture = TestBed.createComponent(ItineraryPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
