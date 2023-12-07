const express = require('express');
const router = express.Router();
const { Brand, Wine, Vintage, Transaction, User } = require('../models');
const checkBrandId = require('./../utils/checkBrandId');
const checkWineId = require('./../utils/checkWineId');
const checkVintageId = require('./../utils/checkVintageId');
const checkTransactionId = require('./../utils/checkTransactionId');
const withAuth = require('./../utils/auth');
// const sequelize = require('./../config/connection');

//--------------------------------------//
//- Welcome page - Login/Sign Up route -//
//--------------------------------------//

router.get('/auth', (req, res) => {
    // GET Login Page
    console.log (`\x1b[34m GET - Home routes: '/auth'\x1b[0m`)
    console.log (`\x1b[34m GET - Login Page: \x1b[0m`) 
    res.status(200).render('auth', {
        logged_in: req.session.logged_in
    });
});

//-----------------------------------//
//- Welcome page - My Profile route -//
//-----------------------------------//

// GET route to fetch user details and render the My Profile page based on session ID
router.get('/my-profile', withAuth, async (req, res) => {
    try {
        // GET User data based on the session's user ID
        console.log (`\x1b[34m GET - Home routes: '/my-profile'\x1b[0m`)
        console.log (`\x1b[34m GET - ONE User data by session's User ID: \x1b[0m`) 
        const userData = await User.findByPk(req.session.user_id);

        // Handle case where user data is not found
        if (!userData) {
            res.status(404).send("User not found");
            return;
        }

        // Serialize the user data
        const user = userData.get({ plain: true });

        // Render the 'my-profile' page, passing the user data
        res.render('my-profile', { user, user_id: req.session.user_id, logged_in: req.session.logged_in });
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
        // GET ALL Active Brands
        console.log (`\x1b[34m GET - Home routes: '/'\x1b[0m`)
        console.log (`\x1b[34m GET - ALL Brand Records: \x1b[0m`) 
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
        // GET ALL Active Wine Records by Brand_ID, LEFT JOIN ALL Active Vintages
        console.log (`\x1b[34m GET - Home routes: '/wine/:brand_id'\x1b[0m`)
        console.log (`\x1b[34m GET ALL Active Wine Records by Brand_ID, LEFT JOIN ALL Active Vintages (1/2): \x1b[0m`)     
        const getActiveWines = await Wine.findAll({
            where: {
                active_ind: 1, // Only include active rows on all tables
                brand_id: req.params.brand_id,             
            },
            include: [{model: Vintage,
                where: {active_ind: 1},
                required:false    
            }]
        });

        //Serialize the data
        const wines = getActiveWines.map(wine => wine.get({ plain: true }));

        // GET one Brand by Brand ID
        console.log (`\x1b[34m GET - Home routes: '/wine/:brand_id'\x1b[0m`)
        console.log (`\x1b[34m GET - ONE Brand Record by Brand ID (2/2): \x1b[0m`)               
        const getBrand = await Brand.findAll({
            where: {
                active_ind: 1, // Only include active rows on all tables
                brand_id: req.params.brand_id  // where brand ID matches the brand ID in URL                        
            },
        });
        //Serialize the data
        const brand = getBrand.map(data => data.get({ plain: true }));

        // Response - render the page
        res.status(200).render('wine', {
            wines,
            brand,
            logged_in: req.session.logged_in
        });

        // res.status(200).json(wines)

    } catch (err) {
        console.error(err);
        res.status(500).json(err); // Status 500 - Internal Server Error
    }
});

//------------------------------------------------------------------------------//
//- Transaction Page - GET - All active Transactions under Selected Vintage ID -//
//------------------------------------------------------------------------------//

router.get('/transaction/:vintage_id', withAuth, checkVintageId, async (req, res) => {
    try {
        // GET all active Transactions under target Vintage_ID
        console.log (`\x1b[34m GET - Home routes: '/transaction/:vintage_id'\x1b[0m`)
        console.log (`\x1b[34m GET - ALL Transaction Records under Vintage_ID (1/3): \x1b[0m`)

        // GET ALL Active Vintages, LEFT JOIN ALL Active Transactions
        const getVintageTransactions = await Vintage.findAll({
            where: {
                active_ind: 1, // Only include active rows on all tables
                vintage_id: req.params.vintage_id,             
            },
            include: [{model: Transaction,
                where: {active_ind: 1},
                required:false    
            }]
        });

        //Serialize the data
        const vintageTransactions = getVintageTransactions.map(transaction => transaction.get({ plain: true }));

        // GET ONE Wine Record by Vintage ID 
        console.log (`\x1b[34m GET - Home routes: '/transaction/:vintage_id'\x1b[0m`)
        console.log (`\x1b[34m GET - ONE Wine Record by Vintage ID (2/3): \x1b[0m`)
        const getWine = await Vintage.findOne({
            include: [{ model: Wine }],
            where: {
                active_ind: 1,
                vintage_id: req.params.vintage_id
            },

        })
        // const wines = getWine.map(wine => wine.get({ plain: true }));
        const wineArray = getWine.get({ plain: true });

        // GET ONE Brand Record by Wine_id 
        console.log (`\x1b[34m GET - Home routes: '/transaction/:vintage_id'\x1b[0m`)
        console.log (`\x1b[34m GET - ONE Brand Record by Wine_id (3/3): \x1b[0m`)
        const getBrand = await Wine.findOne({
            include: [{ model: Brand }],
            where: {
                active_ind: 1,
                wine_id: wineArray.Wine.wine_id
            },

        })
        // const wines = getWine.map(wine => wine.get({ plain: true }));
        const brandArray = getBrand.get({ plain: true });
        brandName = brandArray.brand.brand_name

        // Response - render the page
        res.status(200).render('transaction', {
            vintageTransactions,
            wineArray,
            brandName,
            logged_in: req.session.logged_in
        });

        // console.log(brand)
        // res.status(200).json(vintageTransactions);

    } catch (err) {
        console.error(err);
        res.status(500).json(err); // Status 500 - Internal Server Error
    }
});

module.exports = router;
