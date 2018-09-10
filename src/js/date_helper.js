// formats due date nicely
export default function formatDueDate(dueDate) {
  let day, month, year;
  [year, month, day] = dueDate.split('-'); 
  return `${day}. ${month}. ${year}.`;
}
