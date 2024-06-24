// Get the current year
const currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = currentYear;

// Get the last modified date
const lastModified = new Date(document.lastModified);
const options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
const formattedDate = lastModified.toLocaleString('en-US', options);
document.getElementById("lastModified").textContent = `Last Modification: ${formattedDate}`;