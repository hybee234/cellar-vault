document.addEventListener('DOMContentLoaded', () => {
    const brandListContainer = document.getElementById('brandListContainer');

    brandListContainer.addEventListener('click', async (event) => {
        if (event.target.classList.contains('inactivate-btn')) {
            const brandId = event.target.getAttribute('data-brand-id');

            if (confirm('Are you sure you want to deactivate this brand?')) {
                try {
                    const response = await fetch(`/api/brand/inactivate/${brandId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });

                    if (response.ok) {
                        // Handle the UI update or page refresh after successful deactivation
                        alert('Brand deactivated successfully');
                        location.reload();
                    } else {
                        alert('Failed to deactivate brand');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        }
    });
});
