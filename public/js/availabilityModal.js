let isCalendarInitialized = false;
let selectedTimeSlots = []; // Array to store selected time slots
let modalCalendar; 

function createModal() {
    const modal = document.createElement('div');
    modal.id = 'availabilityModal';
    modal.className = 'modal';
    modal.style.display = 'none';

    createModalContent(modal);

    document.body.appendChild(modal);
    return modal;
}

function createModalContent(modal) {
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    // Create a container for the FullCalendar
    const calendarContainer = document.createElement('div');
    calendarContainer.id = 'modalCalendar';
    modalContent.appendChild(calendarContainer);

    // Create a submit button
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit Availability';
    submitButton.id = 'submitAvailability';
    modalContent.appendChild(submitButton);

    // Create a close button
    const closeButton = document.createElement('span');
    closeButton.id = 'close';
    closeButton.className = 'close';
    closeButton.textContent = '×';
    modalContent.appendChild(closeButton);

    // Create a button to fetch and refresh availability
    const fetchButton = document.createElement('button');
    fetchButton.textContent = 'Refresh Availability';
    fetchButton.id = 'fetchAvailability';
    modalContent.appendChild(fetchButton);

    // Append the modal content to the modal
    modal.appendChild(modalContent);
}

function refreshModalCalendar(userId) {
    fetchUserAvailability(userId).then(availabilityData => {
        if (availabilityData) {
            // Clear existing events and add new ones
            modalCalendar.getEvents().forEach(event => event.remove());
            availabilityData.forEach(eventData => {
                modalCalendar.addEvent({
                    start: eventData.start,
                    end: eventData.end,
                    backgroundColor: '#00ff00',
                    borderColor: '#00ff00'
                });
            });
        }
    });
}

async function fetchUserAvailability(userId) {
    try {
        const response = await fetch(`/api/availability/${userId}`);
        if (response.ok) {
            const availabilityData = await response.json();
            return availabilityData;
        } else {
            console.error('Failed to fetch user availability');
        }
    } catch (error) {
        console.error('Error fetching user availability:', error);
    }
}

function initModalCalendar() {
    if (isCalendarInitialized) {
        // Clear existing events if the calendar is already initialized
        modalCalendar.getEvents().forEach(event => event.remove());
    }
    const calendarEl = document.getElementById('modalCalendar');
    modalCalendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek',     
        headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'today'
        },
        selectable: true,
        allDaySlot: false,  
        selectOverlap: false,
        select: function(info) {
            // Handle the selection
            // `info` contains the start and end date/time of the selection
            // Add the selected time slot as an event
            let isOverlapping = false;
            modalCalendar.getEvents().forEach(event => {
                if ((info.start < event.end) && (info.end > event.start)) {
                    isOverlapping = true;
                    event.setStart(new Date(Math.min(event.start, info.start)));
                    event.setEnd(new Date(Math.max(event.end, info.end)));
                }
            });
            if (!isOverlapping) {
                modalCalendar.addEvent({
                    start: info.start,
                    end: info.end,
                    backgroundColor: '#00ff00',
                    borderColor: '#00ff00'
                });
                selectedTimeSlots.push({
                    start: info.start,
                    end: info.end
                });
            }
        },
        eventClick: function(info) {
            // Remove the event on click
            info.event.remove();
            
            // Optionally, update the selectedTimeSlots array
            selectedTimeSlots = selectedTimeSlots.filter(slot =>
                slot.start !== info.event.startStr || slot.end !== info.event.endStr
            );
        }
    });
    modalCalendar.render();
    isCalendarInitialized = true;

    // Fetch and display the user's existing availability
    fetchUserAvailability(userId).then(availabilityData => {
        if (availabilityData) {
            // Transform data if necessary to match FullCalendar event format
            // Example: Assuming availabilityData is an array of objects with start and end properties
            availabilityData.forEach(eventData => {
                modalCalendar.addEvent({
                    start: eventData.start,
                    end: eventData.end,
                    backgroundColor: '#00ff00',
                    borderColor: '#00ff00'
                });
                selectedTimeSlots.push({
                    start: eventData.start,
                    end: eventData.end
                });
            });
        }
    });
}

async function updateMainCalendar(userId) {
    try {
        const response = await fetch(`/api/availability/${userId}`);
        if (response.ok) {
            const updatedAvailability = await response.json();
            // Update the main calendar with this data
            // For example, clear existing events and add new ones
        } else {
            console.error('Failed to fetch updated availability');
        }
    } catch (error) {
        console.error('Error fetching updated availability:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const modal = createModal();

    console.log("Modal script loaded.");
    // Event listener to open the modal
    document.getElementById('postAvailability').addEventListener('click', function() {
        const userId = sessionStorage.getItem('user_id');
        if (userId) {
            modal.style.display = 'flex'; // Show the modal
            initModalCalendar(userId); // Initialize the FullCalendar in the modal with user's data
        } else {
            console.error('User ID not found in session storage');
        }
    });
        
    // Event listener for the submit button
    document.getElementById('submitAvailability').addEventListener('click', async function() {
        // Send selectedTimeSlots to the server
        const userId = sessionStorage.getItem('user_id'); // Make sure 'user_id' matches your session storage key

        const formattedAvailability = selectedTimeSlots.map(slot => {
            return {
                user_id: userId,
                start: slot.start, 
                end: slot.end,
                status: 'available'
            };
        });

        try {
            const response = await fetch('/api/availability', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedAvailability),
            });
    
            if (response.ok) {
                console.log('Availability submitted successfully');
                // Assuming you have a way to access the calendar instance from availability.js
                // Call updateCalendarWithAvailability to refresh the calendar
                if (userId && typeof updateCalendarWithAvailability === "function") {
                    updateCalendarWithAvailability(userId, calendarInstanceFromAvailabilityJs);
                }
            } else {
                console.error('Failed to submit availability');
                // Handle errors here
            }
        } catch (error) {
            console.error('Error submitting availability:', error);
        }
        // You can use fetch or another method to POST this data to your backend
        modal.style.display = 'none'; // Hide the modal after submission
    });
    
    document.getElementById('close').addEventListener('click', function() {
        modal.style.display = 'none';
    });
    // Event listener to fetch and refresh availability
    document.getElementById('fetchAvailability').addEventListener('click', function() {
        const userId = sessionStorage.getItem('user_id');
        if (userId) {
            refreshModalCalendar(userId);
        } else {
            console.error('User ID not found in session storage');
        }
    });    
    // Add more event listeners as needed
});

