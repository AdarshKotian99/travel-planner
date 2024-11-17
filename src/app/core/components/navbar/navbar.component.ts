import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public isCollapsed = true;
  private currentTheme: 'light' | 'dark' = 'light';

  constructor(private authService : AuthService, private router : Router){
    //const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    //this.setTheme(savedTheme || 'light');
    this.setTheme('light');
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleTheme(){
    //document.body.classList.toggle('dark-theme');
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);

  }

  setTheme(theme: 'light' | 'dark') {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  // getTheme(): 'light' | 'dark' {
  //   return this.currentTheme;
  // }
}
  