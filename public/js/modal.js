// Get the modal and the button to open it
var modal = document.getElementById("myModal");
var btn = document.getElementById("createEventButton");
var span = document.getElementById("closeModal");
const guestsList = document.getElementById('guests-list');

document.addEventListener('DOMContentLoaded', () => {
    const guestsList = document.getElementById('guests-list');
    const invitedGuestsList = document.getElementById('invited-guests-list');

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
                    option.value = user.id;
                    option.setAttribute('data-user_id', user.user_id);
                    option.textContent = `${user.firstname} ${user.lastname}`;
                    guestsList.appendChild(option);
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
      
    
    function handleGuestList(event) {
        if (event.target.tagName === 'OPTION') {
            const guestOption = event.target;
    
            if (invitedGuestsList.contains(guestOption)) {
                // Uninvite the guest by moving it back to the guestsList
                const clonedOption = guestOption.cloneNode(true);
                invitedGuestsList.removeChild(guestOption);
                guestsList.appendChild(clonedOption);
            } else if (guestsList.contains(guestOption)) {
                // Invite the guest by moving it to the invitedGuestsList
                const clonedOption = guestOption.cloneNode(true);
                guestsList.removeChild(guestOption);
                invitedGuestsList.appendChild(clonedOption);
            }
        }
    }
    
    guestsList.addEventListener('click', handleGuestList);
    invitedGuestsList.addEventListener('click', handleGuestList)
    




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