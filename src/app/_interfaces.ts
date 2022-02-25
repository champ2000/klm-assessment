// TODO move to more suitable location
export interface loginForm {
  bookingCode: string;
  familyName: string;
}

export interface ContactDetail {
  class: string;
  address: string;
}

export interface Country {
  name: string;
}

export interface City {
  name: string;
  country: Country;
}

export interface DepartFrom {
  IATACode: string;
  city: City;
}

export interface ArriveOn {
  IATACode: string;
  city: City;
}

export interface Carrier {
  name: string;
}

export interface OperatingFlight {
  localScheduledArrival: string;
  localScheduledDeparture: string;
  number: string;
  carrier: Carrier;
}

export interface MarketingFlight {
  operatingFlight: OperatingFlight;
}

export interface Segment {
  departFrom: DepartFrom;
  arriveOn: ArriveOn;
  marketingFlight: MarketingFlight;
}

export interface Connection {
  duration: string;
  segments: Segment[];
}

export interface Itinerary {
  type: string;
  connections: Connection[];
}

export interface Passengers {
  firstName: string;
  lastName: string;
}

export interface BookingResponse {
  retrieveBooking: {
    bookingCode: string;
    contactDetails: ContactDetail[];
    itinerary: Itinerary;
    passengers: Passengers;
  };
}

export interface Booking {
  bookingCode: string;
  contactDetails: ContactDetail[];
  itinerary: Itinerary;
  passengers: Passengers;
}
