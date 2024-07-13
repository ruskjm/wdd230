// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the banner and close button elements
    const banner = document.getElementById('meet-greet-banner');
    const closeBanner = document.getElementById('close-banner');

    // Function to determine if the banner should be shown
    function shouldShowBanner() {
        // Get the current day of the week (0 is Sunday, 1 is Monday, etc.)
        const today = new Date().getDay();
        // Show banner only on Monday, Tuesday, Wednesday
        return today >= 1 && today <= 3;
    }

    // Check if the banner should be shown
    if (shouldShowBanner()) {
        // Make the banner visible
        banner.style.display = 'block';
        // Adjust the body padding to prevent content from being hidden behind the banner
        document.body.style.paddingTop = banner.offsetHeight + 'px';
    }

    // Add click event listener to the close button
    closeBanner.addEventListener('click', function() {
        // Hide the banner when close button is clicked
        banner.style.display = 'none';
        // Reset the body padding when banner is closed
        document.body.style.paddingTop = '0';
    });
});