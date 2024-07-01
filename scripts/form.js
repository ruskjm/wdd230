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
        console.error('One or more required elements are missing');
        return; // Exit if any element is missing
    }

    // Function to validate email
    function validateEmail() {
        const email = emailInput.value;
        // Regular expression for validating @byui.edu email addresses
        const emailPattern = /[a-zA-Z0-9._%+-]+@byui\.edu$/;
        
        // Only show error if there's input and it's invalid
        if (!emailPattern.test(email) && email !== '') {
            emailError.style.display = 'block';
            return false;
        } else {
            emailError.style.display = 'none';
            return true;
        }
    }

    // Email blur event listener
    emailInput.addEventListener('blur', validateEmail);

    // Password confirmation blur event listener
    passwordConfirmInput.addEventListener('blur', function() {
        // Only show error if there's input and passwords don't match
        if (passwordInput.value !== passwordConfirmInput.value && passwordConfirmInput.value !== '') {
            passwordError.style.display = 'block';
        } else {
            passwordError.style.display = 'none';
        }
    });

    // Form submit event listener
    form.addEventListener('submit', function(event) {
        // Password validation on submit
        if (passwordInput.value !== passwordConfirmInput.value) {
            event.preventDefault(); // Prevent form submission
            passwordError.style.display = 'block';
        } else {
            passwordError.style.display = 'none';
        }

        // Email validation on submit
        if (!validateEmail()) {
            event.preventDefault(); // Prevent form submission
        }
    });

    // Rating input event listener
    ratingInput.addEventListener('input', () => {
        // Update the rating value display in real-time
        ratingValue.textContent = ratingInput.value;
    });
});