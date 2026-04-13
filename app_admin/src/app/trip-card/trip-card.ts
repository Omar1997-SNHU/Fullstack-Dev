import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCardComponent implements OnInit {
  @Input('trip') trip: any;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public editTrip(trip: any): void {
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }
}