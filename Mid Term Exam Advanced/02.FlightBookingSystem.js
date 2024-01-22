class FlightBookingSystem {
  letructor(agencyName) {
    this.agencyName = agencyName;
    this.flights = [];
    this.bookings = [];
    this.bookingsCount = 0;
  }

  addFlight(flightNumber, destination, departureTime, price) {
    let existingFlight = this.flights.find((flight) => flight.flightNumber === flightNumber);
    if (existingFlight) {
      return `Flight ${flightNumber} to ${destination} is already available.`;
    }

    let newFlight = {
      flightNumber,
      destination,
      departureTime,
      price,
    };
    this.flights.push(newFlight);

    return `Flight ${flightNumber} to ${destination} has been added to the system.`;
  }

  bookFlight(passengerName, flightNumber) {
    let flight = this.flights.find((f) => f.flightNumber === flightNumber);
    if (!flight) {
      return `Flight ${flightNumber} is not available for booking.`;
    }

    let booking = {
      passengerName,
      flightNumber,
    };
    this.bookings.push(booking);
    this.bookingsCount++;

    return `Booking for passenger ${passengerName} on flight ${flightNumber} is confirmed.`;
  }

  cancelBooking(passengerName, flightNumber) {
    let bookingIndex = this.bookings.findIndex(
      (b) => b.passengerName === passengerName && b.flightNumber === flightNumber
    );
    if (bookingIndex === -1) {
      throw new Error(`Booking for passenger ${passengerName} on flight ${flightNumber} not found.`);
    }

    this.bookings.splice(bookingIndex, 1);
    this.bookingsCount--;

    return `Booking for passenger ${passengerName} on flight ${flightNumber} is cancelled.`;
  }

  showBookings(criteria) {
    if (this.bookings.length === 0) {
      throw new Error(`No bookings have been made yet.`);
    }

    if (criteria === "all") {
      let bookingInfo = this.bookings.map((booking) => `${booking.passengerName} booked for flight ${booking.flightNumber}`);
      return [`All bookings(${this.bookingsCount}):`, ...bookingInfo];
    } else if (criteria === "cheap") {
      let cheapBookings = this.bookings.filter((booking) => {
        let flight = this.flights.find((f) => f.flightNumber === booking.flightNumber);
        return flight && flight.price <= 100;
      });

      if (cheapBookings.length === 0) {
        return "No cheap bookings found.";
      }

      let cheapBookingInfo = cheapBookings.map((booking) => `${booking.passengerName} booked for flight ${booking.flightNumber}`);
      return ["Cheap bookings:", ...cheapBookingInfo];
    } else if (criteria === "expensive") {
      let expensiveBookings = this.bookings.filter((booking) => {
        let flight = this.flights.find((f) => f.flightNumber === booking.flightNumber);
        return flight && flight.price > 100;
      });

      if (expensiveBookings.length === 0) {
        return "No expensive bookings found.";
      }

      let expensiveBookingInfo = expensiveBookings.map((booking) => `${booking.passengerName} booked for flight ${booking.flightNumber}`);
      return ["Expensive bookings:", ...expensiveBookingInfo];
    } else {
      throw new Error("Invalid criteria. Please use 'all', 'cheap', or 'expensive'.");
    }
  }
}

// Example usage:
let flightSystem = new FlightBookingSystem("My Travel Agency");
console.log(flightSystem.addFlight("F101", "New York", "10:00 AM", 150));
console.log(flightSystem.addFlight("F102", "Los Angeles", "11:00 AM", 90));
console.log(flightSystem.addFlight("F103", "Chicago", "12:00 PM", 120));

console.log(flightSystem.bookFlight("Alice", "F101"));
console.log(flightSystem.bookFlight("Bob", "F102"));
console.log(flightSystem.bookFlight("Charlie", "F103"));

console.log(flightSystem.showBookings("all"));
console.log(flightSystem.showBookings("cheap"));
console.log(flightSystem.showBookings("expensive"));

console.log(flightSystem.cancelBooking("Bob", "F102"));

console.log(flightSystem.showBookings("all"));
