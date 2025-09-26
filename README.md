# flatdango app

A web application for browsing films and purchasing tickets. This application allows users to view a list of available films, see detailed information about each film, and purchase tickets for showings.

## Features

- Browse a list of available films
- View detailed information about each film including:
  - Poster image
  - Runtime
  - Showtime
  - Available tickets
  - Film description
  - Theater capacity
  - Tickets sold
- Purchase tickets for films
- Real-time updates of available tickets
- Sold out status when no tickets are available
- User-friendly notifications for successful purchases

## Technologies Used

- HTML
- CSS
- JavaScript (ES6+)
- Fetch API for data retrieval

## installation

1. Clone this repository to your local machine
2. Make sure you have a `db.json` file in the same directory with the following structure:

## Usage

1. When the application loads, you'll see a list of films on the left side of the screen.
2. Click on any film to view its details on the right side of the screen.
3. To purchase a ticket, click the "Buy Ticket" button.
4. The available tickets count will decrease by one, and the tickets sold count will increase by one.
5. If a film is sold out, the button will be disabled and show "Sold Out".
6. After purchasing a ticket, a success notification will appear in the bottom-right corner.

## File Structure


- index.html       # Main HTML file
- style.css        # CSS styles (if exists)
- script.js        # JavaScript functionality
- db.json          # Film data


## License

This project is open source and available under the MIT License.