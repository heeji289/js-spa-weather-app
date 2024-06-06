import WeatherService from '../api/weather';
import Component from '../shared/component';
import { convertTimestampToTime } from '../util';

export default class WeatherListPage extends Component {
  constructor($root, params) {
    super($root, params);

    // state
    this.weatherData = null;
    this.isLoading = true;
    this.isError = false;

    this.init();
  }

  async init() {
    this.render(); // 초기 렌더링
    await this.fetchWeather();
    this.render();
    this.addEvent();
  }

  getTemplate() {
    return /*html*/ `
      <div>
        <a href="/weather/Seoul">
          <h1>${this.weatherData.name}</h1>
          <h2>${convertTimestampToTime(this.weatherData.dt)}</h2>
          <p>현재: ${this.weatherData.main.temp} °C</p>
          <p>최저/최고: ${this.weatherData.main.temp_min} °C / ${
      this.weatherData.main.temp_max
    } °C</p>
          <img src="http://openweathermap.org/img/w/${
            this.weatherData.weather[0].icon
          }.png" />
        </a>
      </div>
    `;
  }

  render() {
    this.$root.innerHTML = this.isLoading
      ? `<p>Loading...</p>` // TODO: skeleton UI 적용
      : this.isError
      ? `<p>Error...!</p>` // TODO: 재시도 버튼 추가
      : this.getTemplate();
  }

  async fetchWeather() {
    try {
      const result = await WeatherService.getCurrentWeather('Seoul');
      this.weatherData = result;
    } catch (err) {
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }
}
