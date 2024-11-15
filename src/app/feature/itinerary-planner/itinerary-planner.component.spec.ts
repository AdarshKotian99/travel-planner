import { ComponentFixture, TestBed } from '@angular/core/testing';
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

describe('ItineraryPlannerComponent', () => {
  let component: ItineraryPlannerComponent;
  let fixture: ComponentFixture<ItineraryPlannerComponent>;

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
    fixture = TestBed.createComponent(ItineraryPlannerComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

});
