# 🎬 CineVerse — Movie Booking Frontend App

> A fully functional, interactive movie booking web app inspired by BookMyShow — built with **React.js** and **Bootstrap**. 
> Unique premium UI with **dark/light theme**, **glassmorphism**, working **auth**, **seat booking**, and **search/filters**.

---

## 1. 📍 PROJECT OVERVIEW

### Features List

| # | Feature | Implementation |
|---|---------|---------------|
| 1 | **Authentication** | Login/Signup with localStorage (frontend-only) |
| 2 | **Search & Filter** | Real-time search by name, filter by genre/language/rating |
| 3 | **Movie Booking** | Interactive seat selection, booking summary, confirmation |
| 4 | **Theme System** | Dark/Light mode toggle with localStorage persistence |
| 5 | **Global Toasts** | Custom ToastContext for beautiful success/error popups |
| 6 | **Live Search** | Real-time autocomplete dropdown in Navbar (Desktop & Mobile) |
| 7 | **Animations** | Confetti on success, fade-ins, hover effects, CSS keyframes |
| 8 | **Responsive** | Fully responsive with Bootstrap grid + custom breakpoints |
| 9 | **Booking History** | View and cancel bookings from "My Bookings" page |
| 10 | **Mock Data** | 10 movies (Hindi/English mix) with showtimes and pricing |

### Tech Stack

- **React.js 19** — Functional components + Hooks
- **React Router DOM v7** — Client-side routing
- **Bootstrap 5 + React-Bootstrap** — Layout & responsiveness  
- **Vite** — Build tool (fast HMR)
- **localStorage** — Client-side persistence for auth & bookings

> ⚠️ **Important**: This is a **frontend-only** project. No backend, no API, no real payments. All data is stored in `localStorage`.

---

## 2. 🛣️ STEP-BY-STEP ROADMAP

### Phase 1: Setup
```
1. Created Vite + React project
2. Installed Bootstrap, React-Bootstrap, React Router DOM
3. Set up folder structure
```

### Phase 2: Foundation
```
4. Created CSS theme system (index.css) with CSS variables
5. Built ThemeContext for dark/light mode
6. Created mock movie data (movies.json)
```

### Phase 3: Auth System
```
7. Built AuthContext (login/signup/logout with localStorage)
8. Created Login page with validation
9. Created Signup page with validation rules
```

### Phase 4: Core Pages
```
10. Home page — hero section + movie grid + search/filters
11. Movie Details page — backdrop, poster, showtimes
12. Booking page — seat map + summary
13. Booking Confirmation page — ticket-style card
14. My Bookings page — booking history with cancel
```

### Phase 5: Polish & Interactions
```
15. Added basic animations (fade-in, hover, skeleton loading)
16. Built ToastContext for custom global popup notifications
17. Developed Canvas-based ConfettiAnimation for successful bookings
18. Implemented Live Search Autocomplete mapping over movies data
19. Created secondary pages (ContactUs, AboutUs, CategoryPages)
20. Finalized responsive design layout
```

---

## 3. 📁 PROJECT STRUCTURE

```
BookMyShow/
├── index.html                    # Entry HTML with Google Fonts & SEO meta
├── package.json                  # Dependencies
├── vite.config.js               # Vite configuration
│
└── src/
    ├── main.jsx                 # React entry — imports Bootstrap + CSS
    ├── App.jsx                  # Root component — Router + Providers
    ├── index.css                # 🎨 ENTIRE theme system (500+ lines)
    │
    ├── context/                 # React Context (global state)
    │   ├── ThemeContext.jsx      # Dark/Light mode toggle
    │   ├── AuthContext.jsx       # Login/Signup/Logout state
    │   ├── BookingContext.jsx    # Booking management
    │   └── ToastContext.jsx      # Global toast notifications
    │
    ├── components/              # Reusable UI components
    │   ├── Navbar.jsx           # Navigation + live search + auth
    │   ├── Footer.jsx           # Footer with links + newsletter
    │   ├── MovieCard.jsx        # Movie poster card with overlay
    │   ├── EventCarousel.jsx    # Horizontal scrolling event cards
    │   ├── MovieCarousel.jsx    # Horizontal scrolling movie cards
    │   ├── SeatMap.jsx          # Interactive seat selection grid
    │   ├── SkeletonCard.jsx     # Loading placeholder
    │   └── ConfettiAnimation.jsx # Canvas physics particle engine
    │
    ├── pages/                   # Full page components
    │   ├── Home.jsx             # Hero + movie/event carousels
    │   ├── Movies.jsx           # Movie grid + search/filters
    │   ├── MovieDetails.jsx     # Movie info + showtime selection
    │   ├── BookingPage.jsx      # Seat selection + booking summary
    │   ├── BookingConfirmation.jsx  # Success + ticket card
    │   ├── MyBookings.jsx       # Booking history + cancel
    │   ├── Login.jsx            # Login form with validation
    │   ├── Signup.jsx           # Signup form with validation
    │   ├── CategoryPage.jsx     # Reusable template for stream/events/sports
    │   ├── ContactUs.jsx        # Customer support form
    │   └── AboutUs.jsx          # Company information
    │
    └── data/
        └── movies.json          # Mock data — 10 movies
```

### Folder Explanation

| Folder | Purpose | Kya hai? (Hinglish) |
|--------|---------|---------------------|
| `context/` | Global state management using React Context API | Poore app mein shared data (theme, user, bookings) |
| `components/` | Reusable UI pieces used across pages | Chhote-chhote reusable UI blocks |
| `pages/` | Full page views mapped to routes | Har ek page jo URL se map hota hai |
| `data/` | Static mock data (no API needed) | Fake movie data — JSON file |

---

## 4. 🎨 THEME SYSTEM

### Color Palette

| Token | Dark Mode | Light Mode | Purpose |
|-------|-----------|------------|---------|
| `--primary` | `#7c3aed` | `#7c3aed` | Purple — brand color |
| `--primary-light` | `#a78bfa` | `#a78bfa` | Lighter purple for text |
| `--secondary` | `#06d6a0` | `#059669` | Green — accent/success |
| `--accent` | `#f72585` | `#e11d74` | Pink — error/highlight |
| `--bg` | `#0a0a1a` | `#f5f3ff` | Main background |
| `--bg-card` | `#1a1a3e` | `#ffffff` | Card background |
| `--text` | `#e8e8f0` | `#1a1a2e` | Primary text |

### How Dark/Light Toggle Works

```
ThemeContext.jsx
├── useState — reads saved theme from localStorage
├── useEffect — saves theme & sets body[data-theme] attribute
├── toggleTheme() — flips isDark boolean
└── Provider wraps entire app

index.css
├── body[data-theme='dark'] { ... }  ← Dark CSS variables
└── body[data-theme='light'] { ... } ← Light CSS variables
```

**Key Code — ThemeContext.jsx:**
```jsx
const [isDark, setIsDark] = useState(() => {
  const saved = localStorage.getItem('cineverse_theme');
  return saved ? JSON.parse(saved) : true; // default dark
});

useEffect(() => {
  localStorage.setItem('cineverse_theme', JSON.stringify(isDark));
  document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
}, [isDark]);

const toggleTheme = () => setIsDark(prev => !prev);
```

**Ek line mein**: `localStorage` se theme load hota hai → `body` ka `data-theme` attribute change hota hai → CSS variables automatically switch ho jaate hain.

---

## 5. 🔐 AUTH SYSTEM

> ⚠️ **Disclaimer**: Yeh frontend-only authentication hai. Password plain text mein localStorage mein store hota hai. Production mein yeh approach **NEVER** use karna — yeh sirf demo ke liye hai.

### How It Works

```
Signup Flow:
  1. User fills form (name, email, password, confirm password)
  2. Frontend validation runs
  3. Check if email already exists in localStorage
  4. Save user to 'cineverse_users' array in localStorage
  5. Redirect to Login page

Login Flow:
  1. User enters email + password
  2. Frontend validation runs
  3. Match credentials against 'cineverse_users' in localStorage
  4. If match → save user session to 'cineverse_user' in localStorage
  5. If no match → show error message

Session Persistence:
  - On app load, AuthContext reads 'cineverse_user' from localStorage
  - If found → user is automatically logged in
  - Persists across page refresh
```

### Validation Rules

| Field | Rules |
|-------|-------|
| Name | Required, min 2 characters |
| Email | Required, valid email format (regex) |
| Password | Required, min 6 chars, 1 uppercase, 1 number |
| Confirm Password | Must match password |

### Key Code — Validation:
```jsx
const validate = () => {
  const errs = {};
  if (!form.email.trim()) {
    errs.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errs.email = 'Enter a valid email address';
  }
  if (!form.password) {
    errs.password = 'Password is required';
  } else if (form.password.length < 6) {
    errs.password = 'Password must be at least 6 characters';
  }
  return errs;
};
```

### localStorage Keys Used

| Key | Type | Contains |
|-----|------|----------|
| `cineverse_users` | Array | All registered users `[{name, email, password}]` |
| `cineverse_user` | Object | Currently logged-in user `{name, email}` |
| `cineverse_theme` | Boolean | `true` = dark, `false` = light |
| `cineverse_bookings` | Array | All bookings `[{id, movieTitle, seats, ...}]` |

---

## 6. 🔎 FILTER & SEARCH LOGIC

### How Filtering Works

```
User types/selects → filters state updates → useMemo recalculates → UI re-renders
```

**No page reload needed!** — React's state-driven re-rendering handles everything.

### Filter Implementation

```jsx
const filteredMovies = useMemo(() => {
  return movies.filter((movie) => {
    // Search by name (case-insensitive)
    if (filters.search && 
        !movie.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    // Filter by genre
    if (filters.genre && !movie.genre.includes(filters.genre)) {
      return false;
    }
    // Filter by language
    if (filters.language && movie.language !== filters.language) {
      return false;
    }
    // Filter by minimum rating
    if (filters.rating && movie.rating < parseFloat(filters.rating)) {
      return false;
    }
    return true;
  });
}, [movies, filters]);
```

### State Structure

```jsx
const [filters, setFilters] = useState({
  search: '',      // text input
  genre: '',       // dropdown: Action, Comedy, etc.
  language: '',    // dropdown: Hindi, English
  rating: '',      // dropdown: 7+, 8+, 9+
});
```

### Dynamic Genre/Language Extraction

```jsx
// Unique genres from all movies
const genres = useMemo(() => {
  const all = moviesData.flatMap((m) => m.genre);
  return [...new Set(all)].sort();
}, []);
```

### Live Autocomplete Search (Navbar.jsx)

- **What:** A global search bar in the navbar that suggests movies instantly as you type.
- **How:** It matches the input string against `moviesData` using `.toLowerCase().includes()`.
- **The "Blur" Bug Solved:** If we relied on `onBlur` and `onClick`, clicking a suggestion would blur the input, hiding the popup *before* the click registered. We solved this by using `onMouseDown` on the suggestion cards, which fires *before* the input loses focus.
- **Mobile Support:** We extracted `renderSuggestions()` into a reusable function so that it displays perfectly on both Desktop and Mobile views.

---

## 7. 🎟️ BOOKING SYSTEM

### Booking Flow

```
1. User selects a movie from Home page
2. Views movie details + showtimes
3. Selects a showtime → clicks "Book Now"
4. Redirected to Booking page (auth required)
5. Selects seats from interactive seat map
6. Reviews booking summary (seats, price, total)
7. Clicks "Confirm Booking"
8. Booking saved to localStorage
9. Redirected to confirmation page with ticket card
```

### Seat Selection Logic (SeatMap.jsx)

- **8 rows (A-H)** × **12 seats** = 96 seats
- Random seats are pre-booked on load
- User can select up to 10 seats
- Aisle gaps after seats 4 and 8
- Three states: **Available** → **Selected** → **Booked**

```jsx
const handleSeatClick = (seatId) => {
  if (bookedSeats.has(seatId)) return; // Already booked

  if (selectedSeats.includes(seatId)) {
    // Deselect
    onSeatToggle(selectedSeats.filter((s) => s !== seatId));
  } else if (selectedSeats.length < maxSeats) {
    // Select
    onSeatToggle([...selectedSeats, seatId]);
  }
};
```

### Booking Data Structure

```json
{
  "id": "m1a2b3c4d",
  "movieId": 1,
  "movieTitle": "Echoes of Tomorrow",
  "moviePoster": "https://...",
  "showTime": "08:00 PM",
  "theater": "CineVerse Premium",
  "pricePerSeat": 420,
  "seats": ["D5", "D6", "D7"],
  "totalAmount": 1260,
  "userEmail": "user@example.com",
  "userName": "Ashish",
  "bookedAt": "2026-04-07T..."
}
```

---

## 8. 🧩 ADVANCED SYSTEMS (TOASTS & CONFETTI)

### Toast Notification System (ToastContext.jsx)
**What:** A non-intrusive popup system to show success, error, or info messages (e.g., "Login Successful", "Booking Confirmed").
**Why:** Standard `alert()` dialogs are blocking and unprofessional.
**How:** 
- Wraps the app in `<ToastProvider>`.
- Maintains a list of active toasts in state `[toasts, setToasts]`.
- Uses `createPortal` to render toasts directly to the `document.body` (ensuring they break out of CSS `overflow: hidden` constraints).
- Auto-dismisses using `setTimeout(id, duration)`.

### Particle Physics Engine (ConfettiAnimation.jsx)
**What:** Fireworks/Confetti effect when a booking or login is successful.
**Why:** Enhances UX with delightful micro-interactions.
**How:**
- Uses the HTML5 `<canvas>` API via a React `useRef`.
- **Physics Logic:** Generates 150 `Particle` objects. Every frame (`requestAnimationFrame`), it updates their `x` and `y` using velocity (`vx`, `vy`) and adds `gravity` to `vy`.
- **Polished Tuning:** Gravity and initial burst speed (`Math.random()`) were tuned to fall gracefully over 4-6 seconds, gradually fading out (`opacity -= 0.01`).

---

## 9. 💻 SOURCE CODE — FULL PAGE BREAKDOWN

### Master Architecture & Routing
| File | Role & Functionality |
|------|---------|
| [index.css](file:///c:/Users/Ashish/Desktop/New%20folder/Web%20Programming/FET/BookMyShow/src/index.css) | Custom CSS framework mapping CSS variables. Controls every animation, typography, and theme token. |
| [App.jsx](file:///c:/Users/Ashish/Desktop/New%20folder/Web%20Programming/FET/BookMyShow/src/App.jsx) | The absolute entry root. Defines all React Router `<Route>` instances and wraps the app in Auth, Theme, Toast, and Booking Context Providers. Contains `<AnimatedRoutes>` for page fade transitions. |

### Global Contexts
| File | Role & Functionality |
|------|---------|
| [ThemeContext.jsx](file:///c:/Users/Ashish/Desktop/New%20folder/Web%20Programming/FET/BookMyShow/src/context/ThemeContext.jsx) | Toggles `data-theme` on `body` tag and syncs with `localStorage`. |
| [AuthContext.jsx](file:///c:/Users/Ashish/Desktop/New%20folder/Web%20Programming/FET/BookMyShow/src/context/AuthContext.jsx) | Handles `login()`, `signup()`, `logout()`. Checks localStorage on mount to restore user sessions. |
| [BookingContext.jsx](file:///c:/Users/Ashish/Desktop/New%20folder/Web%20Programming/FET/BookMyShow/src/context/BookingContext.jsx) | CRUD for bookings (`addBooking`, `cancelBooking`). |

### Core Pages
| File | Role & Functionality |
|------|---------|
| [Home.jsx](file:///c:/Users/Ashish/Desktop/New%20folder/Web%20Programming/FET/BookMyShow/src/pages/Home.jsx) | The landing page. Generates a Hero section, pulls "Trending" movies into a `MovieCarousel` with `speed={0.3}`, provides quick Category navigations, and maps out Support/Guideline footer snippets. |
| [Movies.jsx](file:///c:/Users/Ashish/Desktop/New%20folder/Web%20Programming/FET/BookMyShow/src/pages/Movies.jsx) | Massive filter-driven page. Maps through `moviesData.json` using `useMemo` based on Genre, Language, Rating, and Sort directives. Calculates active matches dynamically. |
| [MovieDetails.jsx](file:///c:/Users/Ashish/Desktop/New%20folder/Web%20Programming/FET/BookMyShow/src/pages/MovieDetails.jsx) | Parses `useParams()` ID to find the movie. Displays a beautiful backdrop UI, cast list, and renders showtimes as clickable pills that push navigation state to the `BookingPage`. |
| [BookingPage.jsx](file:///c:/Users/Ashish/Desktop/New%20folder/Web%20Programming/FET/BookMyShow/src/pages/BookingPage.jsx) | Checks context if Auth exists. If not, pushes to `/login`. If yes, displays `SeatMap.jsx`. Takes active seat selections and calculates live Total Price. Handles the final Checkout click. |
| [BookingConfirmation.jsx](file:///c:/Users/Ashish/Desktop/New%20folder/Web%20Programming/FET/BookMyShow/src/pages/BookingConfirmation.jsx)  | Success UI. Mounts the `<ConfettiAnimation />` and renders an SVG ticket stub displaying the booking data received from URL state. |
| [MyBookings.jsx](file:///c:/Users/Ashish/Desktop/New%20folder/Web%20Programming/FET/BookMyShow/src/pages/MyBookings.jsx) | Uses `BookingContext` to map over historical bookings. Uses the `ToastContext` to throw a specific error toast if trying to cancel past bookings, or success toast on removal. |
| [Profile.jsx](file:///c:/Users/Ashish/Desktop/New%20folder/Web%20Programming/FET/BookMyShow/src/pages/Profile.jsx) | A dedicated user dashboard that reads session data from the `AuthContext`. It displays personal traits (Name, Email, Location, Genres) and scans the `BookingContext` to calculate their total historical spend across all tickets. |
| [Login.jsx](file:///c:/Users/Ashish/Desktop/New%20folder/Web%20Programming/FET/BookMyShow/src/pages/Login.jsx) & [Signup.jsx](file:///c:/Users/Ashish/Desktop/New%20folder/Web%20Programming/FET/BookMyShow/src/pages/Signup.jsx)| Controlled form components. Run regex validations on inputs. Pass user objects to `AuthContext`. Triggers Confetti on successful login. |

### Secondary / Structural Pages
| File | Role & Functionality |
|------|---------|
| [Navbar.jsx](file:///c:/Users/Ashish/Desktop/New%20folder/Web%20Programming/FET/BookMyShow/src/components/Navbar.jsx) | Sits globally. Contains the theme-toggle, auth menu drop downs, and the advanced autocomplete global search bar (for both desktop and mobile layouts). |
| [CategoryPage.jsx](file:///c:/Users/Ashish/Desktop/New%20folder/Web%20Programming/FET/BookMyShow/src/pages/CategoryPage.jsx)| A dynamic template page used to instantly mock up the structure for `/sports`, `/events`, `/stream` categories when clicked on the Global Navbar. Tests Toast system when users click mock Book buttons. |
| [ContactUs.jsx](file:///c:/Users/Ashish/Desktop/New%20folder/Web%20Programming/FET/BookMyShow/src/pages/ContactUs.jsx) & [AboutUs.jsx](file:///c:/Users/Ashish/Desktop/New%20folder/Web%20Programming/FET/BookMyShow/src/pages/AboutUs.jsx)| Static informational company pages linked through the footer. |

---

## 9. ✨ ANIMATIONS

### Animations Used & Where

| Animation | Where | CSS / Code |
|-----------|-------|-----------|
| **Confetti** | Booking/Auth Success | `ConfettiAnimation.jsx` — Canvas JS physics engine (gravity, velocity) |
| **Global Toasts**| Success/Error popups | `ToastContext` — Slide in/out CSS transitions |
| **fadeInUp** | Movie cards, page content | `@keyframes fadeInUp` — opacity 0→1, translateY 24→0 |
| **shimmer** | Skeleton loading cards | `@keyframes shimmer` — background-position sweep |
| **scaleIn** | Booking confirmation | `@keyframes scaleIn` — scale 0.9→1 |
| **pulse** | Success checkmark icon | `@keyframes pulse` — scale 1→1.05→1 |
| **hover lift** | Movie cards | `transform: translateY(-8px) scale(1.02)` on hover |
| **hover glow** | Buttons | `box-shadow: 0 8px 25px rgba(...)` on hover |
| **poster zoom** | Movie card poster | `transform: scale(1.08)` on card hover |
| **theme toggle spin** | Theme button | `transform: rotate(180deg)` on hover |
| **page transition** | All route changes | `key={location.pathname}` triggers fadeIn re-mount |
| **seat pop** | Seat selection | `transform: scale(1.1)` on hover, `scale(1.05)` when selected |

### UX Reasoning

- **Skeleton loading** → Avoids layout shift, user knows content is loading
- **Card lift on hover** → Affordance — tells user "this is clickable"
- **Button glow** → Premium feel, draws attention to CTAs
- **Page fade-in** → Smooth route transitions reduce jarring content swaps
- **Seat scale** → Precise feedback for interactive UI elements

### Key Animation Code:

```css
/* Fade In from below */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Skeleton shimmer */
@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Card hover lift */
.movie-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 24px 48px rgba(124, 58, 237, 0.25);
}
```

#### Advanced Javascript Canvas Animation (Confetti)
```javascript
// A particle update method running 60 times a second inside requestAnimationFrame
p.x += p.vx;
p.y += p.vy;
p.vy += 0.12; // Gravity pulls it down!
p.angle += p.spin; 
p.opacity -= 0.008; // Fade out slowly
ctx.fillStyle = p.color; // Paints the canvas context!
```

---

## 10. 📄 DOCUMENTATION (FOR VIVA)

### 📌 Introduction & Project Definition

**Viva Project Definition:**
> "CineVerse is a fully interactive, component-driven Single Page Application (SPA) built using React.js and Bootstrap that simulates a complete cinema ticketing platform. The architecture emphasizes modern frontend paradigms utilizing the React Context API for global state management (Authentication, Theming, and Booking), functional hooks (`useMemo`, `useEffect`) for optimized real-time data filtering, and pure HTML5 `<canvas>` alongside CSS-glassmorphism techniques to deliver a highly performant, premium, and seamless user experience entirely on the client side."

### 🛠 Technologies Used

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React.js** | 19.x | UI library — functional components + hooks |
| **React Router DOM** | 7.x | Client-side routing (SPA) |
| **Bootstrap** | 5.x | Responsive grid, utilities |
| **React-Bootstrap** | (via CSS) | Bootstrap integration |
| **Vite** | 6.x | Development server + build tool |
| **localStorage** | Web API | Client-side data persistence |
| **Google Fonts** | — | Outfit + Space Grotesk typography |

### 🎨 Theme & UI Design

- **Design Language**: Premium dark theme with glassmorphism effects
- **Color Scheme**: Purple (`#7c3aed`) + Green (`#06d6a0`) + Pink (`#f72585`)
- **Typography**: Outfit (body) + Space Grotesk (headings)
- **Glass Cards**: `backdrop-filter: blur(16px)` with transparent borders
- **Responsive**: Bootstrap grid + custom media queries for mobile/tablet

### 🔐 Authentication System

- **Frontend-Only**: No backend, no hashing — educational purpose only
- **Storage**: `localStorage` for user registration and session
- **Validation**: Email regex, password strength (length, uppercase, number)
- **Session**: Persists login across page refresh via `useEffect` reading localStorage
- **Context API**: `AuthContext` provides `user`, `isAuthenticated`, `login`, `signup`, `logout`

### 🔎 Filtering & Search

- **Real-time**: Results update as user types/selects (no submit button needed)
- **Multiple Filters**: Search + Genre + Language + Rating can combine
- **Implementation**: `useMemo` for performance-optimized filtering
- **Dynamic Options**: Genre/language lists extracted from movie data

### 🎟️ Booking Logic

- **Seat Map**: 8×12 grid with visual states (available/selected/booked)
- **Price Calculation**: `selectedSeats.length × show.price`
- **Storage**: `BookingContext` saves to `localStorage`
- **Confirmation**: Ticket-style card with unique booking ID + dynamic Canvas Confetti
- **History**: My Bookings page shows all user bookings with cancel option

### ✨ Animations Used

See **Section 9** above for complete list.

### 🧩 React Concepts Used

| Concept | Where Used | Explanation |
|---------|-----------|-------------|
| **useState** | All components | Managing local component state (forms, selections) |
| **useEffect** | Auth, Theme, Data | Side effects — localStorage sync, data fetching sim |
| **useContext** | Throughout | Accessing global state (theme, auth, bookings) |
| **useMemo** | Home filtering | Memoized computation — avoids re-filtering on every render |
| **useNavigate** | All pages | Programmatic navigation (e.g., after login) |
| **useParams** | MovieDetails, Booking | Reading URL parameters (`:id`) |
| **useLocation** | Booking, Login | Accessing route state (showtime data, redirect path) |
| **Context API** | 4 contexts | Global state management (`Auth`, `Theme`, `Booking`, `Toast`) |
| **Conditional Rendering** | Navbar, pages | Different UI based on auth state / loading |
| **HTML Canvas** | Confetti | Custom JS physics engine writing particle trails |
| **DOM Events** | Navbar Search | `onFocus`/`onBlur`/`onMouseDown` to handle dropdown bugs |
| **Array.map** | Movie grid, seats | Rendering lists of components |
| **Controlled Components** | Login, Signup | Form inputs controlled by React state |
| **Key prop** | Lists, routes | Helping React identify which items changed |

### 📂 Important Files

| File | Why It's Important |
|------|--------------------|
| `App.jsx` | Entry point — sets up routing and context providers |
| `ThemeContext.jsx` | Controls dark/light mode across entire app |
| `AuthContext.jsx` | Handles all authentication logic |
| `index.css` | Entire design system — colors, animations, components |
| `movies.json` | All mock movie data — no API dependency |
| `SeatMap.jsx` | Most complex interactive component |
| `Home.jsx` | Main page with search/filter + movie grid |

### 🔑 Key Code Snippets

#### 1. Context Provider Pattern
```jsx
// Creating context
const ThemeContext = createContext();

// Custom hook for consuming
export const useTheme = () => useContext(ThemeContext);

// Provider wrapping the app
<ThemeProvider>
  <App />
</ThemeProvider>
```

#### 2. localStorage Persistence
```jsx
const [isDark, setIsDark] = useState(() => {
  const saved = localStorage.getItem('cineverse_theme');
  return saved ? JSON.parse(saved) : true;
});

useEffect(() => {
  localStorage.setItem('cineverse_theme', JSON.stringify(isDark));
}, [isDark]);
```

#### 3. Dynamic Filtering with useMemo
```jsx
const filteredMovies = useMemo(() => {
  return movies.filter(movie => {
    if (filters.search && !movie.title.toLowerCase().includes(filters.search.toLowerCase()))
      return false;
    if (filters.genre && !movie.genre.includes(filters.genre))
      return false;
    return true;
  });
}, [movies, filters]);
```

#### 4. Route Parameters
```jsx
// Route definition
<Route path="/movie/:id" element={<MovieDetails />} />

// Reading in component
const { id } = useParams();
const movie = moviesData.find(m => m.id === parseInt(id));
```

### 📘 Theory Topics

#### 1. Single Page Application (SPA)
- Only one HTML page loads
- JavaScript dynamically swaps content
- React Router handles URL changes without page reload
- Faster transitions, app-like feel

#### 2. Virtual DOM
- React maintains a lightweight copy of the real DOM
- On state change → diffing algorithm finds minimal changes
- Only changed parts update in real DOM → performance!

#### 3. React Hooks
- Functions that let you use React features in functional components
- `useState` — state management
- `useEffect` — side effects (API calls, localStorage)
- `useContext` — access Context values
- `useMemo` — memoize expensive computations
- `useNavigate` — programmatic routing

#### 4. Context API
- Solves **prop drilling** problem
- Creates global state accessible from any component
- Pattern: `createContext()` → `Provider` → `useContext()`

#### 5. Client-Side Routing
- React Router intercepts link clicks
- Changes URL without server request
- Renders matching component for the route
- Supports dynamic params (`:id`), state passing, nested routes

#### 6. CSS Custom Properties (Variables)
- Declared in `:root` or specific selectors
- Can be changed at runtime (theme switching!)
- Syntax: `--name: value` → `var(--name)`

### ❓ Viva Questions & Answers

**Q1: What is React and why did you use it?**
> React is a JavaScript library by Facebook for building user interfaces. It uses a component-based architecture where UI is split into reusable pieces. I used it because:
> - Component reusability (MovieCard used for all movies)
> - Virtual DOM for performance
> - Hooks for clean state management
> - Large ecosystem and community support

**Q2: Explain the difference between `useState` and `useEffect`.**
> - `useState` manages component state (e.g., form inputs, selected seats)
> - `useEffect` handles side effects — things that happen outside rendering (e.g., saving to localStorage, simulating data fetching)
> - `useState` triggers re-renders; `useEffect` runs after render

**Q3: What is the Context API? Why did you use it instead of props?**
> Context API provides global state accessible from any component. Without it, I'd need prop drilling — passing theme/auth through 5+ component levels. Context gives `useTheme()`, `useAuth()`, `useBooking()` — any component calls them directly.

**Q4: How does your dark/light mode work?**
> - `ThemeContext` stores `isDark` boolean in state + localStorage
> - `useEffect` sets `document.body.setAttribute('data-theme', 'dark'/'light')`
> - All CSS uses `var(--bg)`, `var(--text)`, etc.
> - CSS has two blocks: `body[data-theme='dark']` and `body[data-theme='light']`
> - Changing attribute → all CSS variables switch → entire UI updates

**Q5: How does your authentication work? Is it secure?**
> It's frontend-only auth using localStorage. On signup, user data (including password) saves to `cineverse_users` array. On login, credentials are matched against stored data. Session is saved as `cineverse_user`. 
> **It is NOT secure** — passwords are in plain text. This is for demo purpose only. Real apps use bcrypt hashing, JWT tokens, and backend servers.

**Q6: What is `useMemo` and where did you use it?**
> `useMemo` memoizes (caches) the result of an expensive computation. It only recalculates when its dependencies change. I used it for filtering movies — without it, filtering would run on every render, even if filters haven't changed.

**Q7: Explain client-side routing in your app.**
> React Router DOM handles routing. `<BrowserRouter>` wraps the app. `<Routes>` contains `<Route path="/movie/:id" element={<MovieDetails />} />`. When URL changes, React Router matches the path and renders the component — no server request needed.

**Q8: How does your seat selection work?**
> SeatMap generates 8×12 grid. Some seats are randomly pre-booked. On click: if seat is booked → do nothing; if selected → deselect; if available and under max limit → select. Selected seats array is lifted to parent (BookingPage) via `onSeatToggle` callback.

**Q9: What is the Virtual DOM?**
> Virtual DOM is a lightweight JavaScript representation of the real DOM. When state changes, React creates a new virtual DOM tree, diffs it against the old one (reconciliation), and updates only the changed nodes in the real DOM. This is faster than direct DOM manipulation.

**Q10: Explain the difference between functional and class components.**
> - **Functional**: Plain JavaScript functions, use hooks for state/lifecycle. Simpler, modern.
> - **Class**: ES6 classes with `render()`, `this.state`, lifecycle methods like `componentDidMount`.
> - This project uses only functional components — industry standard since React 16.8+.

**Q11: What is Bootstrap? How did you use it?**
> Bootstrap is a CSS framework for responsive design. I used its grid system (`col-md-4`, `col-lg-3`), utility classes (`d-flex`, `gap-3`, `py-5`), and responsive breakpoints. Custom CSS overrides Bootstrap defaults for the CineVerse theme.

**Q12: How do you persist data without a backend?**
> Using the `localStorage` Web API. It stores key-value pairs as strings in the browser. I use `JSON.stringify()` to save objects and `JSON.parse()` to read them. Data persists until manually cleared or browser data is deleted.

**Q13: What is glassmorphism? Where did you use it?**
> Glassmorphism is a UI design trend that makes elements look like frosted glass. I used `backdrop-filter: blur(16px)` with semi-transparent backgrounds on cards and the navbar. It adds depth and a premium feel.

**Q14: Explain the component lifecycle in functional React.**
> - **Mounting**: Component function runs → returns JSX → DOM updates → `useEffect(() => {}, [])` runs
> - **Updating**: State/props change → function re-runs → DOM diffs → `useEffect` (with deps) runs
> - **Unmounting**: `useEffect` cleanup function runs → component removed from DOM

**Q15: What are controlled components?**
> Form elements (inputs, selects) whose values are controlled by React state. Value comes from `useState`, changes happen via `onChange` handler. This gives React full control over form data. All my login/signup forms are controlled components.

**Q16: How did you fix the Auto-Complete Search Bar bug? Why `onMouseDown` over `onClick`?**
> In my `Navbar.jsx`, if I used `onClick` for the dropdown suggestions, the search input's `onBlur` (when the user clicks away) would fire *first*, instantly hiding the suggestion list before the click could even register! By switching to `onMouseDown`, it fires synchronously right as the button is pressed down, guaranteeing the click triggers before the input loses focus.

**Q17: Why use the HTML5 `<canvas>` for animations over standard CSS?**
> Standard CSS `@keyframes` are great for simple transforms on a single DOM element. However, simulating physics like gravity and velocity for over 150 individual confetti particles at 60 Frames-Per-Second would generate thousands of DOM nodes and completely crash the browser's render engine. Using the HTML5 `<canvas>` allows us to draw directly to a single flattened bitmap, making complex physics extremely performant.

---

## 11. 🚀 HOW TO RUN

### Prerequisites
- **Node.js** (v18 or higher) — [download](https://nodejs.org)
- **npm** (comes with Node.js)

### Step-by-Step

```bash
# 1. Open terminal in project folder
cd "c:\Users\Ashish\Desktop\New folder\Web Programming\FET\BookMyShow"

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Vite will show the URL (usually http://localhost:5173)
```

### Usage Flow

```
1. Open the app → You see the Home page with movies
2. Click "Sign Up" → Create an account
3. Click "Login" → Login with your credentials
4. Click any movie card → View details
5. Select a showtime → Click "Book Now"
6. Select seats on the seat map → Review summary
7. Click "Confirm Booking" → See confirmation ticket
8. Click "My Bookings" in navbar → View/cancel bookings
9. Click the ☀️/🌙 button → Toggle dark/light mode
10. Use search bar + filters → Find specific movies
```

### Build for Production
```bash
npm run build     # Creates optimized build in /dist
npm run preview   # Preview the production build locally
```

---

## 🎯 FINAL SUMMARY

| Aspect | Status |
|--------|--------|
| ✅ Fully interactive | Every button, link, form works logically |
| ✅ Unique UI | Custom purple/green theme, glassmorphism, not a BookMyShow clone |
| ✅ Clean animations | Fade-in, hover, skeleton, page transitions |
| ✅ Beginner-friendly | Clean code, clear naming, comments where needed |
| ✅ Industry-level | Context API, useMemo, proper routing, responsive design |
| ✅ Viva-ready | 17 Q&As, theory topics, code snippets |
| ✅ No fake buttons | Everything is wired and functional |
| ✅ No backend needed | Mock JSON data + localStorage |

---

## 12. 📂 COMPLETE COMPONENT & FILE DICTIONARY

**`index.html`**
The root HTML template loaded by the browser. It imports Google Fonts (Outfit & Space Grotesk) and sets the responsive viewport meta-tag. The React app dynamically mounts into its `<div id="root">`.

**`package.json`** & **`vite.config.js`**
The project configuration files. `package.json` manages dependencies like React, React Router Dom, and Bootstrap while defining `npm run` scripts. `vite.config.js` drives the fast Vite build tool.

**`src/main.jsx`**
The React bootstrap file that mounts `<App />` into the DOM. It also imports the external Bootstrap CSS framework and our global `index.css` stylesheet for the entire application.

**`src/App.jsx`**
The master architectural component. It acts as the routing switcher (`<BrowserRouter>`, `<Routes>`) mapping all URLs, while nesting the entire application under global Context providers (`Theme`, `Auth`, `Toast`, `Booking`).

**`src/index.css`**
The global styling engine containing ~500 lines of custom CSS. It maps CSS Variables for both memory states (Dark and Light), structures component utility classes, and declares all `@keyframes` animations.

**`src/context/ThemeContext.jsx`**
A React Context holding the global `isDark` boolean. It persists the user's choice to `localStorage` and dynamically assigns `data-theme` to the HTML `body` to swap CSS variable trees.

**`src/context/AuthContext.jsx`**
Handles frontend pseudo-authentication. Contains `login`, `signup`, and `logout` methods while keeping the current `user` session in state and bound synchronously to browser `localStorage`.

**`src/context/BookingContext.jsx`**
A global data store saving all purchased ticket structures in an array. Contains an `addBooking` function triggered on Checkout, and `cancelBooking` used in the user's My Bookings dashboard.

**`src/context/ToastContext.jsx`**
Manages the global stack of notification popups. Exposes a `showToast(msg, type)` function that mounts styled popup alerts over the DOM using `createPortal`, and automatically un-mounts them after 3 seconds.

**`src/components/Navbar.jsx`**
The primary navigation header containing the site logo, Auth dropdowns, Theme toggle, and the advanced autocomplete global search bar. Built responsively to collapse into a mobile hamburger menu on small devices.

**`src/components/Footer.jsx`**
The global application footer. It houses secondary navigation maps (About Us, Contact), comprehensive terms and guidelines for ticket cancellation, and a fully functional newsletter toast-subscription input.

**`src/components/MovieCard.jsx`**
A highly reusable display component holding movie poster thumbnail logic. Contains hover-lift animations, overlay tags (Certificate/Trending), and maps inner `genre` arrays to visual pill styles.

**`src/components/MovieCarousel.jsx`** & **`src/components/EventCarousel.jsx`**
Horizontal, swipe-able grid collections built to showcase featured rows of elements without breaking vertical layouts. Tuned with customizable CSS `scroll-behavior` and dynamic auto-play timing props.

**`src/components/SeatMap.jsx`**
An interactive 8x12 grid generating SVG/CSS icons. Simulates a booking map by locking random seats on mount, keeping an array of selected coordinates, and validating the maximum user seat limit (10).

**`src/components/SkeletonCard.jsx`**
A UI placeholder grid mounted before data sets resolve. Renders animated grey pulsing boxes via CSS background gradient sweeps to simulate layout loading and reduce Cumulative Layout Shifts (CLS).

**`src/components/ConfettiAnimation.jsx`**
A robust HTML Canvas script rendering 150 particles. It handles raw Javascript physics calculations including `gravity`, `velocity`, `spins`, and `opacity fade` running at 60 fps inside `requestAnimationFrame`.

**`src/pages/Home.jsx`**
The default `/` route mapping the primary site landing page. Sets up the massive "hero" banner, loads the Trending / Recommendation carousels, and lays down the foundational navigation map.

**`src/pages/Movies.jsx`**
The dedicated full movie database grid mapped to `/movies`. Relies heavily on `useMemo` hooks to run real-time intersections of user queries filtering by `Title`, `Genre`, `Language`, and `Rating`.

**`src/pages/MovieDetails.jsx`**
Mapped dynamically to `/movie/:id`. Grabs the ID param and searches the JSON array to display deep meta-data, a large cinematic backdrop header, and generates specific clickable show-times.

**`src/pages/BookingPage.jsx`**
The secure checkout page. Extracts parameter queries from the URL, renders the `SeatMap` component, dynamically multiplies seat count times price, and completes orders through `BookingContext`.

**`src/pages/BookingConfirmation.jsx`**
The success route confirming ticket generation. Renders an aesthetic movie ticket SVG element displaying the `bookingId`, while initializing the Confetti engine effect upon mounting.

**`src/pages/MyBookings.jsx`**
The user's private dashboard tracking their historical ticket purchases. Scans the `BookingContext` and maps the objects into a clean, mobile-responsive list layout providing a localized "Cancel Booking" action button.

**`src/pages/Profile.jsx`**
A personalized profile card interface displaying the active user's details utilizing data stored on original registration. It computes real-time math summarizing their absolute total ticket spend across the platform by scanning the `BookingContext`.

**`src/pages/Login.jsx`** & **`src/pages/Signup.jsx`**
Strictly controlled form pages. They capture user inputs into local state elements and intercept `onSubmit` firing custom Javascript regex logic to validate email formats and confirm password parameter safety.

**`src/pages/CategoryPage.jsx`**
A dynamic re-usable skeleton mapping to routes like `/sports` or `/events`. Built explicitly to catch auxiliary interactions gracefully by rendering a customized generic banner block.

**`src/pages/ContactUs.jsx`** & **`src/pages/AboutUs.jsx`**
Secondary static pages routing detailed organizational information. They outline support contacts, mock company histories, location maps, and interactive form submissions utilizing `ToastContext`.

**`src/pages/NotFound.jsx`**
The final fallback `/*` catch-all route. Alerts users if they attempt to navigate to a page URL that does not exist in the React Router, and renders a stylized "404 Error" Return Home button.

**`src/data/movies.json`** & **`src/data/events.json`**
The static mock datasets replicating a backend MySQL/MongoDB response. They act as the central source of truth for all component logic holding structured arrays with strings, floats, arrays, and booleans.
