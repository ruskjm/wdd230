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

  // Form submit event listener
  form.addEventListener('submit', function(event) {
      // Password validation
      const password = passwordInput.value;
      const passwordConfirm = passwordConfirmInput.value;

      // Check if the passwords match
      if (password !== passwordConfirm) {
          // If passwords don't match, prevent the form from submitting
          event.preventDefault();
          passwordError.style.display = 'block';
      } else {
          // If passwords match, hide the error message
          // Remove the error highlighting from both password fields
          // by setting the background color back to default (empty string)
          passwordError.style.display = 'none';
          passwordInput.style.backgroundColor = '';
          passwordConfirmInput.style.backgroundColor = '';
      }


      // Add an event listener to the password confirmation input field
      passwordConfirmInput.addEventListener('input', function() {
          // Check if the value of the password input doesn't match the confirmation input
          if (passwordInput.value !== passwordConfirmInput.value) {
              // If passwords don't match, display the error message
              passwordError.style.display = 'block';
          } else {
              // If passwords match, hide the error message
              passwordError.style.display = 'none';
          }
      });

      
      // Email validation
      const email = emailInput.value;
      const emailPattern = /[a-zA-Z0-9._%+-]+@byui\.edu$/;

      if (!emailPattern.test(email)) {
          event.preventDefault();
          emailError.style.display = 'block';
      } else {
          emailError.style.display = 'none';
      }
  });


  // Update rating value display
  ratingInput.addEventListener('input', () => {
      ratingValue.textContent = ratingInput.value;
  });
});