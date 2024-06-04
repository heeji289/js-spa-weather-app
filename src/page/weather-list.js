import router from '../main.js';
import { weatherData } from '../mock/weather-data.js';

export default class WeatherListPage {
  constructor($root) {
    this.$root = $root;
    this.weatherData = null; // state
    this.isLoading = true;

    this.init();
  }

  async init() {
    this.render(); // 초기 렌더링
    await this.fetchWeather();
    this.render();
    this.addEvent();
  }

  getTemplate(weatherData) {
    return /*html*/ `
      <div style="border: 1px solid black;" class="weather_card">
        <h1>${weatherData.name}</h1>
        <p>현재: ${weatherData.main.temp} K</p>
        <p>최저/최고: ${weatherData.main.temp_min} K / ${weatherData.main.temp_max} K</p>
      </div>
    `;
  }

  render() {
    this.$root.innerHTML = this.isLoading
      ? `<p>Loading...</p>` // TODO: skeleton UI 적용
      : this.getTemplate(this.weatherData);
  }

  addEvent() {
    const $weatherCard = document.querySelector('.weather_card');
    $weatherCard.addEventListener('click', (e) => {
      router.navigate('/detail');
    });
  }

  async fetchWeather() {
    await sleep(1000); // 비동기 흉내를 위한 delay
    this.weatherData = weatherData;
    this.isLoading = false;
  }
}

// TODO: 임시함수, API 연동 후 제거
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
