import Router from './router.js';
import WeatherListPage from './page/weather-list.js';
import WeatherDetailPage from './page/weather-detail.js';

const routes = {
  '/weather': WeatherListPage,
  '/weather/:name': WeatherDetailPage,
};

const router = new Router(routes);

export default router;
