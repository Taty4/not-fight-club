import { BattlePage } from "./pages/battlePage.js";
import { LoginPage } from "./pages/loginPage.js";
import { SettingPage } from "./pages/settingPage.js";
import { HomePage } from "./pages/homePage.js";
import { CharacterPage } from "./pages/characterPage.js";

class Router {
  constructor() {
    this.routes = {
      "/login": LoginPage,
      "/home": HomePage,
      "/battle": BattlePage,
      "/setting": SettingPage,
      "/character": CharacterPage,
    };

    window.addEventListener("popstate", () => this.handleRoute());
  }

  navigate(path) {
    window.history.pushState({}, "", path);
    this.handleRoute();
  }

  handleRoute() {
    document.getElementById("app").replaceChildren();

    const PageClass = this.routes[window.location.pathname] || LoginPage;

    new PageClass();
  }

  start() {
    this.handleRoute();
  }
}

export const router = new Router();
