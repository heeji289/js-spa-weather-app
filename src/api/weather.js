const WeatherService = {
  API_URL: 'https://api.openweathermap.org/data/2.5',
  commonParam: {
    appid: import.meta.env.VITE_OPEN_WEATHER_API_KEY,
    units: 'metric',
  },

  getCurrentWeather: async function (cityname) {
    const params = {
      ...this.commonParam,
      q: cityname,
    };

    const result = await fetch(
      `${this.API_URL}/weather?${new URLSearchParams(params)}`
    );

    const data = await result.json();
    return data;
  },

  getWeatherForecasts: async function (cityname) {
    const params = {
      ...this.commonParam,
      q: cityname,
    };

    const result = await fetch(
      `${this.API_URL}/forecast?${new URLSearchParams(params)}`
    );

    const data = await result.json();
    return data.list;
  },
};

export default WeatherService;
