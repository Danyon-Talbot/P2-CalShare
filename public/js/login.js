const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('User Does Not Exist');
        }
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

