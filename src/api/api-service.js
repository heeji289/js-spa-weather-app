export default class ApiService {
  constructor() {
    this.API_URL = 'https://api.openweathermap.org/data/2.5';
    this.commonParam = {
      appid: import.meta.env.VITE_OPEN_WEATHER_API_KEY,
      units: 'metric',
    };
  }

  async get(endpoint, params) {
    const newParam = {
      ...this.commonParam,
      ...params,
    };

    const result = await fetch(
      `${this.API_URL}/${endpoint}?${new URLSearchParams(newParam)}`
    );

    const data = await result.json();
    return data;
  }
}
