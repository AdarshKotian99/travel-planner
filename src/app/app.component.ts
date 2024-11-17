import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'travel-planner';

  showNavbar = true;  // Default value to show navbar

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Hide navbar for login and signup routes
        console.log('event.url:-',event.url)
        if (event.url.startsWith('/destinations')) {
          this.showNavbar = true;
        } else {
          this.showNavbar = false;
        }
        // if (event.url === '/login' || event.url === '/signup' || event.url.includes('/sharedItinerary') || (!event.url.includes('/destinations') && !event.url.includes('/destinations/budget') && !event.url.includes('/destinations/itinerary'))) {
        //   this.showNavbar = false;
        // } else {
        //   this.showNavbar = true;
        // }
      }
    });
  }
}
