  const ratingInput = document.getElementById('rating');
  const ratingValue = document.getElementById('rating-value');
  ratingInput.addEventListener('input', () => {
    ratingValue.textContent = ratingInput.value;
  });