export default class WeatherDetailPage {
  constructor($root) {
    this.$root = $root;
    this.render();
  }

  render() {
    this.$root.innerHTML = /*html*/ `
      <h1>Weather Detail</h1>
    `;
  }
}
