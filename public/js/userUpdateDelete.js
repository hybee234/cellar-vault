// Function to show a toast notification
function showToast(message, backgroundColor) {
  const toast = document.querySelector('.toast-notification');
  toast.textContent = message;
  toast.style.backgroundColor = backgroundColor;
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);
}

// Password Change Form Submission
document.getElementById('updatePasswordForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const form = this;
  const currentPassword = form.querySelector('input[name="currentPassword"]').value;
  const newPassword = form.querySelector('input[name="newPassword"]').value;
  const actionUrl = form.getAttribute('action');
  const userId = actionUrl.split('/').pop();

  fetch(`/api/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ currentPassword, newPassword })
  })
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
      if (data.message === 'Password updated successfully') {
        showToast('Password changed successfully', 'green');
        setTimeout(() => {
          window.location.href = '/auth'; // Redirect to the authentication page
        }, 3000); // Redirect after showing the toast
      } else {
        showToast(data.message, 'red'); // Show error message from server
      }
    })
    .catch(error => {
      console.error('Error:', error);
      showToast('Error changing password', 'red');
    });
});

// Open the modal for account deletion
document.getElementById('deleteAccountButton').addEventListener('click', function () {
  document.getElementById('deleteAccountModal').style.display = 'block';
});

// Close the modal
document.querySelector('.close').addEventListener('click', function () {
  document.getElementById('deleteAccountModal').style.display = 'none';
});
document.getElementById('cancelDelete').addEventListener('click', function () {
  document.getElementById('deleteAccountModal').style.display = 'none';
});

// Handle account deletion confirmation
document.getElementById('confirmDelete').addEventListener('click', function () {
  const deleteButton = document.getElementById('deleteAccountButton');
  const userId = deleteButton.getAttribute('data-user-id');

  fetch(`/api/users/${userId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => {
      if (response.ok) {
        showToast('Account deleted successfully', 'green');
        setTimeout(() => {
          window.location.href = '/auth'; // Redirect to the authentication page
        }, 3000); // Redirect after 3 seconds to allow the toast to be seen
      } else {
        showToast('Error deleting account', 'red');
      }
      document.getElementById('deleteAccountModal').style.display = 'none';
    })
    .catch(error => {
      console.error('Error:', error);
      showToast('Error deleting account', 'red');
      document.getElementById('deleteAccountModal').style.display = 'none';
    });
});