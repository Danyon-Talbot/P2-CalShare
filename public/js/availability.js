async function updateCalendarWithAvailability(userId, calendar) {
    try {
        const response = await fetch(`/api/availability/${userId}`);
        if (response.ok) {
            const availabilityData = await response.json();
            // Clear existing events and add new ones
            calendar.getEvents().forEach(event => event.remove());
            availabilityData.forEach(event => calendar.addEvent(event));
        } else {
            console.error('Failed to fetch availability');
        }
    } catch (error) {
        console.error('Error fetching availability:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek', // Default view
        allDaySlot: false,
        headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'today'
        }
    });
    calendar.render();

    window.getMainCalendarInstance = function() {
        return calendar;
    };    

    // Fetch and display events data
    const userId = sessionStorage.getItem('user_id');
    if (userId) {
        updateCalendarWithAvailability(userId, calendar);
    } else {
        console.error('User ID not found in session storage');
    }
});
