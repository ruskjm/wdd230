// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Get the element where the visit message will be displayed
    const visitMessage = document.getElementById('visit-message');
    
    // Get the current timestamp
    const now = Date.now();
    
    // Retrieve the last visit timestamp from localStorage
    let lastVisit = localStorage.getItem('lastVisit');

    // Check if this is the first visit
    if (!lastVisit) {
        // If it's the first visit, display the welcome message
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        // Convert the last visit string to a number
        const lastVisitDate = parseInt(lastVisit);
        
        // Calculate the number of days since the last visit
        const daysSinceLastVisit = Math.floor((now - lastVisitDate) / (1000 * 60 * 60 * 24));

        // Check if the last visit was less than a day ago
        if (daysSinceLastVisit < 1) {
            // If less than a day, display the "back so soon" message
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            // If more than a day, prepare the appropriate day/days wording
            const dayWord = daysSinceLastVisit === 1 ? "day" : "days";
            
            // Display the number of days since the last visit
            visitMessage.textContent = `You last visited ${daysSinceLastVisit} ${dayWord} ago.`;
        }
    }

    // Update the last visit date in localStorage with the current timestamp
    localStorage.setItem('lastVisit', now.toString());
});