const router = require('express').Router();
const { Brand } = require('../../models');
const checkBrandId = require('../../utils/checkBrandId');
const withAuth = require('../../utils/auth');

// Root: http://localhost:3001/api/brand/

//------------------------------------------------------//
//- GET - Route to render the homepage with Brand data -//
//------------------------------------------------------//

// API: http://localhost:3001/api/brand/
// Example : http://localhost:3001/api/wine/
// No JSON Body required

// router.get('/', withAuth, async (req, res) => {
//     try {
//         //GET All active Brands
//         console.log (`\x1b[31m GET - brand routes: '/'\x1b[0m`)
//         console.log (`\x1b[31m GET - GET All active Brands: \x1b[0m`) 
//         console.log (`\x1b[31m DON'T THINK THIS IS BEING USED \x1b[0m`) 
//         const getActiveBrand = await Brand.findAll({
//             attributes: ['brand_name'],
//             where: { active_ind: 1 }
//         });
//         const brands = getActiveBrand.map(brand => brand.get({ plain: true }));

//         // Check if the request accepts JSON
//         if (req.headers.accept && req.headers.accept.includes('application/json')) {
//             res.json(brands); // Send JSON response
//         } else {
//             res.render('homepage', {
//                 brands,
//                 loggedIn: req.session.loggedIn
//             }); // Render HTML page
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Internal Server Error', error: err });
//     }
// });

//------------------------------------------------------//
//- POST - Update Brand by Brand ID                    -//
//------------------------------------------------------//

// API: http://localhost:3001/api/brand/update/:brand_id
// Example : http://localhost:3001/api/brand/update/1
// Example JSON Body
//  {
//      "brand_name": "New Brand Name"
//  }

router.post('/update/:brand_id', withAuth, checkBrandId, async (req, res) => {
    try {
        //Update Brand Record
        console.log (`\x1b[31m POST - brand routes: '/update/:brand_id'\x1b[0m`)
        console.log (`\x1b[31m POST - Update Brand Record: \x1b[0m`) 
        console.log (`\x1b[31m THIS WAS ORIGINALLY AN ADD BRAND ROUTE !!! \x1b[0m`) 
        const updatedBrand = await Brand.update(
            {
                brand_name: req.body.brand_name,
                
            },
            {
                where: {
                    brand_id: req.params.brand_id,
                },
            }
        );

        if (updatedBrand[0] > 0) {
            res.status(200).json({ message: `Brand ID ${req.params.brand_id} updated successfully` });
        } else {
            res.status(404).json({ message: 'No brand found with this ID' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err });
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

router.put('/:brand_id', withAuth, checkBrandId, async (req, res) => {
    try {
        //Update Brand by Brand ID
        console.log (`\x1b[31m PUT - brand routes: '/:brand_id'\x1b[0m`)
        console.log (`\x1b[31m PUT - Update Brand Record by Brand ID: \x1b[0m`)         
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
    } catch (err) {
        res.status(500).json(err);
    }
});

//---------------------------------------//
//- PUT (Inactivate) Brand by Brand ID -//
//---------------------------------------//

// API: http://localhost:3001/api/brand/inactivate/:brand_id
// Example : http://localhost:3001/api/brand/inactivate/6
// No JSON Body Required

router.put('/inactivate/:brand_id', withAuth, checkBrandId, async (req, res) => { 
    try {
        //PUT Inactivate Brand Record
        console.log (`\x1b[31m brand routes: '/inactivate/:brand_id' - PUT\x1b[0m`)
        console.log (`\x1b[31m PUT Inactivate Brand Record: \x1b[0m`) 

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
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add a new Brand
router.post('/', withAuth, async (req, res) => {
    try {
        //POST -  Add Brand Record
        console.log (`\x1b[31m brand routes: '/' - POST\x1b[0m`)
        console.log (`\x1b[31m POST -  Add Brand Record: \x1b[0m`) 
        const newBrand = await Brand.create({
            brand_name: req.body.brand_name,
            active_ind: 1
        });
        res.status(200).json(newBrand);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err });
    }
});

module.exports = router;
