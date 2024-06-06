import Component from '../shared/component';

export default class WeatherInfoCard extends Component {
  constructor($root, params, props) {
    super($root, params);
    this.props = props; // {weatherData: null}
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    this.$root.innerHTML = /*html*/ `
      <div class="d-flex align-items-center">
        <img src="http://openweathermap.org/img/w/${this.props.weatherData.weather[0].icon}.png" />
        <div class="d-flex flex-column justify-content-between gap-1">
          <p>
            <p class="fw-semibold">현재</p>
            <p>${this.props.weatherData.main.temp} °C</p>
          </p>
          <p>
            <p class="fw-semibold">최저/최고</p>
            <p>${this.props.weatherData.main.temp_min} °C / ${this.props.weatherData.main.temp_max} °C</p>
          </p>
        </div>
      </div>
    `;
  }
}
