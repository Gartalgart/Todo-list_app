import { getCurrentDate, setCurrentDate } from "./state.js";
import { updateCalendar, updateSelectedDateDisplay } from "./render.js";

export function setupNavigationListeners() {
  document.getElementById("prevBtn").addEventListener("click", () => {
    const currentDate = getCurrentDate();
    currentDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(currentDate);
    updateCalendar();
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    const currentDate = getCurrentDate();
    currentDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(currentDate);
    updateCalendar();
  });

  document.getElementById("reset").addEventListener("click", () => {
    setCurrentDate(new Date());
    updateCalendar();
  });
}

export function attachDateListeners() {
  const currentDate = getCurrentDate();
  const dateElements = document.querySelectorAll(".date:not(.inactive)");

  dateElements.forEach((dateElement) => {
    dateElement.addEventListener("click", () => {
      dateElements.forEach((el) => el.classList.remove("selected"));
      dateElement.classList.add("selected");
      const day = parseInt(dateElement.textContent, 10);
      const selectedDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      updateSelectedDateDisplay(selectedDate);
    });
  });

  // Highlight today by default if visible
  const today = new Date();
  if (
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear()
  ) {
    const todayElement = Array.from(dateElements).find(
      (el) => parseInt(el.textContent, 10) === today.getDate()
    );
    if (todayElement) {
      todayElement.classList.add("selected");
      updateSelectedDateDisplay(today);
      return;
    }
  }
  document.getElementById("selectedDateDisplay").textContent = "";
}
