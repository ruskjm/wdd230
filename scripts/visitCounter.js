// Get the visit count element
const visitCountElement = document.getElementById('visitCount');

// Get the stored visit count from localStorage
let visitCount = localStorage.getItem('visitCount');

// If the visit count doesn't exist, initialize it to 0
if (!visitCount) {
  visitCount = 0;
}

// Increment the visit count
visitCount++;

// Store the updated visit count in localStorage
localStorage.setItem('visitCount', visitCount);

// Display the visit count on the page
visitCountElement.textContent = visitCount;