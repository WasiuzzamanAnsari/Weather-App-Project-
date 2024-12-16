**Weather Forecast Application**
This is a Weather Forecast application built with HTML, CSS (using Tailwind CSS), and JavaScript. The application allows users to search for weather forecasts based on city names, view weather for their live location, and get extended 5-day forecasts. It fetches data from the OpenWeather API and provides a responsive and user-friendly interface.

**Features**
1. Search by City Name: Allows users to search the weather for any city.
2. Live Location Weather: Automatically fetches the weather for the user's current location using geolocation.
3. Recent Searches Dropdown: Displays a dropdown of recently searched cities (stored in localStorage).
4. Extended 5-Day Forecast: Displays a 5-day weather forecast, including temperature, humidity, and wind speed for each day.
5. Weather Icons: Visual representation of the weather conditions (sunny, cloudy, rainy, etc.).
6. Error Handling: Gracefully handles errors (invalid city, no geolocation access, etc.).
7. Responsive Design: Ensures the application is usable on all devices (desktop, tablet, and mobile).


**Tech Stack**
 *Frontend:*
1. HTML5
2. CSS (Tailwind CSS)
3. JavaScript
4. Weather API:
5. OpenWeather API


**Application Overview**
1. Weather Search by City Name:
Users can type the name of a city into the search bar and press the search button.
The weather for that city (temperature, humidity, wind speed) will be fetched from the OpenWeather API and displayed.

2. Weather by Live Location:
The app fetches weather data automatically for the user's current location using the browser's geolocation API.

3. Recent Searches Dropdown:
Cities that the user has searched for previously are stored in localStorage.
The user can select any recent city from a dropdown to fetch its weather data again.

4. 5-Day Weather Forecast:
The app fetches a 5-day weather forecast showing temperature, humidity, and wind speed for each day.

5. Weather Icons:
The weather conditions are represented by appropriate icons (sunny, cloudy, rainy, etc.) fetched from the OpenWeather API.
6. Error Handling
If the city is not found, an error message is shown.
If the user denies geolocation access, an appropriate error message is displayed.

7. Responsive Design:
The layout adjusts based on the device screen size, ensuring a smooth user experience on desktops, tablets, and mobiles.



**Development**
If you want to contribute to this project or improve it, feel free to fork it and create a pull request with your changes. Here are some possible improvements:

1. Add more detailed weather data (e.g., air pressure, UV index, etc.).
2. Integrate with additional APIs for richer data or features.
3. Add a dark mode feature for the UI.
4. Improve UI/UX with animations or transitions.

**GitHub LINK**



**License**
This project is open-source and available under the MIT License.