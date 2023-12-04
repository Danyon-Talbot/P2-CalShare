function formatTime(time) {
    // Your formatting logic here, for example:
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(time).toLocaleTimeString(undefined, options);
}

document.addEventListener('DOMContentLoaded', function () {
    // Your code here
    console.log("Show User Events Script Loaded");

    function fetchUserEvents() {
        // Get the user ID from session storage and convert it to a string
        const userId = sessionStorage.getItem('user_id').toString(); // Convert to string
        console.log("Fetching User Events");
        if (!userId) {
            console.log("FAILED TO FETCH USER ID");
            return; // Exit early if user_id is not available
        }
        // Make a GET request to fetch events where the user is a guest
        fetch(`/api/events?guests=${userId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log('Data received:', data); // Logs Data
                if (data && Array.isArray(data) && data.length > 0) {
                    console.log("Data fetched successfully:", data);
                    // Pass the events data to a Handlebars template
                    renderEvents(data); // Corrected this line
                } else {
                    console.log("No events found in data:", data); // Logs Data
                    // Handle the case where data is not defined or empty
                    handleNoEvents();
                }
            })
            .catch((error) => {
                console.error('Error fetching user events:', error);
            });
    }

    function renderEvents(events) {
        console.log("Rendering User Events");
        
        // Create a string to hold the HTML content
        let eventsHtml = '';

        // Loop through the events and generate HTML for each event
        events.forEach((event) => {
            eventsHtml += generateEventHtml(event);
        });

        // Replace the contents of the events-list element with the generated HTML
        const eventsList = document.querySelector('.events-list');
        if (eventsList) {
            eventsList.innerHTML = eventsHtml;
        }
    }

    function generateEventHtml(event) {
        // Create the HTML structure for a single event
        return `
            <div class="user-event">
                <div>
                    <h3>${event.event_name}</h3>
                </div>
                <div>
                    <p>Event Owner: ${event.creator_id}</p>
                    <p>Start Time: ${formatTime(event.start_time)}</p>
                    <p>End Time: ${formatTime(event.end_time)}</p>
                </div>
            </div>
        `;
    }

    function handleNoEvents() {
        console.log('No events found.');
    }

    // Call fetchUserEvents to initiate the data fetching and rendering
    fetchUserEvents();
});
