const API_KEY = "0c1d38d8e756c7f61e213da5eb66d3df";

// Get URL parameters
const params = new URLSearchParams(window.location.search);

const language = params.get("lang");
const genre = params.get("genre");
const year = params.get("year");

// TMDb Discover API URL
const url =
`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=${language}&with_genres=${genre}&primary_release_year=${year}`;

// Fetch movies
fetch(url)

.then(response => response.json())

.then(data => {

    const moviesDiv = document.getElementById("movies");

    // Clear old content
    moviesDiv.innerHTML = "";

    // If no movies found
    if(data.results.length === 0){

        moviesDiv.innerHTML = `
            <h2>No movies found 😢</h2>
        `;

        return;
    }

    // Sort movies by rating (High → Low)
    data.results.sort((a,b) => b.vote_average - a.vote_average);

    // Display movies
    data.results.forEach(movie => {

        // Poster image
        const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/300x450";

        // Movie card
        const movieCard = `

            <div class="movie-card">

                <img src="${poster}" alt="${movie.title}">

                <h2>${movie.title}</h2>

                <p>⭐ Rating: ${movie.vote_average}</p>

                <p>📅 Release: ${movie.release_date}</p>

                <a href="movie.html?id=${movie.id}">
                    🎬 Get Details
                </a>

            </div>

        `;

        moviesDiv.innerHTML += movieCard;

    });

})

.catch(error => {

    console.log(error);

    document.getElementById("movies").innerHTML = `
        <h2>Something went wrong 😢</h2>
    `;

});