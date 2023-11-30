const signUpFormHandler = async (event) => {
    event.preventDefault();
    console.log('Form submitted');

    const firstname = document.querySelector('#firstname-signup').value.trim();
    const lastname = document.querySelector('#lastname-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (firstname && lastname && email && password) {
        try {
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                body: JSON.stringify({ firstname, lastname, email, password }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                document.location.replace('/');
            } else {
                alert('Failed to Sign Up');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred. Please try again later.');
        }
    } else {
        alert('Please enter all required information');
    }
};

document
    .querySelector('#signUpButton')
    .addEventListener('click', signUpFormHandler);


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
