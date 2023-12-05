document.addEventListener('DOMContentLoaded', () => {
    // Modals and modal close buttons
    const editModal = document.getElementById('editModal');
    const deactivateModal = document.getElementById('deactivateModal');
    const editModalClose = document.getElementById('editModalClose');
    const cancelDeactivate = document.getElementById('cancelDeactivate');

    // Form elements
    const editForm = document.getElementById('editForm');
    const editedBrandNameInput = document.getElementById('editedBrandName');
    const deactivateForm = document.getElementById('deactivateForm');

    // Close button actions for modals
    editModalClose.addEventListener('click', () => editModal.style.display = 'none');
    cancelDeactivate.addEventListener('click', () => deactivateModal.style.display = 'none');

    // Edit button click event
    document.querySelectorAll('.edit.fa-regular.fa-pen-to-square').forEach(editButton => {
        editButton.addEventListener('click', (event) => {
            const brandId = event.target.dataset.brandId;
            const currentBrandName = event.target.closest('tr').querySelector('td').textContent.trim();
            editedBrandNameInput.value = currentBrandName;
            editForm.dataset.brandId = brandId;
            editModal.style.display = 'block';
        });
    });

    // Edit form submission
    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const brandId = editForm.dataset.brandId;
        const newBrandName = editedBrandNameInput.value;

        try {
            const response = await fetch(`/api/brand/update/${brandId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ brand_name: newBrandName })
            });

            if (response.ok) {
                alert('Brand name updated successfully');
                window.location.reload();
            } else {
                alert('Failed to update brand name');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error updating brand name');
        }

        editModal.style.display = 'none';
    });

    // Deactivate button click event
    document.querySelectorAll('.delete.fa-regular.fa-circle-xmark').forEach(deleteButton => {
        deleteButton.addEventListener('click', (event) => {
            const brandId = event.target.dataset.brandId;
            document.getElementById('deactivateBrandId').value = brandId;
            deactivateModal.style.display = 'block';
        });
    });

    // Deactivate form submission
    deactivateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const brandId = document.getElementById('deactivateBrandId').value;

        try {
            const response = await fetch(`/api/brand/inactivate/${brandId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                alert('Brand deactivated successfully');
                window.location.reload();
            } else {
                alert('Failed to deactivate brand');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error deactivating brand');
        }

        deactivateModal.style.display = 'none';
    });
});
