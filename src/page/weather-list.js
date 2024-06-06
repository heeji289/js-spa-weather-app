function convertTimestampToTime(timestamp) {
  const dateObj = new Date(timestamp * 1000);
  const localString = dateObj.toLocaleString(); // toTimeString(),
  return localString;
} // TODO: 위치 옮기기

export default class WeatherListPage {
  constructor($root, params) {
    this.$root = $root;
    this.$params = params;

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

  getTemplate(weatherData) {
    return /*html*/ `
      <div>
        <a href="/weather/Seoul">
          <h1>${weatherData.name}</h1>
          <h2>${convertTimestampToTime(weatherData.dt)}</h2>
          <p>현재: ${weatherData.main.temp} °C</p>
          <p>최저/최고: ${weatherData.main.temp_min} °C / ${
      weatherData.main.temp_max
    } °C</p>
          <img src="http://openweathermap.org/img/w/${
            weatherData.weather[0].icon
          }.png" />
        </a>
      </div>
    `;
  }

  render() {
    this.$root.innerHTML = this.isLoading
      ? `<p>Loading...</p>` // TODO: skeleton UI 적용
      : this.isError
      ? `<p>Error...!</p>` // TODO: 재시도 버튼 추가
      : this.getTemplate(this.weatherData);
  }

  addEvent() {
    //
  }

  async fetchWeather() {
    try {
      const result = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${
          import.meta.env.VITE_OPEN_WEATHER_API_KEY
        }&units=metric`
      );

      const data = await result.json();
      this.weatherData = data;
    } catch (err) {
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }
}
