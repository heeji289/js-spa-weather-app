import WeatherService from '../api/weather';
import WeatherInfoCard from '../component/weather-info-card';
import Component from '../shared/component';

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
    this.$root.innerHTML = this.isLoading
      ? `<p>Loading...</p>` // TODO: skeleton UI 적용
      : this.isError
      ? `<p>Error...!</p>` // TODO: 재시도 버튼 추가
      : this.getTemplate();

    if (this.isLoading || this.isError) {
      return;
    }

    const $container = document.querySelector('main');
    $container.setAttribute('class', 'd-grid gap-4');
    $container.setAttribute('style', 'width: 350px');

    Object.entries(this.weatherDataList).map(([date, forecastList]) => {
      const $dateContainer = document.createElement('div');

      const $todayDate = document.createElement('h3');
      $todayDate.innerText = date;
      $todayDate.setAttribute('class', 'display-3 fw-semibold');

      const $forecastListContainer = document.createElement('div');
      $forecastListContainer.setAttribute('class', 'd-grid gap-4');

      forecastList.map((forecast) => {
        const $forecastCard = document.createElement('div');
        $forecastCard.setAttribute('class', 'border p-2');

        new WeatherInfoCard($forecastCard, null, { weatherData: forecast });
        const $time = document.createElement('h3');
        $time.setAttribute('class', 'display-6 fw-semibold');
        $time.innerText = forecast.dt_txt
          .split(' ')[1]
          .split(':')
          .slice(0, 2)
          .join(':');

        $forecastCard.prepend($time);

        $forecastListContainer.appendChild($forecastCard);
      });

      $dateContainer.appendChild($todayDate);
      $dateContainer.appendChild($forecastListContainer);

      $container.appendChild($dateContainer);
    });
  }

  async fetchData() {
    try {
      const result = await WeatherService.getWeatherForecasts('Seoul');
      const grouped = this.groupWeatherDataByDate(result);
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
