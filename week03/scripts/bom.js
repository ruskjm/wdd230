// Select the input element with id 'favchap'
const input = document.querySelector('#favchap');

// Select the first button element in the document
const button = document.querySelector('button');

// Select the element with id 'list'
const list = document.querySelector('#list');

// Create chaptersArray with stored chapters or an empty array
let chaptersArray = getChapterList() || [];

// For each chapter in the array, display it in the list
chaptersArray.forEach(chapter => {
  displayList(chapter);
});

// Add click event listener to the button
button.addEventListener('click', () => {
  // check if input is empty
  if (input.value !== '') {
    // call function that output the chapter
    displayList(input.value);
    // add the chapter to the array
    chaptersArray.push(input.value);
    // update the localStorage with new array
    setChapterList();
    // clear the input
    input.value = '';
    // set focuc back to input
    input.focus();
  }
});

// Function to display a chapter in the list
function displayList(item) {
  // Create a new list item
  let li = document.createElement('li');

  // Create a new delete button
  let deleteButton = document.createElement('button');

  // Set the text content of the list item to the chapter
  li.textContent = item;

  // Set the text content of the delete button
  deleteButton.textContent = '❌';

  // Append the delete button to the list item
  li.append(deleteButton);

  // Append the list item to the list
  list.append(li);

   // Add click event listener to the delete button
  deleteButton.addEventListener('click', function() {

    // Remove the list item from the list
    list.removeChild(li);

    // Delete the chapter from the array and localStorage
    deleteChapter(li.textContent);

    // Set focus back to input
    input.focus();
  });
}

// Function to save the chapters array to localStorage
function setChapterList() {
  localStorage.setItem('myFavBOMChapters', JSON.stringify(chaptersArray));
}

// Function to retrieve the chapters array from localStorage
function getChapterList() {
  return JSON.parse(localStorage.getItem('myFavBOMChapters'));
}

// Function to delete a chapter from the array and localStorage
function deleteChapter(chapter) {

  // Remove the last character from the chapter string
  chapter = chapter.slice(0, chapter.length - 1);

  // Filter out the chapter from the array
  chaptersArray = chaptersArray.filter(item => item !== chapter);

  // Update localStorage with the new array
  setChapterList();
}