import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { SignupComponent } from './signup.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authService : AuthService;
  let mockUserData = {
      id: '1',
      userEmail: 'John@gmail.com',
      pass : '123',
      activities: []
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports:[
        HttpClientTestingModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers:[
        {
          provide: AuthService,
          useValue : {
            signUp : jasmine.createSpy().and.returnValue(of(mockUserData))
          }
        }
      ]
    });
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should signup user',fakeAsync(()=>{
    const formData = {
      userEmail : 'John@gmail.com',
      pass : '123'
    }
    spyOn(component,'redirectToDestinations');
    component.handleSubmit(formData);
    tick(1);
    expect(component.redirectToDestinations).toHaveBeenCalled();
  }));
});
