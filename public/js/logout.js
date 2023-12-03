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
    } else {
        // Logout failed
        console.error('Logout failed');
    }
};


  


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#logout-form').addEventListener('submit', logoutHandler);
});