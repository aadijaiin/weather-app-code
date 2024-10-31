import React, { useState, useEffect } from 'react';
require('dotenv').config()

const WeatherCard = () => {
  const [city, setCity] = useState('Delhi');
  const [temp, setTemp] = useState('');
  const [date, setDate] = useState('');
  const [aqi, setAqi] = useState('');
  const [humidity, setHumidity] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [cityname, setCityname] = useState('');
  const [description,setDescription] = useState('')
  // const [time, setTime] = useState('');
  const api_key = process.env.API_KEY
  // Fetch weather data function
   const fetchWeatherData = async () => {
    await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${API_KEY}`)
      .then(res => res.json())
      .then((data) => {
        setTemp(data.data[0].temp);
        setDate(data.data[0].datetime);
        setAqi(data.data[0].aqi);
        setHumidity(data.data[0].rh);
        setLatitude(data.data[0].lat);
        setLongitude(data.data[0].lon);
        setSunrise(data.data[0].sunrise);
        setSunset(data.data[0].sunset);
        setCityname(data.data[0].city_name);
        setDescription(data.data[0].weather.description)
    
    });
  };

  // Handle input change
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  // Handle key press for Enter key
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchWeatherData();
    }
  };

  // Fetch default weather data when component mounts
  useEffect(() => {
    fetchWeatherData();
  }, []); // Empty dependency array means it runs once when component mounts

  return (
    <div>
      <div className="flex items-center bg-gray-100 rounded-md shadow-md p-2 max-w-md mx-auto my-32">
        <input
          type="text"
          className="w-full px-4 py-2 bg-white border-none rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search City..."
          value={city} // Bind input to city state
          onChange={handleInputChange}
          onKeyDown={handleKeyPress} // Listen for Enter key press
        />
        <button
          onClick={fetchWeatherData} // Fetch weather data on button click
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-r-md hover:bg-blue-600 transition duration-200"
        >
          🔍
        </button>
      </div>

      <div className="bg-rich-bluish-gray text-white rounded-lg p-6 shadow-lg max-w-2xl mx-auto flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 backdrop-blur-md scale-[1.35]">
        {/* Left Section with City and Date-Time */}
        <div className="flex flex-col justify-between w-full sm:w-1/3">
          <h2 className="text-3xl font-bold mb-2">{cityname} 🌆</h2>
          <p className="text-sm">{date} 📅</p>
           <p className="text-sm">{description} </p>
          
        </div>

        {/* Right Section with Weather Details */}
        <div className="grid grid-cols-2 gap-4 w-full sm:w-2/3">
          <div className="flex items-center">
            <span className="text-2xl">🌡️</span>
            <div className="ml-2">
              <p className="text-sm font-semibold">Temperature</p>
              <p>{temp}°C</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-2xl">💨</span>
            <div className="ml-2">
              <p className="text-sm font-semibold">AQI</p>
              <p>{aqi}</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-2xl">💧</span>
            <div className="ml-2">
              <p className="text-sm font-semibold">Humidity</p>
              <p>{humidity}%</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-2xl">📍</span>
            <div className="ml-2">
              <p className="text-sm font-semibold">Location</p>
              <p>{latitude}, {longitude}</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-2xl">🌅</span>
            <div className="ml-2">
              <p className="text-sm font-semibold">Sunrise</p>
              <p>{sunrise}</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-2xl">🌇</span>
            <div className="ml-2">
              <p className="text-sm font-semibold">Sunset</p>
              <p>{sunset}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

