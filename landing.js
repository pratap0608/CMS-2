document.addEventListener("DOMContentLoaded", function() {

    // --- Sidebar Logic ---
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
    }

    // --- Login Redirect ---
    // Note: The onclick="showLogin()" in the HTML is slightly more direct,
    // but this is how you would do it from a separate JS file.
    const loginButton = document.querySelector('.login-btn');
    if (loginButton) {
        loginButton.addEventListener('click', function() {
            window.location.href = "login.html";
        });
    }

    // --- Fade-in Animation on Scroll ---
    const sections = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing the element once it's visible
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    sections.forEach(section => {
        observer.observe(section);
    });

});
