// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the email and title input elements
    const emailInput = document.getElementById('email');
    const titleInput = document.getElementById('title');

    // Email validation
    // Function to validate email using a regular expression
    function validateEmail(email) {
        // Regular expression for valid email address
        // Example: example@email.com
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }

    // Function to display email error message
    function showEmailError(message) {
        const errorElement = document.getElementById('emailError');
        errorElement.textContent = message;
        emailInput.classList.add('invalid');
    }

    // Function to clear email error message
    function clearEmailError() {
        const errorElement = document.getElementById('emailError');
        errorElement.textContent = '';
        emailInput.classList.remove('invalid');
    }

    // Add blur event listener to email input
    emailInput.addEventListener('blur', function() {
        // Check if email is empty
        if (!validateEmail(this.value)) {
            // Show error if invalid
            showEmailError('Please enter a valid email address.');
        } else {
            // Clear error if valid
            clearEmailError();
        }
    });

    // Add input event listener to email input
    emailInput.addEventListener('input', function() {
        if (this.value !== '') {
            // Clear error when user starts typing
            clearEmailError();
        }
    });

    // Title validation
    // Function to validate title using a regular expression
    function validateTitle(title) {
        // Regular expression for minimum 7 characters, 
        // only alphanumeric characters, hyphens, and spaces allowed
        const re = /^[A-Za-z0-9\s-]{7,}$/;
        return re.test(title);
    }

    // Function to display title error message
    function showTitleError(message) {
        const errorElement = document.getElementById('titleError');
        errorElement.textContent = message;
        titleInput.classList.add('invalid');
    }

    // Function to clear title error message
    function clearTitleError() {
        const errorElement = document.getElementById('titleError');
        errorElement.textContent = '';
        titleInput.classList.remove('invalid');
    }

    // Add blur event listener to title input
    titleInput.addEventListener('blur', function() {
        // Check if title is empty
        if (!validateTitle(this.value)) {
            // Show error if invalid
            showTitleError('Minimum 7 characters, only alphanumeric characters, hyphens, and spaces allowed.');
        } else {
            // Clear error if valid
            clearTitleError();
        }
    });

    // Add input event listener to title input
    titleInput.addEventListener('input', function() {
        if (this.value !== '') {
            // Clear error when user starts typing
            clearTitleError();
        }
    });
});