const countryDetails = document.getElementById("country-details");
const params = new URLSearchParams(window.location.search);
const countryCode = params.get("code");
let countriesData = [];

 function goHome() {
   window.location.href = "app.html"; // or index.html depending on your file name
 }
 
async function fetchCountry() {
  const res = await fetch("data.json");
  countriesData = await res.json();

  const country = countriesData.find((c) => c.alpha3Code === countryCode);

  if (!country) {
    countryDetails.innerHTML = `<p>Country not found</p>`;
    return;
  }

  const bordersHTML =
    country.borders
      ?.map((code) => {
        const borderCountry = countriesData.find((c) => c.alpha3Code === code);
        return `<button onclick="viewCountry('${code}')">${
          borderCountry?.name || code
        }</button>`;
      })
      .join("") || "No borders";

  countryDetails.innerHTML = `
    <img src="${country.flags.svg}" alt="${country.name}">
    <div class="info">
        <h2>${country.name}</h2>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Subregion:</strong> ${country.subregion}</p>
        <p><strong>Capital:</strong> ${country.capital}</p>
        <p><strong>Top Level Domain:</strong> ${country.topLevelDomain.join(
          ", "
        )}</p>
        <p><strong>Currencies:</strong> ${country.currencies
          .map((c) => c.name)
          .join(", ")}</p>
        <p><strong>Languages:</strong> ${country.languages
          .map((l) => l.name)
          .join(", ")}</p>
        <div class="borders">
            <h3>Border Countries:</h3>
            ${bordersHTML}
        </div>
    </div>
`;
}

function viewCountry(code) {
  window.location.href = `country.html?code=${code}`;
}

fetchCountry();
