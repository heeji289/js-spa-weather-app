import Router from './router';

const NavigateMenu = /*html*/ `
  <ul>
    <li><a href="/">HOME</a></li>
    <li><a href="/login">LOGIN</a></li>
  </ul>
`;

const HomePage = /*html*/ `
  <div>
    <h1>Home</h1>
    ${NavigateMenu}
  </div>
`;

const LoginPage = /*html*/ `
  <div>
    <h1>Login</h1>
    ${NavigateMenu}
  </div>
`;

const routes = {
  '/': HomePage,
  '/login': LoginPage,
};

const router = new Router(routes);
