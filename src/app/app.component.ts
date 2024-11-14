import { Component } from '@angular/core';
import { CoreModule } from './core/core.module';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'travel-planner';

  showNavbar = false;  // Default value to show navbar

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Check if the current route has showNavbar set to false
    this.route.firstChild?.data.subscribe(data => {
      this.showNavbar = data['showNavbar'] !== false;  // Hide navbar if showNavbar is false
    });
  }
}
