import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BookingService } from 'src/app/services/booking.service';
import { Booking } from 'src/app/_interfaces';
import last from 'lodash-es/last';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookingData: Booking | undefined;
  panelOpenState = false;
  constructor(private router: Router, private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingService.booking$.subscribe((response) => {
      if (response) {
        this.bookingData = response;
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }

  get customerName() {
    return `${this.bookingData?.passengers?.firstName} ${this.bookingData?.passengers?.lastName}`;
  }

  get bookingCode() {
    return this.bookingData?.bookingCode;
  }

  get destination() {
    let connections = last(this.bookingData?.itinerary.connections);
    return `${last(connections?.segments)?.arriveOn.city.name}, ${
      last(connections?.segments)?.arriveOn.city.country.name
    }`;
  }
}
