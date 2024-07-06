let baseURL, linksURL;

// Check if the current URL is localhost or 127.0.0.1
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    // Local development settings
    baseURL = "./";
    linksURL = "data/links.json";
} else {
    // Server (GitHub Pages) settings
    baseURL = "https://ruskjm.github.io/wdd230/";
    linksURL = "https://ruskjm.github.io/wdd230/data/links.json";
}

console.log("Current baseURL:", baseURL);
console.log("Current linksURL:", linksURL);


// Asynchronous function to fetch the links data
async function getLinks() {
    try {
        // Send a request to fetch the JSON data from the specified URL
        const response = await fetch(linksURL);
        // Parse the JSON data from the response
        const data = await response.json();
        // Log data for testing
        //console.log(data);
        // Call the function to display links
        displayLinks(data.weeks);
        // Error handling
    } catch (error) {
        console.error('Error fetching links:', error);
    }
}

// Function to display the links
function displayLinks(weeks) {
    // Select the ul element in the card
    const ul = document.querySelector('.card ul');

    // Iterate over each week in the weeks array
    weeks.forEach(week => {
        // Create a new list item element
        const li = document.createElement('li');

        // Set the text content of the list item to the week number
        li.textContent = `${week.week}: `;

        // Iterate over each link in the current week
        week.links.forEach((link, index) => {
            // Create a new anchor element
            const a = document.createElement('a');
            // Check if the URL is absolute or relative
            if (link.url.startsWith('http://') || link.url.startsWith('https://')) {
                // Use the full URL as is
                a.href = link.url;
            } else {
                // Prepend baseURL for relative paths
                a.href = baseURL + link.url;
            }
            // Set the text content of the anchor to the link title
            a.textContent = link.title;
            // Set the target attribute to open the link in a new tab
            a.target = "_blank";
            // Append the anchor to the list item
            li.appendChild(a);

            // Add separator if not the last link
            if (index < week.links.length - 1) {
                // Create and append a text node with the separator
                li.appendChild(document.createTextNode(' | '));
            }
        });

        // Append the completed list item to the unordered list
        ul.appendChild(li);
    });
}

// Call the getLinks function when the script loads
getLinks();