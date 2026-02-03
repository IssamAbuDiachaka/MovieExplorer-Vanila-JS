/** OMDb API Key */
const apiKey = "bc11235e";

// STATE MANAGEMENT
/** Array to store movie titles in the watchlist */
let watchlist = [];

// DOM INITIALIZATION & EVENT LISTENERS
document.addEventListener("DOMContentLoaded", initializeEventListeners);

function initializeEventListeners() {
  // Search input - Enter key to search
  document.getElementById("search-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchMovies();
    }
  });

  // Watchlist clear button
  document
    .getElementById("clear-watchlist")
    .addEventListener("click", clearWatchlist);

  // Theme toggle button
  document
    .getElementById("toggle-theme")
    .addEventListener("click", toggleTheme);

  // Modal close button
  document.querySelector(".close-modal").addEventListener("click", closeModal);

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    const modal = document.getElementById("movie-modal");
    if (e.target === modal) {
      closeModal();
    }
  });

  // Initialize theme
  document.body.classList.add("dark-mode");
}

// SEARCH & DISPLAY FUNCTIONS

// Fetch movies from OMDb API and display results
function searchMovies() {
  const query = document.getElementById("search-input").value;
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;
  const heading = document.getElementById("available-movies-heading");
  const welcomeMessage = document.getElementById("welcome-message");

  // Show loading state
  document.getElementById("movie-results").innerHTML = "Searching...";
  heading.style.display = "none";
  welcomeMessage.style.display = "none";

  // Fetch data from API
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        displayMovies(data.Search);
      } else {
        document.getElementById("movie-results").innerHTML = "No movies found.";
        heading.style.display = "none";
      }
    })
    .catch(() => {
      document.getElementById("movie-results").innerHTML =
        "Error fetching data.";
      heading.style.display = "none";
    });
}

// Render movie cards to the DOM
function displayMovies(movies) {
  const resultsContainer = document.getElementById("movie-results");
  const heading = document.getElementById("available-movies-heading");

  resultsContainer.innerHTML = "";
  heading.style.display = "block";

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";

    const posterImg =
      movie.Poster !== "N/A"
        ? movie.Poster
        : "https://via.placeholder.com/150?text=No+Image";

    card.innerHTML = `
      <img src="${posterImg}" alt="${movie.Title}">
      <div class="movie-card-info">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        <button class="add-watchlist-btn">Add to Watchlist</button>
      </div>
    `;

    // Click card to show details (but not if clicking the button)
    card.addEventListener("click", (e) => {
      if (!e.target.classList.contains("add-watchlist-btn")) {
        showMovieDetails(movie.imdbID);
      }
    });

    // Add to watchlist button
    card.querySelector(".add-watchlist-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      addToWatchlist(movie.Title);
    });

    resultsContainer.appendChild(card);
  });
}

// Fetch and display full movie details in modal
function showMovieDetails(imdbID) {
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const modalBody = document.getElementById("modal-body");
      modalBody.innerHTML = `
        <div class="modal-movie-details">
          <h2>${data.Title}</h2>
          <p><strong>Plot:</strong> ${data.Plot}</p>
          <p><strong>Rating:</strong> ${data.imdbRating} ⭐</p>
          <p><strong>Actors:</strong> ${data.Actors}</p>
          <button onclick="addToWatchlist('${data.Title}')" class="modal-add-btn">Add to Watchlist</button>
        </div>
      `;
      document.getElementById("movie-modal").style.display = "block";
    });
}

// WATCHLIST MANAGEMENT

// Add movie to watchlist and refresh display
function addToWatchlist(movieTitle) {
  watchlist.push(movieTitle);
  renderWatchlist();
}

// Update watchlist display on the page
function renderWatchlist() {
  const watchlistContainer = document.getElementById("watchlist-items");
  watchlistContainer.innerHTML = "";

  watchlist.forEach((movie) => {
    const item = document.createElement("div");
    item.innerHTML = `<span>${movie}</span><button onclick="removeFromWatchlist('${movie}')">Remove</button>`;
    watchlistContainer.appendChild(item);
  });
}

// Remove movie from watchlist
function removeFromWatchlist(movieTitle) {
  const index = watchlist.findIndex((movie) => movie === movieTitle);
  if (index !== -1) {
    watchlist.splice(index, 1);
  }
  renderWatchlist();
}

// Clear entire watchlist
function clearWatchlist() {
  watchlist = [];
  renderWatchlist();
}

// UI UTILITIES

// Toggle between light and dark theme
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}

// Close movie details modal
function closeModal() {
  document.getElementById("movie-modal").style.display = "none";
}
