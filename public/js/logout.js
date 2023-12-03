const logoutHandler = async (event) => {
    event.preventDefault();

    const response = await fetch('/logout', {
        method: 'POST',
        
    });
    
    if (response.ok) {
        // Logout successful
        console.log('Logged out successfully');
        // Take to login page
        window.location.href = '/login';
        hideButton()
    } else {
        // Logout failed
        console.error('Logout failed');
    }
};

document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname == '/login' || window.location.pathname == '/signup') {
        document.getElementById('logout-form').style.display = 'none';
    } else {
        document.getElementById('logout-form').style.display = 'block';
    }
});



    


  


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#logout-form').addEventListener('submit', logoutHandler);
});

