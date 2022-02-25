const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server');

let fileImport = fs.readFileSync(path.resolve(__dirname, 'mock.json'));
let mockData = JSON.parse(fileImport);

const typeDefs = gql`
  type Title {
    code: String
    name: String
  }

  type Passengers {
    id: Int
    firstName: String
    lastName: String
    title: Title
  }

  type Equipment {
    code: String
    name: String
  }

  type Cabin {
    code: String
    name: String
  }

  type ArrivalTerminal {
    name: String
  }

  type Carrier {
    code: String
    name: String
  }

  type OperatingFlight {
    number: String
    duration: String
    flown: Boolean
    checkInStart: String
    localCheckInStart: String
    checkInEnd: String
    localCheckInEnd: String
    scheduledArrival: String
    localScheduledArrival: String
    scheduledDeparture: String
    localScheduledDeparture: String
    equipment: Equipment
    cabin: Cabin
    arrivalTerminal: ArrivalTerminal
    carrier: Carrier
  }

  type SellingClass {
    code: String
  }

  type Status {
    code: String
    name: String
  }

  type MarketingFlight {
    number: String
    numberOfStops: Int
    operatingFlight: OperatingFlight
    sellingClass: SellingClass
    status: Status
    carrier: Carrier
  }

  type Country {
    code: String
    name: String
  }

  type City {
    IATACode: String
    name: String
    country: Country
  }

  type ArriveOn {
    IATACode: String
    name: String
    city: City
  }

  type DepartFrom {
    IATACode: String
    name: String
    city: City
  }

  type Segments {
    id: Int
    type: String
    informational: Boolean
    marketingFlight: MarketingFlight
    arriveOn: ArriveOn
    departFrom: DepartFrom
  }

  type Destination {
    IATACode: String
    name: String
    city: City
  }

  type Origin {
    IATACode: String
    name: String
    city: City
  }

  type Connections {
    id: Int
    duration: String
    segments: [Segments]
    destination: Destination
    origin: Origin
  }

  type Itinerary {
    type: String
    connections: [Connections]
  }

  type ContactDetails {
    class: String
    address: String
  }

  type Booking {
    bookingCode: String
    passengers: Passengers
    itinerary: Itinerary
    contactDetails: [ContactDetails]
  }

  type Query {
    retrieveBooking(bookingCode: String!, lastName: String!): Booking
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    retrieveBooking(parent, args, context, info) {
      const bookingCode = args.bookingCode;
      const lastName = args.lastName;
      const response = mockData.filter(
        (a) => a.bookingCode == bookingCode && a.passengers.lastName == lastName
      )[0];
      return response;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
