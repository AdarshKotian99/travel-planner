import { Component } from '@angular/core';
import { CoreModule } from './core/core.module';
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
        if (event.url === '/login' || event.url === '/signup') {
          this.showNavbar = false;
        } else {
          this.showNavbar = true;
        }
      }
    });
  }
}
