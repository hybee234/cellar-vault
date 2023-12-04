const express = require('express');
const router = express.Router();
const { Brand, Wine, Vintage, Transaction } = require('../models');
const checkBrandId = require('./../utils/checkBrandId');
const checkWineId = require('./../utils/checkWineId');
const checkVintageId = require('./../utils/checkVintageId');
const checkTransactionId = require('./../utils/checkTransactionId');


// Welcome page - Login/Sign Up route
router.get('/auth', (req, res) => {
    res.status(200).render('auth', {
        logged_in: req.session.logged_in
    });
});


//------------------------------------------------------------------------//
//- Brand Page (Home) GET - Route to render the homepage with Brand data -//
//------------------------------------------------------------------------//

router.get('/', async (req, res) => {
    try {
        // Pull all active brands
        const getActiveBrand = await Brand.findAll({            
            where: { active_ind: 1 }
        });
        // Serielize the Data
        const brands = getActiveBrand.map(brand => brand.get({ plain: true }));

        // Response - render the page
        res.status(200).render('brand', {
            brands,
            loggedIn: req.session.loggedIn
        });         
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error', error: err });
    }
});

//--------------------------------------------------------------------------------//
//- Wine Page - GET - All active Wines (and Child Vintages) under Selected Brand -//
//--------------------------------------------------------------------------------//

router.get('/wine/:brand_id', checkBrandId, async (req, res) => {    //checkBrandId = checkBrand ID exists
    try {
        // GET all active Wines and attached Vintages under target Brand_ID       
        const getActiveWines = await Wine.findAll({            
            where: {
                active_ind: 1, // Only include active rows on all tables
                brand_id: req.params.brand_id  // where brand ID matches the brand ID in URL                        
            },          
            include: [{ model: Vintage }, {model: Brand}]
        });
         //Serialize the data
        const wines = getActiveWines.map(wine => wine.get({ plain: true }));

        // Response - render the page
        res.status(200).render('wine', {
            wines,
            loggedIn: req.session.loggedIn
        });    

        // res.status(200).json(wines);
    } catch (err) {
        console.error(err);
        res.status(500).json(err); // Status 500 - Internal Server Error
    }
});





// Transaction page - Transactions listed by Vintage ID

//-----------------------------------------------------------//
//- GET - All active Transactions under Selected Vintage ID -//
//-----------------------------------------------------------//

// API: http://localhost:3001/api/transaction/:vintage_id
// Example : http://localhost:3001/api/transaction/:1
// No JSON Body required

router.get('/transaction/:vintage_id', checkVintageId, async (req, res) => {
    try {
        // GET all active Transactions under target Vintage_ID
        const getActiveTransactions = await Transaction.findAll({
            //attributes: ['wine_id', 'wine_name', 'active_ind', 'brand_id'], // Specify the columns to fetch
            where: {
                active_ind: 1, // This will only include brands where active_ind is 1
                vintage_id: req.params.vintage_id  // where brand ID matches the brand ID in URL
            }
        });
        res.status(200).json(getActiveTransactions);
    } catch (err) {
        console.error(err);
        res.status(500).json(err); // Status 500 - Internal Server Error
    }
});


module.exports = router;
