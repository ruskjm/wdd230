// Add an event listener that waits for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all necessary elements
    const form = document.querySelector('.wf1');
    const passwordInput = document.getElementById('password');
    const passwordConfirmInput = document.getElementById('password-confirm');
    const passwordError = document.getElementById('passwordError');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const ratingInput = document.getElementById('rating');
    const ratingValue = document.getElementById('rating-value');

    // Check if all required DOM elements are present
    if (!form || !passwordInput || !passwordConfirmInput || !passwordError || !emailInput || !emailError || !ratingInput || !ratingValue) {
        return;
    }

    // Function to validate email
    function validateEmail() {
        // Get the current value of the email input field
        const email = emailInput.value;

        // Define a regular expression pattern for validating @byui.edu email addresses
        const emailPattern = /[a-zA-Z0-9._%+-]+@byui\.edu$/;

        // Test if the email matches the required pattern
        if (!emailPattern.test(email)) {
            // If the email doesn't match the pattern:
            // Display the error message by setting its display style to 'block'
            emailError.style.display = 'block';
            // Return false to indicate that the validation failed
            return false;
        } else {
            // If the email matches the pattern:
            // Hide the error message by setting its display style to 'none'
            emailError.style.display = 'none';
            // Return true to indicate that the validation passed
            return true;
        }
    }

    // Email input event listener
    emailInput.addEventListener('input', validateEmail);

    // Add an event listener to the password confirmation input field
    passwordConfirmInput.addEventListener('input', function() {
        // This listener triggers on every input event (i.e., whenever the user types or modifies the input)

        // Compare the value of the password input with the value of the password confirmation input
        if (passwordInput.value !== passwordConfirmInput.value) {
            // If the values don't match:
            // Display the error message by setting its display style to 'block'
            passwordError.style.display = 'block';
        } else {
            // If the values do match:
            // Hide the error message by setting its display style to 'none'
            passwordError.style.display = 'none';
        }
    });

    // Add an event listener for the form submission
    form.addEventListener('submit', function(event) {
        // This function will be called when the user tries to submit the form

        // Password validation
        if (passwordInput.value !== passwordConfirmInput.value) {
            // If the password and confirmation don't match:

            // Prevent the form from being submitted
            event.preventDefault();

            // Display the password error message
            passwordError.style.display = 'block';
        } else {
            // If the passwords match:

            // Hide the password error message
            passwordError.style.display = 'none';
        }

        // Email validation
        if (!validateEmail()) {
            // If the email is not valid (validateEmail() returns false):

            // Prevent the form from being submitted
            event.preventDefault();
        }
        // Note: We don't need an else clause here because validateEmail() 
        // function handles displaying/hiding the email error message
    });

    // Add an event listener to the rating input element
    ratingInput.addEventListener('input', () => {
        // Update the text content of the rating value display element
        // with the current value of the rating input
        ratingValue.textContent = ratingInput.value;
    });
});