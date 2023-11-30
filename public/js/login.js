const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const result = await response.json();
                const userId = result.user_id;
                
                // Constructs the URL for the user's home page
                const homeUrl = `/home/${userId}`;
                console.log('Logging Successful');
                
                // Redirects to the user's home page
                window.location.href = homeUrl;
            } else {
                // Authentication failed response
                const result = await response.json();
                alert(result.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred. Please try again later.');
        }
    } else {
        alert('Please enter both email and password');
    }
};

document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);

// Wait for the document to be fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Select the button by its ID
    const signupButton = document.getElementById('signUpButton');
    // Add a click event listener to the button
    signupButton.addEventListener('click', function () {
        // Navigate to the signup page when the button is clicked
        window.location.href = '/signup';
    });
});

