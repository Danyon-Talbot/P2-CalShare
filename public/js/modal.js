// Get the modal and the button to open it
var modal = document.getElementById("myModal");
var btn = document.getElementById("createEventButton");
var span = document.getElementById("closeModal");
const guestsList = document.getElementById('guests-list');




const invitedGuestsList = document.getElementById('invited-guests-list');
document.addEventListener('DOMContentLoaded', () => {
    function populateGuests() {
        // Clear the existing options in guestsList
        guestsList.innerHTML = '';
        invitedGuestsList.innerHTML = '';

        fetch('/api/users')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((users) => {
                users.forEach((user) => {
                    const option = document.createElement('option');
                    option.value = user.user_id; // Use user_id instead of id
                    option.setAttribute('data-user_id', user.user_id); // Set user_id as data attribute
                    option.textContent = `${user.firstname} ${user.lastname}`;
                    guestsList.appendChild(option);
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const selectedGuestIds = []; // Initialize an array to store selected guest IDs

    function handleGuestList(event) {
        if (event.target.tagName === 'OPTION') {
            const guestOption = event.target;

            if (invitedGuestsList.contains(guestOption)) {
                // Uninvite the guest by moving it back to the guestsList
                const clonedOption = guestOption.cloneNode(true);
                invitedGuestsList.removeChild(guestOption);
                guestsList.appendChild(clonedOption);

                // Remove the guest ID from the selectedGuestIds array
                const guestId = guestOption.getAttribute('data-user_id');
                const index = selectedGuestIds.indexOf(guestId);
                if (index !== -1) {
                    selectedGuestIds.splice(index, 1);
                }
            } else if (guestsList.contains(guestOption)) {
                // Invite the guest by moving it to the invitedGuestsList
                const clonedOption = guestOption.cloneNode(true);
                guestsList.removeChild(guestOption);
                invitedGuestsList.appendChild(clonedOption);

                // Add the guest ID to the selectedGuestIds array
                const guestId = guestOption.getAttribute('data-user_id');
                selectedGuestIds.push(guestId);
            }
        }
    }
    
    document.querySelector('#createEventSave').addEventListener('click', async (event) => {
        event.preventDefault();
    
        const eventName = document.getElementById('eventName').value;
        const startTime = new Date(document.getElementById('startTime').value).toLocaleString();
        const endTime = new Date(document.getElementById('endTime').value).toLocaleString();
        const invitedGuests = selectedGuestIds; // Uses the selectedGuestIds array
    
        try {
            // Fetch the creator's user_id from session storage
            const creatorUserId = sessionStorage.getItem('user_id');
    
            const eventData = {
                event_name: eventName,
                creator_id: creatorUserId, // Use the creator's user_id
                start_time: startTime,
                end_time: endTime,
                guests: invitedGuests,
            };
            console.log(eventData);
    
            // Uses the creator's user_id to create the event
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
    
            for (const guestId of invitedGuests) {
                await fetch('/api/userEvents', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: guestId, // Use the guest's user_id
                        event_id: newEvent.id,
                    }),
                });
            }
    
            // Close the modal after the event is saved
            const modal = document.getElementById('myModal');
            modal.style.display = 'none';
        } catch (error) {
            console.error('Error:', error);
        }
    });
    
    guestsList.addEventListener('click', handleGuestList);
    invitedGuestsList.addEventListener('click', handleGuestList);
    // Open the modal when the button is clicked
    btn.onclick = function() {
        modal.style.display = "flex";
        populateGuests();

    }

    // Close the modal when the close button is clicked
    span.onclick = function() {
        modal.style.display = "none";
    }

    
    // Close the modal when the user clicks outside of it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});