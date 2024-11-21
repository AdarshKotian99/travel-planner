import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { AuthService } from './auth.service';
import { user } from 'src/app/models/user';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockUser: user = 
    {
      id: '1',
      userEmail: 'John@gmail.com',
      pass : '123',
      activities: [
        { destination: 'Paris', description: 'Visit Eiffel Tower', date: new Date }
      ]
    };

    const mockUsers : user[] = [
      {
        id: '1',
        userEmail: 'John@gmail.com',
        pass : '123',
        activities: [
          { destination: 'Paris', description: 'Visit Eiffel Tower', date: new Date }
        ]
      } 
    ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create new user',()=>{
    service.signUp(mockUser).subscribe(userData => {
      expect(userData).toEqual(mockUser);
    })

    const req = httpMock.expectOne('http://localhost:3000/signupUsersList');
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });

  it('should handle error during signup',()=>{
    service.signUp(mockUser).subscribe({
      error : (err) =>{
        expect(err.message).toBe('An unknown error occurred. Please try again.')
      }
    })

    const req = httpMock.expectOne('http://localhost:3000/signupUsersList');
    expect(req.request.method).toBe('POST');
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });

  it('should login user',()=>{
    service.login(mockUser).subscribe(result =>{
      expect(result).toBe(true);
    });

    const req = httpMock.expectOne('http://localhost:3000/signupUsersList');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should handle error during login',()=>{
    service.login(mockUser).subscribe({
      error : (err) => {
        expect(err.message).toBe('An unknown error occurred. Please try again.');
      }
    });

    const req = httpMock.expectOne('http://localhost:3000/signupUsersList');
    expect(req.request.method).toBe('GET');
    req.flush('Error',{status : 500, statusText: 'Server Error'});
  });

});
