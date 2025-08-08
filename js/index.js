const countriesContainer = document.getElementById("countries-container");
const searchInput = document.getElementById("search");
const regionFilter = document.getElementById("region-filter");

let countriesData = [];

// Fetch local JSON
async function fetchCountries() {
  const res = await fetch("data.json");
  countriesData = await res.json();
  displayCountries(countriesData);
}

function displayCountries(countries) {
  countriesContainer.innerHTML = countries
    .map(
      (country) => `
        <div class="country-card" onclick="viewCountry('${
          country.alpha3Code
        }')">
            <img src="${country.flags.svg}" alt="${country.name}">
            <h3>${country.name}</h3>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Capital:</strong> ${country.capital}</p>
        </div>
    `
    )
    .join("");
}

function viewCountry(code) {
  window.location.href = `country.html?code=${code}`;
}

// Search
searchInput.addEventListener("input", (e) => {
  const value = (e.target.value || "").trim().toLowerCase();
  const filtered = countriesData.filter((c) =>
    c.name.toLowerCase().includes(value)
  );
  displayCountries(filtered);
});

// Filter
regionFilter.addEventListener("change", (e) => {
  const value = e.target.value;
  const filtered = value
    ? countriesData.filter((c) => c.region === value)
    : countriesData;
  displayCountries(filtered);
});

fetchCountries();
