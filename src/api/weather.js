import ApiService from './api-service';

class WeatherService extends ApiService {
  async getCurrentWeather(cityname) {
    const result = await this.get('weather', { q: cityname });
    return result;
  }

  async getWeatherForecasts(cityname) {
    const result = await this.get('forecast', { q: cityname });
    return result;
  }
}

const weatherService = new WeatherService();

export default weatherService;
