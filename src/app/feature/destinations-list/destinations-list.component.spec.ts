import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DestinationsListComponent } from './destinations-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DestinationsListComponent', () => {
  let component: DestinationsListComponent;
  let fixture: ComponentFixture<DestinationsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinationsListComponent],
      imports:[
        HttpClientTestingModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        NoopAnimationsModule
      ]
    });
    fixture = TestBed.createComponent(DestinationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
