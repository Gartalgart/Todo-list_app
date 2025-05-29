export function getSelectedDateKey() {
  const selected = document.querySelector(".date.selected:not(.inactive)");
  if (!selected) return null;
  const day = parseInt(selected.textContent, 10);
  const monthYearText = document.getElementById("monthYear").textContent;
  const [monthName, year] = monthYearText.split(" ");
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  const month = months.findIndex(
    (m) => m.toLowerCase() === monthName.toLowerCase()
  );
  if (month === -1) return null;
  const dateObj = new Date(parseInt(year), month, day);
  return dateObj.toISOString().slice(0, 10);
}
