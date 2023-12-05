document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.querySelector('#signup-form');

  // Function to show toast notification
  function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, duration);
  }

  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.querySelector('#signup-name').value.trim();
    const email = document.querySelector('#signup-email').value.trim();
    const password = document.querySelector('#signup-password').value.trim();

    if (name && email && password) {
      try {
        const response = await fetch('/api/users/signup', {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          // Assuming the response includes the user's name
          const data = await response.json();
          if (data.user && data.user.name) {
            // Store the user's name in localStorage
            localStorage.setItem('userName', data.user.name);
          }
          showToast('Signup successful! Please check your email to verify.');
          // Redirect or update UI as needed
        } else {
          showToast('Signup failed. Please try again.');
        }
      } catch (error) {
        console.error('Failed to sign up:', error);
        showToast('Signup failed. Please try again.');
      }
    }
  });
});
