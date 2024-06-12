import weatherService from '../api/weather';
import WeatherInfoCard from '../component/weather-info-card';
import Component from '../shared/component';
import { convertTimestampToTime, createElement } from '../util';

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
    if (this.isLoading) {
      this.$root.innerHTML = '<p>Loading..</p>';
      return;
    }

    if (this.isError) {
      this.$root.innerHTML = /*html*/ `
        <div>
          <p>에러가 발생했습니다!</p>
          <button class="retry_button">재시도 🔄</button>
        </div>
      `;
      return;
    }

    this.$root.innerHTML = this.getTemplate();

    const $container = document.querySelector('.weather_list_page a');
    new WeatherInfoCard($container, null, { weatherData: this.weatherData });

    const $cityName = createElement('h2', {
      class: 'display-2 fw-bold',
    });
    $cityName.innerText = 'Seoul';

    const $time = createElement('h3', {
      class: 'display-6 fw-semibold',
    });
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
      const result = await weatherService.getCurrentWeather(this.params.name);
      this.weatherData = result;
    } catch (err) {
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }
}
