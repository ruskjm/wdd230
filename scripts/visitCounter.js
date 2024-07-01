// Add an event listener that waits for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get the visit count element
  const visitCountElement = document.getElementById('visitCount');

  // Check if the element exists
  if (visitCountElement) {
      // Get the stored visit count from localStorage
      let visitCount = localStorage.getItem('visitCount');

      // If the visit count doesn't exist, initialize it to 0
      if (!visitCount) {
          visitCount = 0;
      }

      // Increment the visit count
      visitCount = parseInt(visitCount) + 1;

      // Store the updated visit count in localStorage
      localStorage.setItem('visitCount', visitCount);

      // Display the visit count on the page
      visitCountElement.textContent = visitCount;
  } else {
      console.error('Visit count element not found in the DOM');
  }
});