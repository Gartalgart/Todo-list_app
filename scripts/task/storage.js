export function loadTasks(dateKey) {
  return JSON.parse(localStorage.getItem(dateKey)) || [];
}
export function saveTasks(dateKey, tasks) {
  localStorage.setItem(dateKey, JSON.stringify(tasks));
}
