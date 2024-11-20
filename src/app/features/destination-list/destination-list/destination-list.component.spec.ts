import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationListComponent } from './destination-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DestinationListComponent', () => {
  let component: DestinationListComponent;
  let fixture: ComponentFixture<DestinationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinationListComponent],
      imports:[
        HttpClientTestingModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ]
    });
    fixture = TestBed.createComponent(DestinationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
