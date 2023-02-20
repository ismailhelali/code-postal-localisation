const form = document.querySelector('form');
const postalCodeInput = document.getElementById('postal-code');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const postalCode = postalCodeInput.value;
  if (postalCode.length !== 5) {
    resultDiv.innerHTML = '<p>Please enter a valid 5-digit postal code.</p>';
  } else {
    const url = `https://nominatim.openstreetmap.org/search?postalcode=${postalCode}&country=Morocco&format=json`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          resultDiv.innerHTML = '<p>No results found.</p>';
        } else {
          const lat = data[0].lat;
          const lon = data[0].lon;
          const displayName = data[0].display_name;
          resultDiv.innerHTML = `
            <p>Postal code: ${postalCode}</p>
            <p>Location: ${displayName}</p>
            <p>Latitude: ${lat}</p>
            <p>Longitude: ${lon}</p>
          `;
        }
      })
      .catch(error => {
        resultDiv.innerHTML = `<p>An error occurred: ${error.message}</p>`;
      });
  }
});
