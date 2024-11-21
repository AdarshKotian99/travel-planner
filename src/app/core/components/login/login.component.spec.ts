import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService : AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports:[
        HttpClientTestingModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers:[
        {
          provide:AuthService,
          useValue:{
            login : jasmine.createSpy().and.returnValue(of(true))
          }
        }
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    // form = component.loginForm.form;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login user',fakeAsync(()=>{
    const form = {
      userEmail: 'abc@gmail.com',
      pass: '123',
    };
    spyOn(component,'redirectToDestinations');
    component.handleLogin(form);
    tick(1);
    expect(component.redirectToDestinations).toHaveBeenCalled();
  }));

});
