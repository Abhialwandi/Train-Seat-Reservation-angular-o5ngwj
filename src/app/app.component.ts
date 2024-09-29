import { Component } from '@angular/core';

interface Seat {
  number: number;
  isAvailable: boolean;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Train Seat Reservation';

  // Representing the coach with 7 seats per row and the last row with 3 seats
  coach = [
    [1, 2, 3, 4, 5, 6, 7], // Row 1
    [8, 9, 10, 11, 12, 13, 14], // Row 2
    [15, 16, 17, 18, 19, 20, 21], // Row 3
    [22, 23, 24, 25, 26, 27, 28], // Row 4
    [29, 30, 31, 32, 33, 34, 35], // Row 5
    [36, 37, 38, 39, 40, 41, 42], // Row 6
    [43, 44, 45, 46, 47, 48, 49], // Row 7
    [50, 51, 52, 53, 54, 55, 56], // Row 8
    [57, 58, 59, 60, 61, 62, 63], // Row 9
    [64, 65, 66, 67, 68, 69, 70], // Row 10
    [71, 72, 73, 74, 75, 76, 77], // Row 11
    [78, 79, 80], // Row 12 (Only 3 seats)
  ];

  // Represent availability status (true = available, false = booked)
  availability: boolean[][] = [
    [true, true, true, true, true, true, true], // Row 1
    [true, true, true, true, true, true, true], // Row 2
    [true, true, true, true, true, true, true], // Row 3
    [true, true, true, true, true, true, true], // Row 4
    [true, true, true, true, true, true, true], // Row 5
    [true, true, true, true, true, true, true], // Row 6
    [true, true, true, true, true, true, true], // Row 7
    [true, true, true, true, true, true, true], // Row 8
    [true, true, true, true, true, true, true], // Row 9
    [true, true, true, true, true, true, true], // Row 10
    [true, true, true, true, true, true, true], // Row 11
    [true, true, true], // Row 12 (Only 3 seats)
  ];

  // Store booked seat numbers
  bookedSeats: number[] = [];

  // Function to handle seat booking
  bookSeats(numSeats: number): void {
    let seatsToBook = [];
    numSeats = Number(numSeats); // Ensure the input is a number

    // Step 1: Try to book all seats in the same row
    for (let row = 0; row < this.coach.length; row++) {
      const availableSeatsInRow = this.availability[row].filter(
        (seat) => seat
      ).length;

      if (availableSeatsInRow >= numSeats) {
        // If a full row is available, book the seats
        for (let i = 0; i < numSeats; i++) {
          const seatIndex = this.availability[row].indexOf(true); // Find first available seat
          this.availability[row][seatIndex] = false; // Mark as booked
          seatsToBook.push(this.coach[row][seatIndex]); // Add seat number to bookedSeats
        }
        this.bookedSeats = seatsToBook; // Update booked seats
        return; // Exit once seats are booked
      }
    }

    // Step 2: If seats aren't available in the same row, book nearby seats
    for (let row = 0; row < this.coach.length && numSeats > 0; row++) {
      for (
        let seat = 0;
        seat < this.availability[row].length && numSeats > 0;
        seat++
      ) {
        if (this.availability[row][seat]) {
          this.availability[row][seat] = false; // Mark as booked
          seatsToBook.push(this.coach[row][seat]);
          numSeats--;
        }
      }
    }
    this.bookedSeats = seatsToBook; // Update booked seats
  }
}
