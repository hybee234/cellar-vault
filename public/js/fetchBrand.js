document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('brandListContainer');
  const list = container.querySelector('ul');

  fetch('/api/brand', {
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => response.json())
    .then(brands => {
      if (brands && brands.length > 0) {
        brands.forEach(brand => {
          const listItem = document.createElement('li');
          // Assuming you have a brand ID to use for the redirection
          listItem.setAttribute('data-wine-id', brand.id); 
          listItem.textContent = brand.brand_name;
          // Add a click listener for each brand
          listItem.addEventListener('click', function () {
            // Redirect to the vintage route for this brand
            window.location.href = `/api/vintage/${brand.id}`;
          });
          list.appendChild(listItem);
        });
      } else {
        container.textContent = 'No brands available.';
      }
    })
    .catch(error => {
      console.error('Error fetching brand data:', error);
      container.textContent = 'Error loading brands.';
    });
});
