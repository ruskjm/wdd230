// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Select the container where business cards will be displayed
    const directoryContainer = document.querySelector('#directory-container');
    // Select the button for grid view
    const gridViewBtn = document.querySelector('#grid-view');
    // Select the button for list view
    const listViewBtn = document.querySelector('#list-view');
    // Initialize an empty array to store business data
    let businesses = [];

    // Async function to fetch business data from JSON file
    async function fetchBusinesses() {
        try {
            // Fetch the JSON file
            const response = await fetch('data/members.json');
            // Parse the JSON data
            const data = await response.json();
            // Store the businesses data in the businesses array
            businesses = data.businesses;
            // Display businesses in grid view by default
            displayBusinesses('grid');
        } catch (error) {
            // Log any errors that occur during fetching
            console.error('Error fetching businesses:', error);
        }
    }

    // Function to display businesses in either grid or list view
    function displayBusinesses(viewMode) {
        // Clear the existing content of the directory container
        directoryContainer.innerHTML = '';
        // Set the class name of the directory container to the current view mode
        directoryContainer.className = viewMode;

        if (viewMode === 'list') {
            // Create a table element for the list view
            const table = document.createElement('table');
            // Create the table header
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            // Define the column headers for the list view
            const headers = ['Business Name', 'Category', 'Est.', 'Address', 'Phone', 'Membership', 'Website Link'];

            // Create table header cells for each column
            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                headerRow.appendChild(th);
            });

            // Append the header row to the table header
            thead.appendChild(headerRow);
            // Append the table header to the table
            table.appendChild(thead);

            // Create the table body
            const tbody = document.createElement('tbody');

            // Iterate over each business to create table rows
            businesses.forEach(business => {
                const row = document.createElement('tr');
                // Destructure business object to get required properties
                const {
                    name,
                    category,
                    yearEstablished,
                    address,
                    phone,
                    membershipLevel,
                    website
                } = business;

                // Define the content for each column in the row
                const columns = [
                    name,
                    category,
                    yearEstablished,
                    address,
                    phone,
                    membershipLevel,
                    `<a href="${website}" target="_blank" class="business-website">Visit ${name}</a>`
                ];

                // Create table cells for each column in the row
                columns.forEach((column, index) => {
                    const td = document.createElement('td');
                    td.innerHTML = column;
                    td.setAttribute('data-label', headers[index]);
                    row.appendChild(td);
                });

                // Append the row to the table body
                tbody.appendChild(row);
            });

            // Append the table body to the table
            table.appendChild(tbody);
            // Append the complete table to the directory container
            directoryContainer.appendChild(table);
        } else {
            // Iterate over each business to create business cards for grid view
            businesses.forEach(business => {
                // Create a new div element for each business card
                const businessCard = document.createElement('div');
                // Set the class name for the business card
                businessCard.className = 'business-card';

                // Create the HTML content for the business card
                const content = `
                <div class="business-card-content">
                    <h2 class="business-name">${business.name}</h2>
                    <p class="business-year"><span class="label">Est:</span> ${business.yearEstablished}</p>
                    <p class="business-address"><span class="label">Address:</span> ${business.address}</p>
                    <p class="business-phone"><span class="label">Phone:</span> ${business.phone}</p>
                    <p class="business-description">${business.description}</p>
                    <p class="business-membership"><span class="label">Membership:</span> ${business.membershipLevel}</p>
                    <p class="business-hours"><span class="label">Hours:</span> ${business.hoursOfOperation}</p>
                    <p><a href="${business.website}" target="_blank" class="business-website">Visit ${business.name}</a></p>
                </div>
                <div class="business-card-image">
                    <img src="images/${business.image}" alt="${business.name}" loading="lazy">
                </div>
            `;

                // Set the innerHTML of the business card to the created content
                businessCard.innerHTML = content;
                // Append the business card to the directory container
                directoryContainer.appendChild(businessCard);
            });
        }
    }

    // Add click event listener to the grid view button
    gridViewBtn.addEventListener('click', () => {
        // Display businesses in grid view
        displayBusinesses('grid');
        // Add 'active' class to grid view button
        gridViewBtn.classList.add('active');
        // Remove 'active' class from list view button
        listViewBtn.classList.remove('active');
    });

    // Add click event listener to the list view button
    listViewBtn.addEventListener('click', () => {
        // Display businesses in list view
        displayBusinesses('list');
        // Add 'active' class to list view button
        listViewBtn.classList.add('active');
        // Remove 'active' class from grid view button
        gridViewBtn.classList.remove('active');
    });

    // Call the fetchBusinesses function to load and display the data
    fetchBusinesses();
});