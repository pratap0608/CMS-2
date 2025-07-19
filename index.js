// --- DOM Element References ---
const sidebar = document.getElementById('sidebar');
const accountModal = document.getElementById('accountModal');
const logoutMessageModal = document.getElementById('logoutMessageModal');

/**
 * Toggles the visibility of the sidebar.
 */
function toggleSidebar() {
    if (sidebar) {
        sidebar.classList.toggle('open');
        if (sidebar.classList.contains('open')) {
            sidebar.classList.remove('-left-64');
            sidebar.classList.add('left-0');
        } else {
            sidebar.classList.remove('left-0');
            sidebar.classList.add('-left-64');
        }
    }
}

/**
 * Shows the account information modal.
 */
function showAccount() {
    if (accountModal) {
        accountModal.classList.remove('hidden');
        accountModal.classList.add('flex');
    }
}

/**
 * Hides the account information modal.
 */
function hideAccount() {
    if (accountModal) {
        accountModal.classList.remove('flex');
        accountModal.classList.add('hidden');
    }
}

/**
 * Shows the logout success message modal.
 */
function showLogoutMessage() {
    if (logoutMessageModal) {
        logoutMessageModal.classList.remove('hidden');
        logoutMessageModal.classList.add('flex');
    }
}

/**
 * Hides the logout success message modal.
 */
function hideLogoutMessage() {
    if (logoutMessageModal) {
        logoutMessageModal.classList.remove('flex');
        logoutMessageModal.classList.add('hidden');
    }
}

/**
 * Handles the complete logout process.
 */
function logout() {
    hideAccount(); // Hide the account modal first
    showLogoutMessage(); // Show the custom logout message modal
}

// --- Global Event Listeners ---

// Listener for the sidebar toggle icon
const sidebarToggler = document.getElementById('sidebar-toggle');
if (sidebarToggler) {
    sidebarToggler.addEventListener('click', toggleSidebar);
}

// Listener for the account button
const accountButton = document.getElementById('account-btn');
if (accountButton) {
    accountButton.addEventListener('click', showAccount);
}

// Listener for the main logout button
const logoutButton = document.getElementById('logout-btn');
if (logoutButton) {
    logoutButton.addEventListener('click', logout);
}

// Listener for the "OK" button on the logout success message
const closeLogoutMsgBtn = document.getElementById('close-logout-msg-btn');
if (closeLogoutMsgBtn) {
    closeLogoutMsgBtn.addEventListener('click', hideLogoutMessage);
}


// Close modals when clicking on the background overlay
window.addEventListener('click', function(event) {
    if (event.target === accountModal) {
        hideAccount();
    }
    if (event.target === logoutMessageModal) {
        hideLogoutMessage();
    }
});
