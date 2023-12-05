// Function to show toast notification
function showToast(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  document.body.appendChild(toast);

  // Set the toast to disappear after the duration
  setTimeout(() => {
    toast.remove();
  }, duration);
}

// Listen for the 'DOMContentLoaded' event to ensure the DOM is fully loaded before attaching event handlers
document.addEventListener('DOMContentLoaded', () => {

  // Attach event handler to the login form submission
  const loginForm = document.querySelector('#login-form');

  loginForm.addEventListener('submit', async (event) => {

    // Prevent default form submission behavior
    event.preventDefault();

    // Get the email and password from the form
    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    // Make a POST request to the login API if both email and password are provided
    if (email && password) {
      try {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });

        // Handle the response: redirect on success or show an alert on failure
        if (response.ok) {
          const data = await response.json();
          // Assuming the response includes the user's name
          if (data.user && data.user.name) {
            // Store the user's name in localStorage or sessionStorage
            localStorage.setItem('userName', data.user.name);
          }
          console.log('Login successful');
          // Redirect users to homepage after login is successful
          document.location.replace('/');
        } else {
          const errorData = await response.json();
          showToast(`Login failed: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Failed to log in:', error);
        showToast('Login failed. Please try again.');
      }
    }
  });
});
