import { BattlePage } from "./modules/pages/battlePage.js";
import { LoginPage } from "./modules/pages/loginPage.js";
import { SettingPage } from "./modules/pages/settingPage.js";
import { HomePage } from "./modules/pages/homePage.js";
import { CharacterPage } from "./modules/pages/characterPage.js";

export class Router {
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
