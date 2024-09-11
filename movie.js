document.addEventListener('DOMContentLoaded', () => {
    const movieList = document.querySelector('.movie-list');
    const selectedMovie = document.getElementById('selected-movie');
    const movieInfo = document.getElementById('movie-info');
    const seatContainer = document.querySelector('.seat-container');
    const count = document.getElementById('count');
    const total = document.getElementById('total');
    const bookTicketsBtn = document.getElementById('book-tickets-btn');
    const ticketSection = document.getElementById('ticket');
    const ticketMovieTitle = document.getElementById('ticket-movie-title');
    const ticketDate = document.getElementById('ticket-date');
    const ticketTime = document.getElementById('ticket-time');
    const ticketSeats = document.getElementById('ticket-seats');
    const ticketTotal = document.getElementById('ticket-total');
    const printTicketBtn = document.getElementById('print-ticket');

    // Mobile navigation toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        burger.classList.toggle('toggle');
    });

    // Movie data (in a real app, this would come from a server)
    const movies = [
        { id: 1, title: "AVATAR", genre: "Sci-Fi", duration: "2h 49min", price: 12 },
        { id: 2, title: "TOY STORY", genre: "Fantasy AND ADVENTURE", duration: "2h 15min", price: 10 },
        { id: 3, title: "FROZEN", genre: "Romance AND DRAMA", duration: "1h 55min", price: 11 }
    ];

    // Generate seats
    const rows = 8;
    const seatsPerRow = 8;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < seatsPerRow; j++) {
            const seat = document.createElement('div');
            seat.classList.add('seat');
            if (Math.random() < 0.1) { // 10% chance of a seat being occupied
                seat.classList.add('occupied');
            }
            seatContainer.appendChild(seat);
        }
    }

    // Select movie
    movieList.addEventListener('click', (e) => {
        if (e.target.classList.contains('book-btn')) {
            const movieId = e.target.closest('.movie-card').dataset.movieId;
            const movie = movies.find(m => m.id === parseInt(movieId));
            selectedMovie.textContent = movie.title;
            movieInfo.textContent = `${movie.genre} | ${movie.duration} | $${movie.price}`;
            updateSelectedCount();
        }
    });

    // Select seats
    seatContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
            e.target.classList.toggle('selected');
            updateSelectedCount();
        }
    });

    // Update total and count
    function updateSelectedCount() {
        const selectedSeats = document.querySelectorAll('.seat.selected');
        const movieTitle = selectedMovie.textContent;
        const movie = movies.find(m => m.title === movieTitle);

        const selectedSeatsCount = selectedSeats.length;
        count.textContent = selectedSeatsCount;
        total.textContent = selectedSeatsCount * (movie ? movie.price : 0);

        bookTicketsBtn.disabled = selectedSeatsCount === 0 || movieTitle === 'Select a movie';
    }

    // Book tickets
    bookTicketsBtn.addEventListener('click', () => {
        const movieTitle = selectedMovie.textContent;
        const selectedSeats = document.querySelectorAll('.seat.selected');
        const totalPrice = total.textContent;

        if (selectedSeats.length > 0 && movieTitle !== 'Select a movie') {
            // Generate ticket
            ticketMovieTitle.textContent = movieTitle;
            ticketDate.textContent = new Date().toLocaleDateString();
            ticketTime.textContent = new Date().toLocaleTimeString();
            ticketSeats.textContent = Array.from(selectedSeats).map((seat, index) => 
                String.fromCharCode(65 + Math.floor(index / 8)) + (index % 8 + 1)
            ).join(', ');
            ticketTotal.textContent = totalPrice;

            // Show ticket section
            ticketSection.classList.remove('hidden');

            // Scroll to ticket section
            ticketSection.scrollIntoView({ behavior: 'smooth' });

            // Mark selected seats as occupied
            selectedSeats.forEach(seat => {
                seat.classList.remove('selected');
                seat.classList.add('occupied');
            });

            // Reset booking form
            selectedMovie.textContent = 'Select a movie';
            movieInfo.textContent = '';
            updateSelectedCount();
        }
    });

    // Print ticket
    printTicketBtn.addEventListener('click', () => {
        window.print();
    });
});