// document.addEventListener('DOMContentLoaded', function () {
//   const container = document.getElementById('brandListContainer');
//   const list = container.querySelector('ul');

//   fetch('/api/brand', {
//     headers: {
//       'Accept': 'application/json'
//     }
//   })
//     .then(response => response.json())
//     .then(brands => {
//       if (brands && brands.length > 0) {
//         brands.forEach(brand => {
//           const listItem = document.createElement('li');
//           listItem.textContent = brand.brand_name;
//           list.appendChild(listItem);
//         });
//       } else {
//         container.textContent = 'No brands available.';
//       }
//     })
//     .catch(error => {
//       console.error('Error fetching brand data:', error);
//       container.textContent = 'Error loading brands.';
//     });
// });
