// Get the modal and the button to open it
var modal = document.getElementById("myModal");
var btn = document.getElementById("createEventButton");
var span = document.getElementById("closeModal");
const guestsList = document.getElementById('guests-list');

document.addEventListener('DOMContentLoaded', () => {
    const guestsList = document.getElementById('guests-list');
    const invitedGuestsList = document.getElementById('invited-guests-list');

    function populateGuests() {
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
                    option.textContent = `${user.firstname} ${user.lastname}`;
                    guestsList.appendChild(option);
            });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
      
    
    function inviteGuestHandler(guestOption) {
        const clonedOption = guestOption.cloneNode(true);
        invitedGuestsList.appendChild(clonedOption); 
        guestsList.removeChild(guestOption);
      }

      guestsList.addEventListener('click', (event) => {
        if (event.target.tagName === 'OPTION') {
          inviteGuestHandler(event.target);
        }
      });


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