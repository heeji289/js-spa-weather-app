export default class Router {
  /**
   * routes 정보
   * navigateTo
   * URL 감지 이벤트 추가
   */
  #routes;

  constructor(routes) {
    this.#routes = routes;
    this.addEvent();
  }

  navigate(routeName) {
    history.pushState(null, '', routeName);
    this.renderPage();
  }

  addEvent() {
    window.addEventListener('popstate', (e) => this.renderPage());
    window.addEventListener('load', (e) => this.renderPage());
  }

  renderPage() {
    const path = window.location.pathname;
    const page = this.#routes[path];

    const $root = document.querySelector('#app');
    $root.innerHTML = page;
  }
}
