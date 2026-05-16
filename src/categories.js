const CATEGORY_COLORS = {
    attraction: "#00d9ff",
    restaurant: "#ff2fd1",
    park: "#00ffa3",
    market: "#ff9f43",
    mall: "#ff2fd1",
    accomodation: "#00d9ff"
};

function generateLegend() {
    const container = document.getElementById('legend-container');
    
    // Clear existing content if necessary
    container.innerHTML = '';

    // Loop through the object entries
    Object.entries(CATEGORY_COLORS).forEach(([category, color]) => {
        // Create the item wrapper
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';

        // Capitalize the first letter of the category for the label
        const label = category.charAt(0).toUpperCase() + category.slice(1);

        // Set the inner HTML structure
        legendItem.innerHTML = `
            <div class="legend-color" style="background: ${color}"></div>
            ${label}
        `;

        container.appendChild(legendItem);
    });
}

generateLegend();
