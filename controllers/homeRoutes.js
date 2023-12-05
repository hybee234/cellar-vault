const express = require('express');
const router = express.Router();
const { Brand, Wine, Vintage, Transaction, User } = require('../models');
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
        // Serialize the Data
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

//------------------------------------------------------------------------//
//- Transaction Page - All active Transactions under Selected Vintage ID -//
//------------------------------------------------------------------------//

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
            transactions, wineName, brandName,
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
