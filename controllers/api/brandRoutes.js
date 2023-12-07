const router = require('express').Router();
const { Brand } = require('../../models');
const checkBrandId = require('../../utils/checkBrandId');
const withAuth = require('../../utils/auth');

// Root: http://localhost:3001/api/brand/

//--------------------//
//- POST - ADD Brand -//
//--------------------//

// API: http://localhost:3001/api/brand/
// Example : http://localhost:3001/api/brand/
// Example JSON Body
//  {
//      "brand_name": "New Brand Name"
//  }

router.post('/', withAuth, async (req, res) => {
    try {
        //Post Brand Record
        console.log (`\x1b[31m POST - brand routes: '/update/:brand_id'\x1b[0m`)
        console.log (`\x1b[31m POST - Update Brand Record: \x1b[0m`) 
        console.log (`\x1b[31m THIS WAS ORIGINALLY AN ADD BRAND ROUTE !!! \x1b[0m`) 
        const postBrand = await Brand.create(
            {
                brand_name: req.body.brand_name,                
            }
        );
        res.status(200).json(postBrand);
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

module.exports = router;
