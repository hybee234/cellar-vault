document.addEventListener('DOMContentLoaded', () => {
    // Modals and modal close buttons
    const editModal = document.getElementById('editModal');  //edit-brand-modal
    const editModalClose = document.getElementById('editModalClose');
    const editBrandCancelButtonEl = document.getElementById('edit-brand-cancel-button');
    

    const deactivateModal = document.getElementById('deactivateModal');    
    const inactivateModalCloseButtonEl = document.getElementById('inactivate-brand-close-button');
    const inactivateModalCancelButtonEl = document.getElementById('inactivate-brand-cancel-button');

    const addBrandModalEl = document.getElementById('add-brand-modal');
    const addBrandCloseButtonEl = document.getElementById('add-brand-close-button');
    const addBrandCancelButtonEl = document.getElementById('add-brand-cancel-button');

    // Form elements
    const addBrandForm = document.getElementById('add-brand-form');    
    const editForm = document.getElementById('editForm');  //edit-brand-form
    const editedBrandNameInput = document.getElementById('editedBrandName');
    const newBrandNameInput = document.getElementById('new-brand-name');
    const deactivateForm = document.getElementById('deactivateForm');    
    const editBrandDeleteButtonEl = document.getElementById('edit-brand-delete-button')

    // Open Add Brand Modal (Show)
    const addBrandOpenModalButton = document.getElementById('add-brand-open-modal');
    addBrandOpenModalButton.addEventListener('click', () => {
        addBrandModalEl.style.display = 'block';
    });

    // Close Modals (Hide) - Event Listeners
    editModalClose.addEventListener('click', () => editModal.style.display = 'none');
    editBrandCancelButtonEl.addEventListener('click', () => editModal.style.display = 'none');
    addBrandCloseButtonEl.addEventListener('click', () => addBrandModalEl.style.display = 'none');
    addBrandCancelButtonEl.addEventListener('click', () => addBrandModalEl.style.display = 'none');
    inactivateModalCloseButtonEl.addEventListener('click', () => deactivateModal.style.display = 'none');
    inactivateModalCancelButtonEl.addEventListener('click', () => deactivateModal.style.display = 'none');

    // Add Brand form submission
    addBrandForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const brandName = newBrandNameInput.value;

        console.log(brandName)
        console.log(JSON.stringify({ brand_name: brandName }))
        
        try {
            const response = await fetch('/api/brand', {
                method: 'POST',
                body: JSON.stringify({ brand_name: brandName }),
                headers: {
                    'Content-Type': 'application/json',
                },
                
            });

            if (response.ok) {
                window.location.reload();
            }            
        } catch (error) {
            console.error(error)
        }

        addBrandModalEl.style.display = 'none';
    });

    // Edit Brand click event
    document.querySelectorAll('.edit.fa-regular.fa-pen-to-square').forEach(editButton => {
        editButton.addEventListener('click', (event) => {
            console.log("test")
            const brandId = event.target.dataset.brandId;
            const currentBrandName = event.target.closest('tr').querySelector('td').textContent.trim();
            editedBrandNameInput.value = currentBrandName;
            editForm.dataset.brandId = brandId;
            editModal.style.display = 'block';
            editBrandDeleteButtonEl.value = event.target.dataset.brandId;

            // Add brandName to Delete Button (data-brand-name) to pass on the value for display on inactivate Modal
            const brandName = event.target.dataset.brandName;
            editBrandDeleteButtonEl.setAttribute('data-brand-name', brandName);
        });
    });

    // Edit Form Submission
    editForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const brandId = editForm.dataset.brandId;
        const updatedBrandName = editedBrandNameInput.value;

// console.log(brandId)
// console.log(updatedBrandName)

        try {

            const response = await fetch(`/api/brand/${brandId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ brand_name: updatedBrandName })
            });
            if (response.ok) {
                window.location.reload();
            }
        } catch (error) {
            console.error(error)
        }

        editModal.style.display = 'none';
    });

    // Inactivate Brand click event
    // document.querySelectorAll('.delete.fa-regular.fa-circle-xmark').forEach(deleteButton => {
    //     deleteButton.addEventListener('click', (event) => {
    //         const brandId = event.target.dataset.brandId;
    //         document.getElementById('deactivateBrandId').value = brandId;

    //         const brandName = event.target.dataset.brandName;
    //         document.getElementById('inactivate-wine-heading').textContent = brandName;
    //         deactivateModal.style.display = 'block';
    //     });
    // });

    //Listener - Update Modal - Delete Brand Button - Show Inactivate Modal
    
    editBrandDeleteButtonEl.addEventListener('click', function (event) { 
        console.log(event.target)
        const brandName = event.target.dataset.brandName;
        document.getElementById('inactivate-wine-heading').textContent = brandName;
        deactivateModal.style.display = 'block';    // Show ianctivate brand modal
        editModal.style.display = 'none';           // Hide edit brand modal
    });


    // Listener - Inactivate Modal Form Submission (Confirm Delete button)
    deactivateForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const brandId = editBrandDeleteButtonEl.value

        try {
            const response = await fetch(`/api/brand/inactivate/${brandId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                window.location.reload();
            }
        } catch (error) {
            console.error(error)
        }

        deactivateModal.style.display = 'none';
    });
});
