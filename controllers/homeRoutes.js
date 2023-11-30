const router = require('express').Router();
const { Brand } = require('../models');

// Route to render the homepage with Brand data
router.get('/', async (req, res) => {
  try {
    // Fetch all active brands from the database with specified attributes
    const brandData = await Brand.findAll({
      attributes: ['brand_name'], // Specify the columns to fetch
      where: {
        active_ind: 1 // This will only include brands where active_ind is 1
      }
    });


    const brands = brandData.map((brand) => brand.get({ plain: true }));
console.log(brands);

    res.render('homepage', {
      brands,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
