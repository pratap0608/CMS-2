// --- Form References ---
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginFormContent = document.getElementById('loginFormContent');
const signupFormContent = document.getElementById('signupFormContent');
const forgotPasswordModal = document.getElementById('forgotPasswordModal');

// --- Form Toggling ---
function showSignup() {
    loginForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
}

function showLogin() {
    signupForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
}

// --- CAPTCHA Logic ---
function generateSignupCaptcha() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
        captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    document.getElementById('signupCaptchaText').textContent = captcha;
}

// --- Forgot Password Modal Logic ---
function showForgotPassword() {
    forgotPasswordModal.style.display = 'flex';
}

function hideForgotPassword() {
    forgotPasswordModal.style.display = 'none';
}

function resetPassword() {
    const email = document.getElementById('forgotEmail').value;
    if (email) {
        alert(`Password reset instructions sent to ${email}`);
        hideForgotPassword();
    } else {
        alert("Please enter your email.");
    }
}

// --- Event Listeners ---
loginFormContent.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Dummy validation
    if (username === "admin" && password === "password") {
        alert("Login successful! Redirecting...");
        window.location.href = "index.html"; // Redirect to the main dashboard
    } else {
        document.getElementById('loginErrorMessage').style.display = "block";
    }
});

signupFormContent.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const captchaInput = document.getElementById('signupCaptchaInput').value;
    const captchaText = document.getElementById('signupCaptchaText').textContent;

    // Dummy validation
    if (username && email && password && captchaInput === captchaText) {
        alert("Signup successful! Please log in.");
        showLogin();
    } else {
        document.getElementById('signupErrorMessage').style.display = "block";
        generateSignupCaptcha();
        document.getElementById('signupCaptchaInput').value = "";
    }
});

window.addEventListener('click', function (event) {
    if (event.target == forgotPasswordModal) {
        hideForgotPassword();
    }
});

// Generate the first CAPTCHA on page load
generateSignupCaptcha();
