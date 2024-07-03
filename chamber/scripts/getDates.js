// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Get the current year
    const currentYear = new Date().getFullYear();
    document.getElementById("currentYear").textContent = currentYear;

    // Get the last modified date
    const lastModified = new Date(document.lastModified);
    const options = {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
    };
    const formattedDate = lastModified.toLocaleString('en-US', options);
    document.getElementById("lastModified").textContent = `${formattedDate}`;

    // Save off the current date/time that the form was loaded by the user
    // Get the current timestamp 
    const currentDate = new Date();
    // Convert it to format: MM/DD/YYYY, HH:MM:SS (24-hour format)
    const formattedDateTime = currentDate.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    // Store the formatted date/time in localStorage
    localStorage.setItem('formLoadTimestamp', formattedDateTime);

    // Set the value of the hidden timestamp field
    document.getElementById('timestamp').value = formattedDateTime;
});