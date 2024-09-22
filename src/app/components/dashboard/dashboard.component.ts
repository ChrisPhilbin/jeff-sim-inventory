import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(private router: Router) {}

  public navigateToItemsIndex(): void {
    this.router.navigate(['/items']);
  }

  public navigateToSchedules(): void {
    this.router.navigate(['/schedules']);
  }
}
