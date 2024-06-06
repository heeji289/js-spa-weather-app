import WeatherService from '../api/weather';
import Component from '../shared/component';
import { convertTimestampToTime } from '../util';

export default class WeatherDetailPage extends Component {
  constructor($root, params) {
    super($root, params);

    // state
    this.weatherDataList = [];
    this.isLoading = true;
    this.isError = false;

    this.init();
  }

  async init() {
    this.render();
    await this.fetchData();
    this.render();
  }

  getTemplate() {
    const WeatherCard = (weatherData) => /*html*/ `
      <h2>${convertTimestampToTime(weatherData.dt)}</h2>
      <p>현재: ${weatherData.main.temp} °C</p>
      <p>최저/최고: ${weatherData.main.temp_min} °C / ${
      weatherData.main.temp_max
    } °C</p>
      <img src="http://openweathermap.org/img/w/${
        weatherData.weather[0].icon
      }.png" />
    `;

    return /*html*/ `
      <h1>Weather Detail</h1>
      ${this.weatherDataList
        .map((data) => `<div>${WeatherCard(data)}</div>`)
        .join('')}
    `;
  }

  render() {
    this.$root.innerHTML = this.isLoading
      ? `<p>Loading...</p>` // TODO: skeleton UI 적용
      : this.isError
      ? `<p>Error...!</p>` // TODO: 재시도 버튼 추가
      : this.getTemplate();
  }

  async fetchData() {
    try {
      const result = await WeatherService.getWeatherForecasts('Seoul');
      this.weatherDataList = result;
    } catch (err) {
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }
}
