const signUpFormHandler = async (event) => {
    event.preventDefault();

    const firstName = document.querySelector('#firstname-signup').ariaValueMax.trim();
    const lastName = document.querySelector('#lastname-signup').value.trim();
    // const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (firstName && lastName && username && email && password) {
        const response = await fetch('api/users', {
            method: 'POST',
            body: JSON.stringify({ firstName, lastName, username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to Sign Up');
        }
    }
};

document
    .querySelector('#signUpButton')
    .addEventListener('submit', signUpFormHandler);


document.addEventListener('DOMContentLoaded', function () {
    const returnToLoginButton = document.getElementById('returnToLogin');

    if (returnToLoginButton) {
    console.log('Button found, adding event listener'); // For debugging purposes
    returnToLoginButton.addEventListener('click', function() {
        console.log('Button clicked'); // For debugging purposes
        window.location.href = '/login';
    });
    } else {
    console.log('Button not found'); // For debugging purposes
    }
});
