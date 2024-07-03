document.addEventListener('DOMContentLoaded', () => {
    // Function to format date
    function formatDate(date) {
        return date.toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    }

    // Get the current date/time
    const currentDate = new Date();

    // Set the current year
    document.getElementById("currentYear").textContent = currentDate.getFullYear();

    // Format and set the last modified date
    const lastModified = new Date(document.lastModified);
    document.getElementById("lastModified").textContent = formatDate(lastModified);

    // Format current date/time
    const formattedDateTime = formatDate(currentDate);

    // Store in localStorage
    localStorage.setItem('formLoadTimestamp', formattedDateTime);

    // Set the value of the hidden timestamp field
    const timestampElement = document.getElementById('timestamp');
    if (timestampElement) {
        timestampElement.value = formattedDateTime;
    }
});