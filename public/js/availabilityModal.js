let isCalendarInitialized = false;
let selectedTimeSlots = []; // Array to store selected time slots

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

    // Append the modal content to the modal
    modal.appendChild(modalContent);
}

function initModalCalendar() {
    if (isCalendarInitialized) {
        return; // Do not reinitialize if already done
    }
    const calendarEl = document.getElementById('modalCalendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek',       
        headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'today'
        },
        selectable: true,
        selectOverlap: false,
        select: function(info) {
            // Handle the selection
            // `info` contains the start and end date/time of the selection
            // Add the selected time slot as an event
            calendar.addEvent({
                start: info.start,
                end: info.end,
                backgroundColor: '#00ff00', // Example: green background
                borderColor: '#00ff00' // Example: green border
                });
            
            // Add the selected time slot to the array
            selectedTimeSlots.push({
                start: info.startStr,
                end: info.endStr
            });
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
    calendar.render();
    isCalendarInitialized = true;
}

document.addEventListener('DOMContentLoaded', function() {
    const modal = createModal();

    console.log("Modal script loaded.");
    // Event listener to open the modal
    document.getElementById('postAvailability').addEventListener('click', function() {
            modal.style.display = 'flex'; // Show the modal
            // Initialize the FullCalendar in the modal
            initModalCalendar();
            console.log("Modal should be open.");
        });
        
    // Event listener for the submit button
    document.getElementById('submitAvailability').addEventListener('click', async function() {
        // Send selectedTimeSlots to the server
        const userId = sessionStorage.getItem('user_id'); // Make sure 'user_id' matches your session storage key

        const formattedAvailability = selectedTimeSlots.map(slot => {
            const startDate = new Date(slot.start);
            const endDate = new Date(slot.end);
        
            return {
                user_id: userId,
                date: startDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
                start_time: startDate.toTimeString().split(' ')[0], // Format as HH:MM:SS
                end_time: endDate.toTimeString().split(' ')[0], // Format as HH:MM:SS
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
                // Handle successful submission here (e.g., update UI)
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
    // Add more event listeners as needed, e.g., for closing the modal
});

