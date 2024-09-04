"use strict";

/* Event Listeners */

const fileButton = document.getElementById("moviefile");
const yearsFilter = document.getElementById("movie-year");
const directorFilter = document.getElementById("movie-director");
const orderFilter = document.getElementById("movie-order");
const moviePosters = document.getElementById("movie-posters");
let movies = [];

// Load movies from the selected file
fileButton.addEventListener("change", () => {
  const file = fileButton.files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    movies = JSON.parse(event.target.result).movies;
    updateMovieDisplay();
  };

  reader.readAsText(file);
});

// Filter by year
yearsFilter.addEventListener("change", updateMovieDisplay);

// Filter by director
directorFilter.addEventListener("change", updateMovieDisplay);

// Order by ascending/descending
orderFilter.addEventListener("change", updateMovieDisplay);

// Update the movie display based on selected filters
function updateMovieDisplay() {
  const selectedYear = yearsFilter.value;
  const selectedDirector = directorFilter.value;
  const sortOrder = orderFilter.value;

  let filteredMovies = movies.filter(movie => {
    const releaseYear = new Date(movie.releaseDate).getFullYear();
    return (selectedYear === "All Years" || releaseYear === parseInt(selectedYear)) &&
           (selectedDirector === "All Directors" || movie.director === selectedDirector);
  });

  if (sortOrder === "Descending") {
    filteredMovies.reverse();
  }

  renderMovies(filteredMovies);
}

// Render movies to the DOM
function renderMovies(movieList) {
  moviePosters.innerHTML = "";

  movieList.forEach(movie => {
    const movieElement = document.createElement("div");
    movieElement.className = "movie";

    const img = document.createElement("img");
    img.src = movie.posterUrl;
    img.alt = movie.title;

    movieElement.appendChild(img);
    moviePosters.appendChild(movieElement);
  });
}