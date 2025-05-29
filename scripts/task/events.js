import { renderTasks } from "./dom.js";
import { loadTasks, saveTasks } from "./storage.js";
import { getSelectedDateKey } from "./date.js";

export function setupEvents(form, input, taskList, resetTasksBtn) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    const dateKey = getSelectedDateKey();
    if (!dateKey) {
      alert("Veuillez sélectionner une date dans le calendrier.");
      return;
    }
    const tasks = loadTasks(dateKey);
    tasks.push({ text, completed: false });
    saveTasks(dateKey, tasks);
    renderTasks(taskList, resetTasksBtn);
    input.value = "";
  });

  document.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("date") &&
      !e.target.classList.contains("inactive")
    ) {
      setTimeout(() => renderTasks(taskList, resetTasksBtn), 0);
    }
  });

  resetTasksBtn.addEventListener("click", () => {
    const dateKey = getSelectedDateKey();
    if (!dateKey) {
      alert("Veuillez sélectionner une date dans le calendrier.");
      return;
    }
    if (
      confirm(
        "Voulez-vous vraiment supprimer toutes les tâches de cette journée ?"
      )
    ) {
      localStorage.removeItem(dateKey);
      renderTasks(taskList, resetTasksBtn);
    }
  });
}
