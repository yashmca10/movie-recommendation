const yearSelect = document.getElementById("year");

// Add years dynamically
for(let year = 2026; year >= 1980; year--){
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
}

document.getElementById("movieForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    const language = document.getElementById("language").value;
    const genre = document.getElementById("genre").value;
    const year = document.getElementById("year").value;

    window.location.href =
    `results.html?lang=${language}&genre=${genre}&year=${year}`;

});