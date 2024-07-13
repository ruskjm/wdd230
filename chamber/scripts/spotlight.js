// Array to store all businesses
let businesses = [];
// Array to store businesses with Silver or Gold membership
let qualifiedMembers = [];
// Index to keep track of the current position in the rotation
let currentIndex = 0;

// Asynchronous function to fetch business data from JSON file
async function fetchBusinesses() {
    try {
        // Fetch the JSON file
        const response = await fetch('data/members.json');
        // Parse the JSON data
        const data = await response.json();
        // Store all businesses
        businesses = data.businesses;
        // Filter businesses to get only Silver and Gold members
        qualifiedMembers = businesses.filter(member => ['Silver', 'Gold'].includes(member.membershipLevel));
        // Initialize the spotlights with the fetched data
        initializeSpotlights();
    } catch (error) {
        // Log any errors that occur during fetching
        console.error('Error fetching businesses:', error);
    }
}

// Function to display a single spotlight for a given member
function displaySpotlight(spotlight, member) {
    // Set the innerHTML of the spotlight with member information
    spotlight.innerHTML = `
        <h3>${member.name}</h3>
        <div class="spotlight-image-container">
            <img src="images/${member.image}" alt="${member.name}" onerror="this.onerror=null;this.src='images/placeholder.png';this.alt='Image not available';">
        </div>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank" class="spotlight-link">${member.website}</a></p>
        <p><strong>Hours:</strong> ${member.hoursOfOperation}</p>
        <p>${member.description}</p>
    `;
}

// Function to initialize the spotlights
function initializeSpotlights() {
    // Get all spotlight elements
    const spotlights = document.querySelectorAll('.spotlight');

    // Check if there are spotlights and qualified members
    if (spotlights.length === 0 || qualifiedMembers.length === 0) {
        // Log an error if no spotlights or qualified members are found
        console.error('No spotlights found or no qualified members');
        return;
    }

    // Initial rotation of spotlights
    rotateSpotlights(spotlights);

    // Set up interval to rotate spotlights every 10 seconds
    setInterval(() => rotateSpotlights(spotlights), 10000);
}

// Function to rotate the spotlights
function rotateSpotlights(spotlights) {
    // Iterate over each spotlight
    spotlights.forEach((spotlight, index) => {
        // Calculate the index of the member to display
        const memberIndex = (currentIndex + index) % qualifiedMembers.length;
        // Display the spotlight for the calculated member
        displaySpotlight(spotlight, qualifiedMembers[memberIndex]);
    });

    // Increment the current index, wrapping around if necessary
    currentIndex = (currentIndex + 1) % qualifiedMembers.length;
}

// Add event listener to start fetching businesses when the DOM is fully loaded
window.addEventListener('DOMContentLoaded', fetchBusinesses);