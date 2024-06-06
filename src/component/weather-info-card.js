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
      <img src="http://openweathermap.org/img/w/${this.props.weatherData.weather[0].icon}.png" />
      <p>현재: ${this.props.weatherData.main.temp} °C</p>
      <p>최저/최고: ${this.props.weatherData.main.temp_min} °C / ${this.props.weatherData.main.temp_max} °C</p>
    `;
  }
}
