document.addEventListener('DOMContentLoaded', () => {
    // Handle "Edit" button click
    const editButtons = document.querySelectorAll('.edit.fa-regular.fa-pen-to-square');
    editButtons.forEach(editButton => {
        editButton.addEventListener('click', async (event) => {
            const brandId = event.target.getAttribute('data-brand-id');

            // Replace the prompt dialog with your own form or modal for editing
            const editedBrandName = prompt(`Edit brand name for brand with ID ${brandId}:`, event.target.getAttribute('data-brand-name'));

            if (editedBrandName !== null) {
                try {
                    // Send a POST request to update the brand name
                    const response = await fetch(`/api/brand/update/${brandId}`, {
                        method: 'POST', // Use POST method
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ brandName: editedBrandName })
                    });

                    if (response.ok) {
                        alert('Brand name updated successfully');
                        location.reload();
                    } else {
                        alert('Failed to update brand name');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        });
    });

    // Handle "Deactivate" button click
    const deleteButtons = document.querySelectorAll('.delete.fa-regular.fa-circle-xmark');
    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', async (event) => {
            const brandId = event.target.getAttribute('data-brand-id');

            if (confirm(`Are you sure you want to deactivate the brand with ID ${brandId}?`)) {
                try {
                    const response = await fetch(`/api/brand/inactivate/${brandId}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' }
                    });

                    if (response.ok) {
                        alert('Brand deactivated successfully');
                        location.reload();
                    } else {
                        alert('Failed to deactivate brand');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }

            // Prevent the default link action
            event.preventDefault();
        });
    });

    // Handle clicking on a brand to redirect to wine.handlebars
    const brandLinks = document.querySelectorAll('.brand-link'); // Assuming you have a class for brand links
    brandLinks.forEach(brandLink => {
        brandLink.addEventListener('click', (event) => {
            const brandId = brandLink.getAttribute('data-brand-id'); // Get the brand ID

            // Redirect to the wine page with the selected brand ID
            window.location.href = `/wine/${brandId}`; // Update the URL as needed
        });
    });
});
