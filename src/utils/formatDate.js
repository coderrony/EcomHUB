export function formatDate(timestamp) {
  const date = new Date(timestamp);

  // Get the day, month, and year
  const day = date.getDate();
  const year = date.getFullYear();

  // Define an array of month names
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[date.getMonth()];

  // Get the hours and determine AM/PM
  let hours = date.getUTCHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // convert to 12-hour format

  // Return the formatted date
  return `${month} ${day} ${year} ${ampm}`;
}