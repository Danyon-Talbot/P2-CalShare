let isCalendarInitialized = false;

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
    document.getElementById('submitAvailability').addEventListener('click', function() {
        // Logic to handle the submission of availability
        modal.style.display = 'none'; // Hide the modal after submission
    });
    
    document.getElementById('close').addEventListener('click', function() {
        modal.style.display = 'none';
    });
    // Add more event listeners as needed, e.g., for closing the modal
});

