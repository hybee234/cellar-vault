document.addEventListener('DOMContentLoaded', () => {
    // Toggle the visibility of the master dropdown content
    const masterDropdown = document.querySelector('.master-dropdown');
    const masterDropdownContent = masterDropdown.querySelector('.master-dropdown-content');
    const deactivateAllOption = masterDropdownContent.querySelector('.deactivate-all-option');
    const deactivateIndividualOptions = masterDropdownContent.querySelectorAll('.deactivate-individual-option');

    masterDropdown.addEventListener('click', () => {
        masterDropdownContent.classList.toggle('hidden');
    });

    // Handle "Deactivate All" option
    deactivateAllOption.addEventListener('click', async () => {
        if (confirm('Are you sure you want to deactivate all brands?')) {
            try {
                // Perform the deactivation of all brands here

                // Example: You can loop through each brand and deactivate them
                const brands = document.querySelectorAll('.card');
                for (const brand of brands) {
                    const brandId = brand.querySelector('.deactivate-option').getAttribute('data-brand-id');
                    // Perform deactivation for brandId
                }

                alert('All brands deactivated successfully');
                location.reload();
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to deactivate all brands');
            }
        }
    });

    // Handle "Deactivate Individual" options
    deactivateIndividualOptions.forEach(option => {
        option.addEventListener('click', async (event) => {
            const brandId = event.target.getAttribute('data-brand-id');

            if (confirm(`Are you sure you want to deactivate ${event.target.textContent}?`)) {
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

    document.getElementById('brandListContainer').addEventListener('click', async (event) => {
        if (event.target.classList.contains('deactivate-option')) {
            const brandId = event.target.getAttribute('data-brand-id');

            if (confirm('Are you sure you want to deactivate this brand?')) {
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
        }
    });
});
