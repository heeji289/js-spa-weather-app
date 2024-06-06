function convertTimestampToTime(timestamp) {
  const dateObj = new Date(timestamp * 1000);
  const localString = dateObj.toLocaleString(); // toTimeString(),
  return localString;
} // TODO: 위치 옮기기

// TODO: 임시함수, API 연동 후 제거
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default class WeatherDetailPage {
  constructor($root, params) {
    this.$root = $root;
    this.params = params;

    this.weatherDataList = [];
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
    const WeatherCard = (weatherData) => /*html*/ `
      <h2>${convertTimestampToTime(weatherData.dt)}</h2>
      <p>현재: ${weatherData.main.temp} °C</p>
      <p>최저/최고: ${weatherData.main.temp_min} °C / ${
      weatherData.main.temp_max
    } °C</p>
      <img src="http://openweathermap.org/img/w/${
        weatherData.weather[0].icon
      }.png" />
    `;

    return /*html*/ `
      <h1>Weather Detail</h1>
      ${this.weatherDataList
        .map((data) => `<div>${WeatherCard(data)}</div>`)
        .join('')}
    `;
  }

  render() {
    this.$root.innerHTML = this.isLoading
      ? `<p>Loading...</p>` // TODO: skeleton UI 적용
      : this.isError
      ? `<p>Error...!</p>` // TODO: 재시도 버튼 추가
      : this.getTemplate();
  }

  async fetchData() {
    try {
      const result = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=Seoul&appid=${
          import.meta.env.VITE_OPEN_WEATHER_API_KEY
        }&units=metric`
      );
      await sleep(1000);

      const data = await result.json();
      this.weatherDataList = data.list;
    } catch (err) {
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }
}
