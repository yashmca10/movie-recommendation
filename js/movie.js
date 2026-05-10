const API_KEY = "0c1d38d8e756c7f61e213da5eb66d3df";

const params = new URLSearchParams(window.location.search);

const movieId = params.get("id");

// Fetch movie details + cast
fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`)

.then(response => response.json())

.then(movie => {

    // Get top 5 cast members
    const castNames = movie.credits.cast
    .slice(0,5)
    .map(actor => actor.name)
    .join(", ");

    // Poster image
    const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450";

    // Display movie details
    document.getElementById("movieDetails").innerHTML = `

        <div class="details-card">

            <img src="${poster}" alt="${movie.title}">

            <h1>${movie.title}</h1>

            <p><strong>Year:</strong> ${movie.release_date}</p>

            <p><strong>Rating:</strong> ${movie.vote_average}</p>

            <p><strong>Duration:</strong> ${movie.runtime} mins</p>

            <p><strong>Cast:</strong> ${castNames}</p>

            <p><strong>Overview:</strong> ${movie.overview}</p>

        </div>

    `;
})

.catch(error => {

    console.log(error);

    document.getElementById("movieDetails").innerHTML = `
        <h2>Failed to load movie details</h2>
    `;
});