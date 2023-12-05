document.addEventListener('DOMContentLoaded', function () {
  const profileButton = document.getElementById('profile-button');
  const profileDropdown = document.getElementById('profile-dropdown');

  // Function to toggle the dropdown
  function toggleDropdown() {
    profileDropdown.classList.toggle('show');
  }

  // Function to close the dropdown
  function closeDropdown() {
    if (profileDropdown.classList.contains('show')) {
      profileDropdown.classList.remove('show');
    }
  }

  // Toggle dropdown on profile button click
  profileButton.addEventListener('click', function (event) {
    toggleDropdown();
    event.stopPropagation(); // Prevent event from propagating to document
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function (event) {
    if (!profileButton.contains(event.target) && !profileDropdown.contains(event.target)) {
      closeDropdown();
    }
  });

  // Close dropdown on pressing Escape key
  document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
      closeDropdown();
    }
  });

  // Retrieve the user's name from localStorage
  const userName = localStorage.getItem('userName');
  if (userName) {
    const welcomeMessage = document.querySelector('#profile-dropdown p');
    welcomeMessage.textContent = `Welcome, ${userName}`;
  }
});
