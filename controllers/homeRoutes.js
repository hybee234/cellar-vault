const express = require('express');
const router = express.Router();
const { Brand, Wine, Vintage, Transaction, User } = require('../models');
const checkBrandId = require('./../utils/checkBrandId');
const checkWineId = require('./../utils/checkWineId');
const checkVintageId = require('./../utils/checkVintageId');
const checkTransactionId = require('./../utils/checkTransactionId');
const withAuth = require('./../utils/auth'); // Import the withAuth middleware

// Welcome page - Login/Sign Up route
router.get('/auth', (req, res) => {
    res.status(200).render('auth', {
        logged_in: req.session.logged_in
    });
});

// GET route to fetch user details and render the My Profile page based on session ID
router.get('/my-profile', withAuth, async (req, res) => {
    try {
        // Fetch user data based on the session's user ID
        const userData = await User.findByPk(req.session.user_id);

        // Handle case where user data is not found
        if (!userData) {
            res.status(404).send("User not found");
            return;
        }

        // Serialize the user data
        const user = userData.get({ plain: true });

        // Render the 'my-profile' page, passing the user data
        res.render('my-profile', { user, user_id: req.session.user_id });
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json({ message: 'Internal Server Error', error: err });
    }
});
//------------------------------------------------------------------------//
//- Brand Page (Home) GET - Route to render the homepage with Brand data -//
//------------------------------------------------------------------------//

router.get('/', withAuth, async (req, res) => {
    try {
        // Pull all active brands
        const getActiveBrand = await Brand.findAll({
            where: { active_ind: 1 }
        });
        // Serialize the Data
        const brands = getActiveBrand.map(brand => brand.get({ plain: true }));

        // Response - render the page
        res.status(200).render('brand', {
            brands,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error', error: err });
    }
});

//--------------------------------------------------------------------------------//
//- Wine Page - GET - All active Wines (and Child Vintages) under Selected Brand -//
//--------------------------------------------------------------------------------//

router.get('/wine/:brand_id', withAuth, checkBrandId, async (req, res) => { // withAuth middleware added
    try {
        // GET all active Wines and attached Vintages under target Brand_ID       
        const getActiveWines = await Wine.findAll({
            where: {
                active_ind: 1, // Only include active rows on all tables
                brand_id: req.params.brand_id  // where brand ID matches the brand ID in URL                        
            },
            include: [{ model: Vintage }, { model: Brand }]
        });
        //Serialize the data
        const wines = getActiveWines.map(wine => wine.get({ plain: true }));

        // Response - render the page
        res.status(200).render('wine', {
            wines,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err); // Status 500 - Internal Server Error
    }
});

//------------------------------------------------------------------------------//
//- Transaction Page - GET - All active Transactions under Selected Vintage ID -//
//------------------------------------------------------------------------------//

router.get('/transaction/:vintage_id', checkVintageId, async (req, res) => {
    try {
        // GET all active Transactions under target Vintage_ID
        const getActiveTransactions = await Transaction.findAll({
            where: {
                active_ind: 1, // Only include active rows on all tables
                vintage_id: req.params.vintage_id},
            include: [{ model: Vintage}, {model: User}]            
        });
         //Serialize the data
        const transactions = getActiveTransactions.map(transaction => transaction.get({ plain: true }));

        // GET Wine
        const getWine = await Vintage.findOne({
            include: [{ model: Wine}],
            where: {
                active_ind: 1,
                vintage_id: req.params.vintage_id
            },
            
        })
        // const wines = getWine.map(wine => wine.get({ plain: true }));
        const wineArray = getWine.get({ plain: true });
        const wineName = wineArray.Wine.wine_name

        // console.log (wineArray)
        // console.log (wineArray.Wine.wine_name)
        // console.log (wineArray.Wine.wine_id)

                // GET Wine
                const getBrand = await Wine.findOne({
                    include: [{ model: Brand}],
                    where: {
                        active_ind: 1,
                        wine_id: wineArray.Wine.wine_id
                    },
                    
                })
                // const wines = getWine.map(wine => wine.get({ plain: true }));
                const brandArray = getBrand.get({ plain: true });
                brandName = brandArray.brand.brand_name
                
                // console.log (brandArray)
                // console.log (brandArray.brand.brand_name)
                // console.log (brandArray.brand.brand_id)


        // Response - render the page
        res.status(200).render('transaction', {
            transactions, wineArray, brandName,
            loggedIn: req.session.loggedIn
    });    

        // // console.log(brand)
        // res.status(200).json(transactions);

    } catch (err) {
        console.error(err);
        res.status(500).json(err); // Status 500 - Internal Server Error
    }
});

module.exports = router;
