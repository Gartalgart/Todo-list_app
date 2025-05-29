import { loadTasks, saveTasks } from "./storage.js";
import { getSelectedDateKey } from "./date.js";

export function renderTasks(taskList, resetTasksBtn) {
  const dateKey = getSelectedDateKey();
  taskList.innerHTML = "";
  const tasks = dateKey ? loadTasks(dateKey) : [];
  if (resetTasksBtn) {
    resetTasksBtn.style.display = tasks.length > 0 ? "block" : "none";
  }
  if (!dateKey) return;
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";
    if (task.completed) li.classList.add("completed");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      tasks[index].completed = checkbox.checked;
      saveTasks(dateKey, tasks);
      renderTasks(taskList, resetTasksBtn);
    });
    const span = document.createElement("span");
    span.textContent = task.text;
    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.textContent = "🗑️";
    delBtn.className = "delete-btn";
    delBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks(dateKey, tasks);
      renderTasks(taskList, resetTasksBtn);
    });
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}
