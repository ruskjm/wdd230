const modeButton = document.querySelector("#modeButton");
const main = document.querySelector("main");

modeButton.addEventListener("click", () => {
  main.classList.toggle("dark-mode");
});