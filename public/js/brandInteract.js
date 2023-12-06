document.addEventListener('DOMContentLoaded', () => {
    // Modals and modal close buttons
    const editModal = document.getElementById('editModal');
    const addBrandModal = document.getElementById('add-brand-modal');
    const deactivateModal = document.getElementById('deactivateModal');
    const editModalClose = document.getElementById('editModalClose');
    const addBrandModalClose = document.getElementById('add-brand-close');
    const cancelDeactivate = document.getElementById('cancelDeactivate');

    // Form elements
    const editForm = document.getElementById('editForm');
    const addBrandForm = document.getElementById('add-brand-form');
    const editedBrandNameInput = document.getElementById('editedBrandName');
    const newBrandNameInput = document.getElementById('new-brand-name');
    const deactivateForm = document.getElementById('deactivateForm');

    // Open Add Brand Modal
    const addBrandOpenModalButton = document.getElementById('add-brand-open-modal');
    addBrandOpenModalButton.addEventListener('click', () => {
        addBrandModal.style.display = 'block';
    });

    // Close Modals
    editModalClose.addEventListener('click', () => editModal.style.display = 'none');
    addBrandModalClose.addEventListener('click', () => addBrandModal.style.display = 'none');
    cancelDeactivate.addEventListener('click', () => deactivateModal.style.display = 'none');

    // Add Brand form submission
    addBrandForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const brandName = newBrandNameInput.value;

        try {
            const response = await fetch('/api/brand', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ brand_name: brandName })
            });

            if (response.ok) {
                window.location.reload();
            }
            // No need for else as we are handling the error silently
        } catch (error) {
            // Error handling can be done here if needed
        }

        addBrandModal.style.display = 'none';
    });

    // Edit Brand click event
    document.querySelectorAll('.edit.fa-regular.fa-pen-to-square').forEach(editButton => {
        editButton.addEventListener('click', (event) => {
            const brandId = event.target.dataset.brandId;
            const currentBrandName = event.target.closest('tr').querySelector('td').textContent.trim();
            editedBrandNameInput.value = currentBrandName;
            editForm.dataset.brandId = brandId;
            editModal.style.display = 'block';
        });
    });

    // Edit Form Submission
    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const brandId = editForm.dataset.brandId;
        const updatedBrandName = editedBrandNameInput.value;

        try {
            const response = await fetch(`/api/brand/update/${brandId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ brand_name: updatedBrandName })
            });

            if (response.ok) {
                window.location.reload();
            }
        } catch (error) {
            // Error handling can be done here if needed
        }

        editModal.style.display = 'none';
    });

    // Deactivate Brand click event
    document.querySelectorAll('.delete.fa-regular.fa-circle-xmark').forEach(deleteButton => {
        deleteButton.addEventListener('click', (event) => {
            const brandId = event.target.dataset.brandId;
            document.getElementById('deactivateBrandId').value = brandId;
            deactivateModal.style.display = 'block';
        });
    });

    

    // Deactivate Form Submission
    deactivateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const brandId = document.getElementById('deactivateBrandId').value;

        try {
            const response = await fetch(`/api/brand/inactivate/${brandId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                window.location.reload();
            }
        } catch (error) {
            // Error handling can be done here if needed
        }

        deactivateModal.style.display = 'none';
    });
});
