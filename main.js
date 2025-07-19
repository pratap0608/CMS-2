// This function runs when the entire page is loaded
document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. Load the reusable navigation bar ---
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            // Place the nav HTML into the placeholder div
            document.getElementById('navbar-placeholder').innerHTML = data;
            
            // --- 2. After navbar is loaded, initialize its functionality ---
            initializeNavbar();
        })
        .catch(error => {
            console.error('Error loading the navigation bar:', error);
        });

});

/**
 * Initializes all functionality related to the navigation bar.
 * This function is called after the nav.html has been successfully loaded.
 */
function initializeNavbar() {
    const profilePicture = document.getElementById('profilePicture');
    const profileDropdown = document.getElementById('profileDropdown');

    // If the profile picture doesn't exist on the page, stop
    if (!profilePicture) return;

    // --- Profile Dropdown Logic ---
    profilePicture.addEventListener('click', function () {
        profileDropdown.classList.toggle('visible');
    });

    // Hide dropdown if clicked outside
    window.addEventListener('click', function(e) {
        if (!profilePicture.contains(e.target) && !profileDropdown.contains(e.target)) {
            profileDropdown.classList.remove('visible');
        }
    });

    // --- User Data Logic ---
    // Try to get user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        // Update profile picture and details if user exists
        document.getElementById('profilePicture').src = user.profilePicture || 'https://via.placeholder.com/45';
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userEmail').textContent = user.email;
    }
}

/**
 * Logs the user out by removing their data from localStorage.
 */
function logout() {
    // Confirm with the user before logging out
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem('user');
        // Redirect to the landing page after logout
        window.location.href = 'landing.html'; 
    }
}

/**
 * Toggles the visibility of a form section.
 * @param {string} sectionSelector - The CSS selector for the section to toggle.
 */
function toggleAddForm(sectionSelector) {
    const formSection = document.querySelector(sectionSelector);
    if (formSection) {
        formSection.classList.toggle('visible');
    }
}
