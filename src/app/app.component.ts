import { Component } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'travel-planner';

  showNavbar = true;  // Default value to show navbar

  constructor(private authService : AuthService,private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Hide navbar for login and signup routes
        console.log('event.url:-',event.url)
        if (event.url === '/login' || event.url === '/signup' || event.url.includes('/sharedItinerary') || (!event.url.includes('/destinations') && !event.url.includes('/destinations/budget') && !event.url.includes('/destinations/itinerary'))) {
          this.showNavbar = false;
        } else {
          this.showNavbar = true;
        }
      }
    });
  }
}
