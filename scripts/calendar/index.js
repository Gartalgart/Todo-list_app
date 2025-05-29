import { updateCalendar } from "./render.js";
import { setupNavigationListeners } from "./listeners.js";

document.addEventListener("DOMContentLoaded", () => {
  setupNavigationListeners();
  updateCalendar();
});
