async function fetchData(locationName) {
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=b161feb1f1984ff7b5702936233012&q=${locationName}&days=3`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error; // Re-throw the error for further handling if needed
  }
}
searchWeather("cairo")
searchWeather()
async function searchWeather(location) {
  try {
    const data = await fetchData(location);

    // Perform actions with the fetched data
    console.log('Fetched weather data:', data);

    // Save data to local storage
    localStorage.setItem('fetchedData', JSON.stringify(data));
    console.log('Data saved to local storage:', data);

    // Display all forecast days
    displayAll(data.forecast.forecastday);

    // Get the current condition from the first day of the forecast (you may adjust this based on your data structure)
    const currentCondition = data.forecast.forecastday[0].day.condition.text;

    // Update body background based on the current condition
    bg(currentCondition);
  } catch (error) {
    // Handle errors here
    console.error('Error fetching weather data:', error);
  }
}

// Example usage
document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  const searchInput = document.getElementById('searchInput');

  searchButton.addEventListener('click', () => {
    const location = searchInput.value.trim();
    if (location) {
      searchWeather(location);
    } else {
      console.error('Please enter a valid location.');
    }
  });
});

function displayAll(locationName) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let cartoona = "";

  for (let i = 0; i < locationName.length; i++) {
    const dayData = locationName[i];

    cartoona += `
    
    <div class="col-md-4 text-center  ">
      <div class="forecast text-white">

        <div class="forecast-header bg-dark cus ">
          <div class="day">
            <i class="fas fa-calendar-alt"></i> ${days[new Date(dayData.date.replace(" ", "T")).getDay()]}
          </div>
        </div>
        <div class"card">
        <div class="forecast-content custom bg-gradient shadow fw-bolder ">
          <div class="forecast-icon">
            <img src="https:${dayData.day.condition.icon}" alt width=48>
          </div>
          <div class="degree">${dayData.day.maxtemp_c}<sup>o</sup>C</div>
          <small>${dayData.day.mintemp_c}<sup>o</sup></small>
          <div class="">${dayData.day.condition.text}</div>
        </div>
      </div>
      </div>
    </div>`;
  }

  document.getElementById("forecast").innerHTML = cartoona;
  
}
// ...

function bg(condition) {
  const body = document.body;

  // Assuming the condition includes clear information about day/night
  const checkDay = condition.toLowerCase();

  if (checkDay === "cloudy") {
    body.style.backgroundImage = 'url(css/cloudy.jpg)';
  } else if (checkDay === "sunny") {
    body.style.backgroundImage = 'url(css/sunny.jpg)';
  } else if (checkDay === "rainy") {
    body.style.backgroundImage = 'url(css/rainy.jpg)';
  } else if (checkDay === "clear") {
    body.style.backgroundImage = 'url(css/clear.jpg)';
  } else if (checkDay === "moderate rain") {
    body.style.backgroundImage = 'url(css/rainy.jpg)';
  } 
   else if (checkDay === "Patchy rain possible") {
    body.style.backgroundImage = 'url(css/rainy.jpg)';
  } else {
    body.style.backgroundColor = 'black';
    console.warn('Unrecognized condition:', checkDay);
    body.style.backgroundImage = 'url(css/default.jpg)';
  }
}



