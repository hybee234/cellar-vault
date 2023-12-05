const router = require('express').Router();
const { Brand } = require('../../models');
const checkBrandId = require('../../utils/checkBrandId');
const withAuth = require('../../utils/auth'); // Corrected path to withAuth

// Root: http://localhost:3001/api/brand/

//------------------------------------------------------//
//- GET - Route to render the homepage with Brand data -//
//------------------------------------------------------//

// API: http://localhost:3001/api/brand/
// Example : http://localhost:3001/api/wine/
// No JSON Body required

router.get('/', withAuth, async (req, res) => { // Added withAuth middleware
    try {
        const getActiveBrand = await Brand.findAll({
            attributes: ['brand_name'],
            where: { active_ind: 1 }
        });
        const brands = getActiveBrand.map(brand => brand.get({ plain: true }));

        // Check if the request accepts JSON
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            res.json(brands); // Send JSON response
        } else {
            res.render('homepage', {
                brands,
                loggedIn: req.session.loggedIn
            }); // Render HTML page
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error', error: err });
    }
});

//----------------------//
//- POST - Add a Brand -//
//----------------------//

// API: http://localhost:3001/api/brand
// Example : http://localhost:3001/api/brand
// Example JSON Body
//  {
//      "brand_name" : "Diana Madeline",
//      "active_ind" : 1    
//  }

router.post('/', withAuth, async (req, res) => { // Added withAuth middleware
    try {
        // POST new Brand to Brand Table
        const postNewBrand = await Brand.create(req.body);
        res.status(200).json(postNewBrand);
        // TODO: Refresh page to show changes
    } catch (err) {
        res.status(400).json(err); // Status 400 - Bad Request
    }
});

//----------------------------------//
//- PUT - Update Brand by Brand ID -//
//----------------------------------//

// API: http://localhost:3001/api/brand/:brand_id
// Example : http://localhost:3001/api/brand/1
// Example JSON Body
//  {
//      "brand_name" : "Diana Madeline",
//      "active_ind" : 1    
//  }

router.put('/:brand_id', withAuth, checkBrandId, async (req, res) => { // Added withAuth middleware
    try {
        const putBrand = await Brand.update(
            {
                brand_name: req.body.brand_name,
                active_ind: req.body.active_ind,
            },
            {
                where: {
                    brand_id: req.params.brand_id,
                },
            }
        )
        res.status(200).json(`Brand ID ${req.params.brand_id} updated`);
        // TODO: Refresh page to show changes
    } catch (err) {
        res.status(500).json(err);
    }
});

//---------------------------------------//
//- PUT - Soft Delete Brand by Brand ID -//
//---------------------------------------//

// API: http://localhost:3001/api/brand/inactivate/:brand_id
// Example : http://localhost:3001/api/brand/inactivate/6
// No JSON Body Required

router.put('/inactivate/:brand_id', withAuth, checkBrandId, async (req, res) => { // Added withAuth middleware
    try {
        const inactivateBrand = await Brand.update(
            {
                active_ind: 0,
            },
            {
                where: {
                    brand_id: req.params.brand_id,
                },
            }
        )
        res.status(200).json(`Brand ID ${req.params.brand_id} inactivated`);
        // TODO: Refresh page to show changes 
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
