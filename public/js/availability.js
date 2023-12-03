document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth', // Default view
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
        }
    });
    calendar.render();

    // Fetch and display events data
    // API/Availability end point needs to be made
    fetch('/api/availability')
        .then(response => response.json())
        .then(eventsData => {
            eventsData.forEach(event => {
                calendar.addEvent(event);
            });
        });
   // Event listeners for view toggle buttons
    document.getElementById('toggleMonth').addEventListener('click', function() {
        calendar.changeView('dayGridMonth');
    });
    document.getElementById('toggleWeek').addEventListener('click', function() {
        calendar.changeView('dayGridWeek');
    });
});