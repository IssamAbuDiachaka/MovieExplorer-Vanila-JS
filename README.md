# MovieExplorer 🎬

A sleek, modern movie discovery web application that lets you search for movies, series, and actors using the OMDb API. Built with vanilla JavaScript, HTML, and CSS.

## Features

- **Real-time Search**: Search for movies, TV series, and actors instantly
- **Watchlist Management**: Add movies to your personal watchlist and manage them easily
- **Theme Toggle**: Switch between dark and light modes for comfortable viewing
- **Responsive Design**: Clean, modern UI with smooth animations and transitions
- **OMDb Integration**: Powered by the Open Movie Database API

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for API calls

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start searching for movies!

No build process or dependencies required - just open and use.

## Usage

1. **Search**: Type a movie, series, or actor name in the search bar and press Enter
2. **Add to Watchlist**: Click "Add to Watchlist" on any movie card
3. **Manage Watchlist**: View your saved movies in the right sidebar
4. **Remove Items**: Click "Remove" next to any watchlist item to delete it
5. **Clear All**: Use "Clear Watchlist" to remove all items at once
6. **Toggle Theme**: Click "Change Theme" in the header to switch between dark and light modes

## Project Structure

```
├── index.html      # Main HTML structure
├── script.js       # JavaScript functionality and API integration
├── styles.css      # Styling and theme definitions
└── README.md       # Project documentation
```

## API

This project uses the [OMDb API](http://www.omdbapi.com/) for fetching movie data. The API key is included in the code for demonstration purposes.

## Technologies Used

- HTML5
- CSS3 (with CSS transitions and flexbox)
- Vanilla JavaScript (ES6+)
- OMDb API

## Features in Detail

### Search Functionality

- Fetches data from OMDb API based on user input
- Displays movie posters, titles, and release years
- Handles missing posters with placeholder images
- Shows appropriate messages for no results or errors

### Watchlist

- Stores movies in a JavaScript array
- Dynamically renders watchlist items
- Allows individual item removal
- Includes bulk clear functionality

### Theme System

- Dark mode (default)
- Light mode
- Smooth transitions between themes
- Persists across all UI elements

## Browser Support

Works on all modern browsers that support ES6+ JavaScript features.

## License

This project is open source and available for educational purposes.

## Acknowledgments

- Movie data provided by [OMDb API](http://www.omdbapi.com/)
- Icons and design inspired by modern streaming platforms
