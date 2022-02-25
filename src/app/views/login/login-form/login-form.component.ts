import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';
import { Booking, loginForm } from 'src/app/_interfaces';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  public loginForm!: FormGroup;
  public bookingNotFound = false;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      bookingCode: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(6),
          Validators.pattern(/^[2-9a-zA-Z]+$/),
        ],
      ],
      familyName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    });
  }

  getBooking(): void {
    this.bookingNotFound = false;
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      const form = this.loginForm.value as loginForm;
      this.bookingService
        .retrieveBooking(form.bookingCode, form.familyName)
        .subscribe((response) => {
          if (response.data.retrieveBooking) {
            this.bookingService.setBooking(response.data.retrieveBooking as Booking);
            this.router.navigateByUrl('/home');
          } else {
            this.bookingNotFound = true;
          }
        });
    }
  }

  get bookingCode() {
    return this.loginForm.get('bookingCode');
  }

  get familyName() {
    return this.loginForm.get('familyName');
  }
}
