import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationDetailsComponent } from './destination-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CurrencyFormatPipe } from 'src/app/shared/pipes/currency-format.pipe';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DestinationDetailsComponent', () => {
  let component: DestinationDetailsComponent;
  let fixture: ComponentFixture<DestinationDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinationDetailsComponent,CurrencyFormatPipe ],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ]
    });
    fixture = TestBed.createComponent(DestinationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
