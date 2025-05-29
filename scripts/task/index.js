import { renderTasks } from "./dom.js";
import { setupEvents } from "./events.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("taskForm");
  const input = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const resetTasksBtn = document.getElementById("resetTaskBtn");

  renderTasks(taskList, resetTasksBtn);
  setupEvents(form, input, taskList, resetTasksBtn);
});
