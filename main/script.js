// Modal elements
const modal = document.getElementById('authModal');
const modalTitle = document.getElementById('modalTitle');
const authForm = document.getElementById('authForm');
const authUsername = document.getElementById('authUsername');
const authEmail = document.getElementById('authEmail');
const authPassword = document.getElementById('authPassword');
const authBirthday = document.getElementById('authBirthday');
const birthdayGroup = document.getElementById('birthdayGroup');
const authRoleSelect = document.getElementById('authRole');
const toggleAuthModeSpan = document.getElementById('toggleAuthMode');
const toggleTextSpan = document.getElementById('toggleAuthText');
const formErrorDiv = document.getElementById('formError');
const closeModalBtn = document.getElementById('closeModalBtn');

let currentAuthMode = 'login'; // 'login' or 'signup'

// Helper: open modal with specific mode
function openModal(mode = 'login') {
  currentAuthMode = mode;
  updateModalUI();
  modal.style.display = 'flex';
  formErrorDiv.innerText = '';
  // Reset form fields
  authUsername.value = '';
  authEmail.value = '';
  authPassword.value = '';
  authBirthday.value = '';
  authRoleSelect.value = 'user';
}

// Close modal
function closeModal() {
  modal.style.display = 'none';
}

// Update modal UI based on current mode (login/signup)
function updateModalUI() {
  if (currentAuthMode === 'login') {
    modalTitle.innerText = 'Log in to LesGo';
    birthdayGroup.style.display = 'none';
    authBirthday.removeAttribute('required');
    toggleTextSpan.innerHTML = `Don't have an account? <span class="toggle-auth" id="toggleAuthMode">Sign up</span>`;
  } else {
    modalTitle.innerText = 'Create your LesGo account';
    birthdayGroup.style.display = 'block';
    authBirthday.setAttribute('required', 'required');
    toggleTextSpan.innerHTML = `Already have an account? <span class="toggle-auth" id="toggleAuthMode">Log in</span>`;
  }
  
  // Re-attach event listener to the new toggle element
  const newToggle = document.getElementById('toggleAuthMode');
  if (newToggle) {
    newToggle.addEventListener('click', (e) => {
      e.preventDefault();
      toggleAuthMode();
    });
  }
}

// Toggle between login and signup modes
function toggleAuthMode() {
  if (currentAuthMode === 'login') {
    currentAuthMode = 'signup';
  } else {
    currentAuthMode = 'login';
  }
  updateModalUI();
  formErrorDiv.innerText = '';
}

// Handle form submission (login/signup)
function handleAuthSubmit(e) {
  e.preventDefault();
  
  const username = authUsername.value.trim();
  const email = authEmail.value.trim();
  const password = authPassword.value;
  const role = authRoleSelect.value; // 'user' or 'admin'
  let birthday = null;
  
  // Validation
  if (!username || !email || !password) {
    formErrorDiv.innerText = 'All fields are required.';
    return;
  }
  
  if (password.length < 4) {
    formErrorDiv.innerText = 'Password must be at least 4 characters.';
    return;
  }
  
  const emailPattern = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
  if (!emailPattern.test(email)) {
    formErrorDiv.innerText = 'Please provide a valid email address.';
    return;
  }
  
  if (currentAuthMode === 'signup') {
    birthday = authBirthday.value;
    if (!birthday) {
      formErrorDiv.innerText = 'Please enter your birthday.';
      return;
    }
    // Optional: validate birthday is not in future
    const birthDate = new Date(birthday);
    const today = new Date();
    if (birthDate > today) {
      formErrorDiv.innerText = 'Birthday cannot be in the future.';
      return;
    }
    
    // Signup success simulation
    alert(`🎉 Signup successful, ${username}!\n\nRole: ${role === 'admin' ? 'Admin/Tutor' : 'Student'}\nBirthday: ${birthday}\nEmail: ${email}\n\nYou can now log in.`);
    closeModal();
  } else {
    // Login success simulation
    alert(`✅ Welcome back, ${username}!\n\nLogged in as ${role === 'admin' ? 'Admin/Tutor' : 'Student'}.\nEmail: ${email}\n\n( Demo mode - dashboard would open here )`);
    closeModal();
  }
  
  formErrorDiv.innerText = '';
}

// Event listeners for all login/signup buttons on the page
document.getElementById('navLoginBtn')?.addEventListener('click', () => openModal('login'));
document.getElementById('navSignupBtn')?.addEventListener('click', () => openModal('signup'));
document.getElementById('heroSignupBtn')?.addEventListener('click', () => openModal('signup'));
document.getElementById('heroLoginBtn')?.addEventListener('click', () => openModal('login'));
document.getElementById('ctaSignupBtn')?.addEventListener('click', () => openModal('signup'));

// Close modal events
closeModalBtn?.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Form submit handler
authForm.addEventListener('submit', handleAuthSubmit);

// Initial setup for toggle (in case the static toggle exists)
const initialToggle = document.getElementById('toggleAuthMode');
if (initialToggle) {
  initialToggle.addEventListener('click', (e) => {
    e.preventDefault();
    toggleAuthMode();
  });
}

console.log('LesGo main page ready — find your perfect tutor today!');
// Add this function to handle chat navigation
function navigateToChatPage() {
    // Navigate to the chat folder (relative path from main folder)
    window.location.href = '../chat/index.html';
}

// Then attach it to the "Open all chats" button
// Make sure this runs AFTER the dashboard is rendered or when the button exists
document.getElementById('viewAllChatsBtn')?.addEventListener('click', navigateToChatPage);