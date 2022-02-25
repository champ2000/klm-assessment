import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';
import { Booking, BookingResponse } from '../_interfaces';

const GET_BOOKING = gql`
  query ($bookingCode: String!, $lastName: String!) {
    retrieveBooking(bookingCode: $bookingCode, lastName: $lastName) {
      bookingCode
      contactDetails {
        class
        address
      }
      itinerary {
        type
        connections {
          duration
          segments {
            departFrom {
              IATACode
              city {
                name
                country {
                  name
                }
              }
            }
            arriveOn {
              IATACode
              city {
                name
                country {
                  name
                }
              }
            }
            marketingFlight {
              operatingFlight {
                localScheduledArrival
                localScheduledDeparture
                number
                carrier {
                  name
                }
              }
            }
          }
        }
      }
      passengers {
        firstName
        lastName
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private _booking = new BehaviorSubject<Booking | null>(null);
  readonly booking$ = this._booking.asObservable();

  constructor(private apollo: Apollo) {}

  retrieveBooking(
    bookingCode: string,
    familyName: string
  ): Observable<ApolloQueryResult<BookingResponse>> {
    return this.apollo.watchQuery<BookingResponse>({
      query: GET_BOOKING,
      variables: {
        bookingCode: bookingCode,
        lastName: familyName,
      },
    }).valueChanges;
  }

  setBooking(data: Booking): void {
    this._booking.next(data);
  }
}
