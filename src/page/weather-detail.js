import weatherService from '../api/weather';
import WeatherInfoCard from '../component/weather-info-card';
import Component from '../shared/component';
import { createElement } from '../util';

export default class WeatherDetailPage extends Component {
  constructor($root, params) {
    super($root, params);

    // state
    this.weatherDataList = {};
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
      <h1 class="display-2 fw-bold">⛅️ ${this.params.name} 기상예보</h1>
      <main></main>
    `;
  }

  render() {
    if (this.isLoading) {
      this.$root.innerHTML = '<p>Loading...</p>';
      return;
    }

    if (this.isError) {
      this.$root.innerHTML = '<p>Error...!</p>';
      return;
    }

    this.$root.innerHTML = this.getTemplate();

    const $container = document.querySelector('main');
    $container.setAttribute('class', 'd-grid gap-4');
    $container.setAttribute('style', 'width: 350px');

    Object.entries(this.weatherDataList).map(([date, forecastList]) =>
      this.renderForecastPerDate(date, forecastList)
    );
  }

  renderForecastPerDate(date, forecastList) {
    const $container = document.querySelector('main');

    const $dateContainer = createElement('div');

    const $todayDate = createElement('h3', {
      class: 'display-3 fw-semibold',
    });
    $todayDate.innerText = date;

    const $forecastListContainer = createElement('div', {
      class: 'd-grid gap-4',
    });

    forecastList.map((forecast) =>
      this.renderForecastItem($forecastListContainer, forecast)
    );

    $dateContainer.appendChild($todayDate);
    $dateContainer.appendChild($forecastListContainer);

    $container.appendChild($dateContainer);
  }

  renderForecastItem($parent, forecast) {
    const $forecastCard = createElement('div', {
      class: 'border p-2',
    });

    const time = forecast.dt_txt.split(' ')[1].split(':').slice(0, 2).join(':');

    new WeatherInfoCard($forecastCard, null, {
      weatherData: forecast,
      title: time,
    });

    $parent.appendChild($forecastCard);
  }

  async fetchData() {
    try {
      const result = await weatherService.getWeatherForecasts(this.params.name);
      const grouped = this.groupWeatherDataByDate(result.list);
      this.weatherDataList = grouped;
    } catch (err) {
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }

  groupWeatherDataByDate(data) {
    return data.reduce((acc, current) => {
      const date = current.dt_txt.split(' ')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(current);
      return acc;
    }, {});
  }
}
