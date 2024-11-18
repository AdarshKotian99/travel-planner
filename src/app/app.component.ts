import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showNavbar = true;  // Default value to show navbar

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Hide navbar for login and signup routes
        if (event.url.startsWith('/destinations')) {
          this.showNavbar = true;
        } else {
          this.showNavbar = false;
        }
      }
    });
  }
}
