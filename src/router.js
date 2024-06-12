const PATH_PARAMETER_REGEXP = /:\w+/g; // TODO: 위치 변경

export default class Router {
  #routes;

  constructor(routes) {
    this.#routes = routes;
    this.addEvent();
  }

  navigate(path) {
    history.pushState(null, '', path);
    this.renderPage();
  }

  addEvent() {
    window.addEventListener('popstate', () => this.renderPage());
    window.addEventListener('load', () => this.renderPage());
    document.addEventListener('DOMContentLoaded', () => this.renderPage());
  }

  findMatchRoute(path) {
    for (const route in this.#routes) {
      const routeMatcher = new RegExp(
        `^${route.replace(PATH_PARAMETER_REGEXP, '(\\w+)')}$`
      );
      const match = path.match(routeMatcher);

      if (!!match) {
        return { route, match };
      }
    }

    return null;
  }

  extractParams(route, match) {
    const values = match.slice(1); // seoul
    const keys = Array.from(route.matchAll(PATH_PARAMETER_REGEXP)).map(
      (key) => {
        return key[0].replace(':', '');
      }
    ); // name

    return keys.reduce((params, key, index) => {
      params[key] = values[index];
      return params;
    }, {}); // name: seoul
  }

  renderPage() {
    const path = window.location.pathname;
    const matchedRoute = this.findMatchRoute(path);

    if (!!matchedRoute) {
      const { route, match } = matchedRoute;

      const PageComponent = this.#routes[route];
      const params = this.extractParams(route, match);

      const $root = document.querySelector('#app');
      new PageComponent($root, params);
    } else {
      // error
    }
  }
}
