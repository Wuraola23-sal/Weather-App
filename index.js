   /* apikey authenticates requests to the openweather api
   apiUrl is URL for the weather API requests, 
   where the city name and API key will be appended to retrieve data*/  

    const apiKey = "f9744fac76a3036befe5328220776dae";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

    //we reference the input box and search icon
    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");


       /* The function makes an asynchronous request to the OpenWeatherMap API using fetch(). 
       It appends the city name entered by the user to the API URL along with the API key.*/

    async function checkWeather(city) {

            const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
            //if the city is not found an error message is displayed
            if (response.status == 404){
                document.querySelector(".error").style.display = "block";
                document.querySelector(".weather").style.display = "none";
            //otherwise the city name weather humidity, temperature and icon are updated on screen
            } else {
                /* this is used to convert the response
                 from the fetch API call into a usable JavaScript object */
            const data = await response.json();
      

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

           // It determines the current weather conditions (e.g., Clouds, Clear, Rain) 
           // and updates the weatherIcon.src to the corresponding image.
            if(data.weather[0].main === "Clouds") {
              weatherIcon.src = "clouds.png";
            }
            else if(data.weather[0].main === "Clear")  {
                weatherIcon.src = "clear-removebg-preview.png";
            }
            else if(data.weather[0].main === "Rain")  {
                weatherIcon.src = "rain.jpg";
            }
            else if(data.weather[0].main === "Drizzle")  {
                weatherIcon.src = "drizzle.png";
            }
            else if(data.weather[0].main === "Mist")  {
                weatherIcon.src = "mist.jpg";
            }

            document.querySelector(".weather").style.display = "block"
            document.querySelector(".error").style.display = "none";
            
        } 
    
}

//An event listener is attached to the search button. When the button is clicked,
//it triggers the checkWeather function with the value entered in the search input field.
    searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value);
    });
