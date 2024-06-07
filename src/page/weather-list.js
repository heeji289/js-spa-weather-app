import WeatherService from '../api/weather';
import WeatherInfoCard from '../component/weather-info-card';
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
      <div class="weather_list_page d-grid gap-4 border" style="width: 350px">
        <a href="/weather/Seoul" style="color: inherit; text-decoration: none;"></a>
      </div>
    `;
  }

  render() {
    this.$root.innerHTML = this.isLoading
      ? `<p>Loading...</p>` // TODO: skeleton UI 적용
      : this.isError
      ? /*html*/ `
        <p>
          <p>에러가 발생했습니다!</p>
          <button class="retry_button">재시도 🔄</button>
        </p>
      `
      : this.getTemplate();

    if (this.isLoading || this.isError) {
      return;
    }

    const $container = document.querySelector('.weather_list_page a');
    new WeatherInfoCard($container, null, { weatherData: this.weatherData });

    const $cityName = document.createElement('h2');
    $cityName.setAttribute('class', 'display-2 fw-bold');
    $cityName.innerText = 'Seoul';
    const $time = document.createElement('h3');
    $time.setAttribute('class', 'display-6 fw-semibold');
    $time.innerText = convertTimestampToTime(this.weatherData.dt);

    $container.prepend($time);
    $container.prepend($cityName);
  }

  addEvent() {
    if (this.isError) {
      const $retryButton = document.querySelector('.retry_button');
      $retryButton.addEventListener('click', async (e) => {
        this.isLoading = true;

        this.render();
        await this.fetchWeather();
        this.render();
      });
    }
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
