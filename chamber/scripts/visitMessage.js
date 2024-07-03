// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Get the element where the visit message will be displayed
    const visitMessage = document.getElementById('visit-message');

    // Get the current timestamp in milliseconds
    const now = Date.now();

    // Retrieve the firstVisit timestamp from localStorage
    let firstVisit = localStorage.getItem('firstVisit');

    // Check if this is the firstVisit
    if (!firstVisit) {

        // If it's the firstVisit, display the welcome message
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";

        // Add the firstVisit date to localStorage with the current timestamp in milliseconds
        localStorage.setItem('firstVisit', now.toString());

    } else {
        // Convert the firstVisit string to a number
        const firstVisitDate = parseInt(firstVisit);

        // Calculate the number of days since the firstVisit
        // 1. Subtract firstVisitDate from now to get the difference in milliseconds
        // 2. Divide by (1000 * 60 * 60 * 24) to convert milliseconds to days:
        //    - 1000 milliseconds in a second
        //    - 60 seconds in a minute
        //    - 60 minutes in an hour
        //    - 24 hours in a day
        // 3. Use Math.floor() to round down to the nearest whole number of days
        const daysSincefirstVisit = Math.floor((now - firstVisitDate) / (1000 * 60 * 60 * 24));

        // Check if the firstVisit was less than a day ago
        if (daysSincefirstVisit < 1) {

            // If less than a day, display the "back so soon" message
            visitMessage.textContent = "Back so soon! Awesome!";

        } else {

            // If more than a day, prepare the appropriate day/days wording
            const dayWord = daysSincefirstVisit === 1 ? "day" : "days";

            // Display the number of days since the firstVisit
            visitMessage.textContent = `You last visited ${daysSincefirstVisit} ${dayWord} ago.`;
        }
    }

});