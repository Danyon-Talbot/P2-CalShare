document.querySelector('#createEventSave').addEventListener('click', async (event) => {
    event.preventDefault();

    const eventName = document.getElementById('eventName').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const invitedGuests = Array.from(document.getElementById('invited-guests-list').options)
        .filter(option => option.selected)
        .map(option => option.value);

    try {
        // Fetch the user ID from session storage
        const userId = sessionStorage.getItem('user_id'); // Make sure 'user_id' matches your session storage key

        const eventData = {
            event_name: eventName,
            creator_id: userId,
            start_time: startTime,
            end_time: endTime,
            guests: invitedGuests,
        };

        // Now you can use the user ID to create the event
        const createEventResponse = await fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        });

        if (!createEventResponse.ok) {
            throw new Error('Network Response: Not OK');
        }

        const newEvent = await createEventResponse.json();
        console.log('Event Saved:', newEvent);

        // Close the modal after the event is saved
        const modal = document.getElementById('myModal');
        modal.style.display = 'none';
    } catch (error) {
        console.error('Error:', error);
    }
});
