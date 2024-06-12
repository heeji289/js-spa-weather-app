import Component from '../shared/component';

export default class WeatherInfoCard extends Component {
  // props - weatherData, title
  constructor($root, params, props) {
    super($root, params);
    this.props = props; // {weatherData: null}
    this.init();
  }

  init() {
    this.render();
  }

  getTemplate() {
    return /*html*/ `
      <div class="d-flex align-items-center">
        <img src="http://openweathermap.org/img/w/${this.props.weatherData.weather[0].icon}.png" />
        <div class="d-flex flex-column justify-content-between gap-1">
          <div>
            <p class="fw-semibold">현재</p>
            <p>${this.props.weatherData.main.temp} °C</p>
          </div>
          <div>
            <p class="fw-semibold">최저/최고</p>
            <p>${this.props.weatherData.main.temp_min} °C / ${this.props.weatherData.main.temp_max} °C</p>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    if (!this.props.weatherData) {
      this.$root.innerHTML = '<p>No Data</p>';
      return;
    }

    if (!!this.props.title) {
      this.$root.innerHTML =
        `<h2 class="display-6 fw-semibold">${this.props.title}</h2>` +
        this.getTemplate(this.props.weatherData);
    } else {
      this.$root.innerHTML = this.getTemplate(this.props.weatherData);
    }
  }
}
