document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const filmsContainer = document.getElementById('films-container');
    const filmDetails = document.getElementById('film-details');
    
    // Fetch films from db.json
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            const films = data.films;
            
            // Display all films in the film list
            displayFilms(films);
            
            // Display details of the first film by default
            if (films.length > 0) {
                displayFilmDetails(films[0]);
            }
        })
        .catch(error => {
            console.error('Error fetching films:', error);
            filmsContainer.innerHTML = '<p>Failed to load films. Please try again later.</p>';
        });
    
    // Function to display all films
    function displayFilms(films) {
        filmsContainer.innerHTML = '';
        
        films.forEach(film => {
            const filmCard = document.createElement('div');
            filmCard.className = 'film-card';
            filmCard.innerHTML = `
                <h3>${film.title}</h3>
            `;
            
            filmCard.addEventListener('click', () => {
                displayFilmDetails(film);
            });
            
            filmsContainer.appendChild(filmCard);
        });
    }
    
    // Function to display film details
    function displayFilmDetails(film) {
        const availableTickets = film.capacity - film.tickets_sold;
        
        filmDetails.innerHTML = `
            <img src="${film.poster}" alt="${film.title}" class="film-poster">
            <div class="film-meta">
                <h2>${film.title}</h2>
                <p><strong>Runtime:</strong> ${film.runtime} minutes</p>
                <p><strong>Showtime:</strong> ${film.showtime}</p>
                <p><strong>Available Tickets:</strong> <span id="available-tickets">${availableTickets}</span></p>
            </div>
            <div class="film-description">
                <p>${film.description}</p>
            </div>
            <button id="buy-ticket-btn" class="btn" ${availableTickets === 0 ? 'disabled' : ''}>
                ${availableTickets === 0 ? 'Sold Out' : 'Buy Ticket'}
            </button>
            <div class="tickets-info">
                <p>Theater Capacity: ${film.capacity}</p>
                <p>Tickets Sold: <span id="tickets-sold">${film.tickets_sold}</span></p>
            </div>
        `;
        
        // Add event listener to the buy ticket button
        const buyTicketBtn = document.getElementById('buy-ticket-btn');
        if (buyTicketBtn && availableTickets > 0) {
            buyTicketBtn.addEventListener('click', () => buyTicket(film));
        }
    }
    
    // Function to handle buying a ticket
    function buyTicket(film) {
        const availableTicketsElement = document.getElementById('available-tickets');
        const ticketsSoldElement = document.getElementById('tickets-sold');
        const buyTicketBtn = document.getElementById('buy-ticket-btn');
        
        // Update the number of available tickets and tickets sold
        const newTicketsSold = parseInt(ticketsSoldElement.textContent) + 1;
        const newAvailableTickets = parseInt(availableTicketsElement.textContent) - 1;
        
        // Update the display
        ticketsSoldElement.textContent = newTicketsSold;
        availableTicketsElement.textContent = newAvailableTickets;
        
        // Update the film data
        film.tickets_sold = newTicketsSold;
        
        // Disable the button if no more tickets are available
        if (newAvailableTickets === 0) {
            buyTicketBtn.textContent = 'Sold Out';
            buyTicketBtn.disabled = true;
        }
        
        // Show a success message
        showNotification('Ticket purchased successfully!');
    }
    
    // Function to show notifications
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#4CAF50';
        notification.style.color = 'white';
        notification.style.padding = '15px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        notification.style.zIndex = '1000';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove the notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
});