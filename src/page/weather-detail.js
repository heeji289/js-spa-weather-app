export default class WeatherDetailPage {
  constructor($root, params) {
    this.$root = $root;
    this.params = params;
    this.render();
  }

  render() {
    this.$root.innerHTML = /*html*/ `
      <h1>Weather Detail</h1>
    `;
  }
}
