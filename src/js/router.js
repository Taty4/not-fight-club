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

    window.addEventListener("hashchange", () => this.handleRoute());
  }

  navigate(path) {
    location.hash = path;
    this.handleRoute();
  }

  handleRoute() {
    document.getElementById("app").replaceChildren();

    if (typeof this.currentPage?.destroy === "function") {
      this.currentPage.destroy();
    }
    const path = location.hash.slice(1) || "/";
    let PageClass;
    if (!localStorage.getItem("username-taty4")) {
      PageClass = LoginPage;
    } else {
      if (path === "/") {
        PageClass = HomePage;
      } else {
        PageClass = this.routes[path] || HomePage;
      }
    }

    this.currentPage = new PageClass();
  }

  start() {
    this.handleRoute();
  }
}

export const router = new Router();
