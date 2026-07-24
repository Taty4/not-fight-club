import { BattlePage } from "./pages/battlePage.js";
import { LoginPage } from "./pages/loginPage.js";
import { SettingPage } from "./pages/settingPage.js";
import { HomePage } from "./pages/homePage.js";
import { CharacterPage } from "./pages/characterPage.js";

class Router {
  currentPage = null;
  constructor() {
    this.routes = {
      "/": LoginPage,
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

    if (typeof this.currentPage?.destroy === "function") {
      this.currentPage.destroy();
    }

    const PageClass = this.routes[window.location.pathname] || HomePage;

    this.currentPage = new PageClass();
  }

  start() {
    this.handleRoute();
  }
}

export const router = new Router();
