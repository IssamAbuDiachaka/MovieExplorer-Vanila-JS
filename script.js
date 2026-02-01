// API key for OMDb
const apiKey = "bc11235e";
// Array to store movie titles that user wants to watch later
let watchlist = [];

// Event listener: Triggers movie search when user presses Enter key in search input
document.getElementById("search-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchMovies();
  }
});

// Event listener: Switches between light and dark theme when toggle button is clicked
document.getElementById("toggle-theme").addEventListener("click", toggleTheme);

/**
 * searchMovies() - Main search function that fetches movies from OMDb API
 * How it works:
 * 1. Gets the search query from input field
 * 2. Constructs API URL with the query and API key
 * 3. Shows "Searching..." message and hides welcome/heading elements
 * 4. Makes HTTP request to OMDb API using fetch()
 * 5. Converts response to JSON format
 * 6. If movies found (Response === "True"), displays them via displayMovies()
 * 7. If no movies found or error occurs, shows appropriate message
 */
function searchMovies() {
  const query = document.getElementById("search-input").value;
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;
  const heading = document.getElementById("available-movies-heading");
  const welcomeMessage = document.getElementById("welcome-message");
  
  // Show loading message while fetching data
  document.getElementById("movie-results").innerHTML = "Searching...";
  heading.style.display = "none";
  welcomeMessage.style.display = "none";

  // Fetch data from OMDb API (asynchronous operation)
  fetch(url)
    .then((response) => response.json()) // Convert response to JSON
    .then((data) => {
      // Check if API returned successful response
      if (data.Response === "True") {
        displayMovies(data.Search); // data.Search contains array of movies
      } else {
        // No movies found for the search query
        document.getElementById("movie-results").innerHTML = "No movies found.";
        heading.style.display = "none";
      }
    })
    .catch(() => {
      // Handle any network or API errors
      document.getElementById("movie-results").innerHTML = "Error fetching data.";
      heading.style.display = "none";
    });
}

/**
 * displayMovies(movies) - Renders movie cards on the page
 * - Array of movie objects from API response
 * How it works:
 * 1. Clears previous search results
 * 2. Shows the "Available Movies" heading
 * 3. Loops through each movie in the array
 * 4. Creates a card (div) for each movie with poster, title, year, and button
 * 5. Handles missing posters by using placeholder image
 * 6. Appends each card to the results container
 */
function displayMovies(movies) {
  const resultsContainer = document.getElementById("movie-results");
  const heading = document.getElementById("available-movies-heading");
  
  // Clear any previous search results to avoid mixing old and new results
  resultsContainer.innerHTML = "";
  // Show the heading now that we have results
  heading.style.display = "block";

  // Loop through each movie and create a card for it
  movies.forEach((movie) => {
    // Create a new div element for the movie card
    const card = document.createElement("div");
    card.className = "movie-card"; // Add CSS class for styling

    // Check if movie has a poster image, if not use placeholder
    // API returns "N/A" string when poster is not available
    const posterImg =
      movie.Poster !== "N/A"
        ? movie.Poster
        : "https://via.placeholder.com/150?text=No+Image";

    // Build the HTML content for the card with poster, title, year, and button
    card.innerHTML = `
      <img src="${posterImg}" alt="${movie.Title}">
      <div class="movie-card-info">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        <button onclick="addToWatchlist('${movie.Title}')">Add to Watchlist</button>
      </div>
    `;
    // Add the completed card to the results container
    resultsContainer.appendChild(card);
  });
}


function addToWatchlist(movieTitle) {
  watchlist.push(movieTitle); // Add movie title to the array
  renderWatchlist(); // Refresh the watchlist display
}


function renderWatchlist() {
  const watchlistContainer = document.getElementById("watchlist-items");
  // Clear existing watchlist items to avoid duplicates
  watchlistContainer.innerHTML = "";
  
  // Loop through each movie in the watchlist array
  watchlist.forEach((movie) => {
    // Create a new div for each watchlist item
    const item = document.createElement("div");
    
    // Add movie title and a remove button
    item.innerHTML = `<span>${movie}</span><button onclick="removeFromWatchlist('${movie}')">Remove</button>`;
    watchlistContainer.appendChild(item);
  });
}


function removeFromWatchlist(movieTitle) {
  // Find the index of the movie in the watchlist array
  const index = watchlist.findIndex((movie) => movie === movieTitle);
  // If movie exists in watchlist (index is not -1), remove it
  if (index !== -1) {
    watchlist.splice(index, 1); // Remove 1 item at the found index
  }
  renderWatchlist(); // Refresh the display
}


function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}

// Initialize: Add dark-mode class on page load so toggle works correctly
// Since CSS uses :not(.dark-mode) for light mode, we start with the class
document.body.classList.add("dark-mode");

function clearWatchlist() {
  watchlist = []; // Empty the array
  renderWatchlist(); // Update the display
}
