document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const city = document.getElementById('cityInput').value;
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.cod === 200) {
            let forecastHtml = `<h2>${data.city.name}, ${data.city.country}</h2>`;
            
            data.list.foreEach(forecast => {
                const date = new Date(forecast.dt * 1000);
                const dateString = date.toLocaleDateString();
                const timeString = date.toLocaleDateString();
                
                forecastHtml += `
                <div class="forecast">
                <p><strong>${dateString} ${timeString}</strong></p>
                <p>Temperature: ${forecast.main.temp} °C</p>
                <p>Weather: ${forecast.weather[0].description}</p>
                <p>Humidity: ${forecast.main.humidity} %</p>
                <p>Wind Speed: ${forecast.wind.speed} m/s</p>
                </div>
                `;
            });
            document.getElementById('weatherResult').innerHTML = forecastHtml;
        } else {
            document.getElementById('weatherResult').innerHTML = '<p>City not found. Please try again.</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        document.getElementById('weatherResult').innerHTML = '<p>Something went wrong. Please try again later.</p>';
    });
});
