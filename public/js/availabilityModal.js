function createModal() {
    const modal = document.createElement('div');
    modal.id = 'availabilityModal';
    modal.className = 'modal';

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

    // Append the modal content to the modal
    modal.appendChild(modalContent);

    // Initialize the FullCalendar in the modal
    initModalCalendar();
}

function initModalCalendar() {
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
}

document.addEventListener('DOMContentLoaded', function() {
    const modal = createModal();

    console.log("Modal script loaded.");
    // Event listener to open the modal
    const postAvailabilityBtn = document.getElementById('postAvailability');
    if (postAvailabilityBtn) {
        postAvailabilityBtn.addEventListener('click', function() {
            modal.style.display = 'block'; // Show the modal
            console.log("Modal should be open.");
        });
    } else {
        console.log("Post Availability button not found.");
    }
    // Event listener for the submit button
    document.getElementById('submitAvailability').addEventListener('click', function() {
        // Logic to handle the submission of availability
        modal.style.display = 'none'; // Hide the modal after submission
    });
    
    // Add more event listeners as needed, e.g., for closing the modal
});