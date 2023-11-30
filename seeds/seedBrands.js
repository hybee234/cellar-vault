const { Brand } = require('../models');

const brandData = [
  {
    brand_name: 'Penfolds',
    active_ind: '1',
  },
  {
    brand_name: 'Greenock Creek',
    active_ind: '1',
  },
  {
    brand_name: 'Bass Phillip',
    active_ind: '1',
  },
  {
    brand_name: 'Rockford',
    active_ind: '1',
  },
  {
    brand_name: 'Torbrek',
    active_ind: '0',
  },
];

// This async function will handle the seeding of brands
async function seedBrands() {
  try {
    console.log('Starting to seed brands...');
    await Brand.bulkCreate(brandData);
    console.log('Seeding successful. Seeding complete.');
    process.exit(0); // Exit the process after the seeding is complete
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1); // Exit with an error code if the seeding fails
  }
}

// Call the seedBrands function to perform the seeding
seedBrands();
