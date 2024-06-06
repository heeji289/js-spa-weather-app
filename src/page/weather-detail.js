import WeatherService from '../api/weather';
import WeatherInfoCard from '../component/weather-info-card';
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
    return /*html*/ `
      <h1>Weather Detail</h1>
      <div class="container"></div>
    `;
  }

  render() {
    this.$root.innerHTML = this.isLoading
      ? `<p>Loading...</p>` // TODO: skeleton UI 적용
      : this.isError
      ? `<p>Error...!</p>` // TODO: 재시도 버튼 추가
      : this.getTemplate();

    if (this.isLoading || this.isError) {
      return;
    }

    const $container = document.querySelector('.container');

    this.weatherDataList.forEach((data) => {
      const $parent = document.createElement('div');

      $container.appendChild($parent);
      new WeatherInfoCard($parent, null, {
        weatherData: data,
      });
      const $child = document.createElement('h2');
      $child.innerHTML = convertTimestampToTime(data.dt);
      $parent.prepend($child);
    });
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
