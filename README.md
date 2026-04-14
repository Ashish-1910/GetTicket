# 🎬GetTicket🍿 - Kind Of BookMyShow Clone

A React + Vite web application that simulates a movie and event booking platform inspired by BookMyShow.

## Overview

This project provides a polished front-end experience for browsing movies, viewing details, booking tickets, managing user accounts, and displaying booking history.

Key features include:
- Authentication flow with signup and login pages
- Search, filter, and sort movie listings
- Movie detail pages with booking CTA
- Interactive seat selection and booking confirmation
- User booking management with cancel support
- Category pages for movies, events, sports, IPL, offers, and gift cards
- Responsive navigation, category navigation, and footer layout
- Toast notifications and animated page transitions

## Built With

- React 19
- Vite
- React Router DOM
- Bootstrap 5
- React Bootstrap
- ESLint

## Project Structure

- `src/App.jsx` - Main app shell, router, providers, and layout
- `src/components/` - Reusable UI components like `Navbar`, `MovieCard`, `HeroCarousel`, `SeatMap`, and `Footer`
- `src/pages/` - Application routes and page views such as `Home`, `Movies`, `BookingPage`, `Login`, `Signup`, `Profile`, and `AdminDashboard`
- `src/context/` - Global state context for authentication, theme, booking data, and toast notifications
- `src/data/` - Static JSON data for movies and events
- `src/index.css` - Global styling and custom theme

## Features

### Home and Navigation
- Hero carousel showcasing featured movies
- Category navigation with quick access to streams, events, sports, IPL, offers, and gift cards
- Responsive navbar with login/signup buttons and user menu

### Movies and Search
- Browse many movie cards with poster, rating, language, genre and runtime information
- Search movie titles and filter by genre, language, and rating
- Clear filters instantly to view the full catalog again

### Movie Details & Booking
- Movie detail page with cast, synopsis, showtimes, and booking CTA
- Protected booking flow: login required to reserve seats
- Seat map selection and booking confirmation flow
- Booking summary and confirmation page after checkout

### User Profile & Bookings
- Profile page with user details and booking analytics
- `My Bookings` page for active tickets and cancellation controls
- Booking persistence using client-side application state

### Additional Pages
- Contact Us
- About Us
- Offers
- Gift Cards
- Admin Dashboard
- 404 Not Found page for invalid routes

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd BookMyShow
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the shown local URL in your browser.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production bundle
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint across the source code

## Notes

- This project uses static JSON data for movies and events rather than a backend API.
- The authentication and booking state are managed in-memory via React context.
- Admin dashboard features and social login buttons are present as UI components and can be extended with real backend integration.

## Future Improvements

- Add backend API with persistent user authentication and booking storage
- Integrate payment gateway for realistic checkout
- Enable user profile editing and order history export
- Add dynamic event and sports ticket inventory
- Improve seat selection with real-time availability

## License

This repository is intended for learning and demonstration purposes.
