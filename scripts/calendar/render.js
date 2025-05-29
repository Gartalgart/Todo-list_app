import { getCurrentDate } from "./state.js";
import { attachDateListeners } from "./listeners.js";

export function updateCalendar() {
  const currentDate = getCurrentDate();
  const monthYearElement = document.getElementById("monthYear");
  const datesElement = document.getElementById("dates");

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const totalDays = lastDay.getDate();
  const firstDayIndex = firstDay.getDay();
  const lastDayIndex = lastDay.getDay();

  const monthYearString = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  const formatedMonth =
    monthYearString.charAt(0).toUpperCase() + monthYearString.slice(1);
  monthYearElement.textContent = formatedMonth;

  let datesHTML = "";

  // Previous month's days
  for (let i = firstDayIndex; i > 0; i--) {
    const prevDate = new Date(currentYear, currentMonth, 0 - i + 1);
    datesHTML += `<div class="date inactive">${prevDate.getDate()}</div>`;
  }

  // Current month's days
  for (let i = 1; i <= totalDays; i++) {
    const date = new Date(currentYear, currentMonth, i);
    const activeClass =
      date.toDateString() === new Date().toDateString() ? "active" : "";
    datesHTML += `<div class="date ${activeClass}">${i}</div>`;
  }

  // Next month's days
  for (let i = 1; i <= 7 - lastDayIndex; i++) {
    const nextDate = new Date(currentYear, currentMonth + 1, i);
    datesHTML += `<div class="date inactive">${nextDate.getDate()}</div>`;
  }

  datesElement.innerHTML = datesHTML;
  attachDateListeners();
}

export function updateSelectedDateDisplay(date) {
  const display = document.getElementById("selectedDateDisplay");
  const today = new Date();
  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    display.textContent = "Today";
  } else {
    display.textContent = date.toLocaleDateString();
  }
}
