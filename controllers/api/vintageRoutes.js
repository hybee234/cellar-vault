const router = require('express').Router();
const { Vintage } = require('../../models');
const checkVintageId = require('../../utils/checkVintageId');
const checkWineId = require('../../utils/checkWineId');
const withAuth = require('../../utils/auth');

// Root: http://localhost:3001/api/vintage/

//-----------------------------------//
//- GET - One Vintage by Vintage ID -//
//-----------------------------------// 

// API: http://localhost:3001/api/vintage/:vintage_id
// Example : http://localhost:3001/api/vintage/:1
// No JSON Body required

router.get('/:vintage_id', withAuth, checkVintageId, async (req, res) => { 
    try {
        // GET ONE Vintage by Vintage_ID
        console.log (`\x1b[36m GET - Vintage routes: '/:vintage_id'\x1b[0m`)
        console.log (`\x1b[36m GET - ONE Vintage Record by Vintage_ID: \x1b[0m`) 
        const getOneVintage = await Vintage.findOne({
            where: {
                active_ind: 1,                
                vintage_id: req.params.vintage_id 
            }
        });
        const oneVintage = getOneVintage.get({ plain: true })      // Serialize the data 
        res.status(200).json(oneVintage);
    } catch (err) {
        console.error(err);
        res.status(500).json(err); // Status 500 - Internal Server Error
    }
});

//-----------------------------------//
//- POST - Add a Vintage to Wine ID -//
//-----------------------------------//

// API: http://localhost:3001/api/vintage/:wine_id
// Example : http://localhost:3001/api/vintage/6
// Example JSON Body
//  {
//      vintage: 2017,
//      format: 750mL,
//      drink_by: 2030,                
//      active_ind: 1,
//      wine_id: req.params.wine_id     
//  }
//  Note: vintage_total will default to zero

router.post('/:wine_id', withAuth, checkWineId, async (req, res) => { 
    try{
        // POST new Vintage under Wine ID
        console.log (`\x1b[36m POST - Vintage routes: '/:wine_id'\x1b[0m`)
        console.log (`\x1b[36m POST - ADD Vintage Record under Wine ID: \x1b[0m`)         
        const postNewVintage = await Vintage.create(
            {
                vintage: req.body.vintage,
                format: req.body.format,
                drink_by: req.body.drink_by,
                active_ind: req.body.active_ind,
                wine_id: req.params.wine_id
            });
        res.status(200).json(postNewVintage);        
    } catch (err) {
        res.status(400).json(err); // Status 400 - Bad Request
    }
});

//--------------------------------------//
//- PUT - Update Vintage by Vintage ID -//
//--------------------------------------//

// API: http://localhost:3001/api/vintage/:vintage_id
// Example : http://localhost:3001/api/vintage/10
// Example JSON Body
//     {
//        "vintage": 2017,
//        "format": "750mL",
//        "drink_by": 2057,
//        "active_ind": 1   
//      }

router.put('/:vintage_id', withAuth, checkVintageId, async (req, res) => { 
    try {
        // PUT - Update Vintage by Vintage ID
        console.log (`\x1b[36m PUT - Vintage routes: '/:vintage_id'\x1b[0m`)
        console.log (`\x1b[36m PUT - UPDATE Vintage Record by Vintage ID: \x1b[0m`) 
        const putVintage = await Vintage.update(
            {
                vintage: req.body.vintage,
                format: req.body.format,
                drink_by: req.body.drink_by,
                active_ind: req.body.active_ind,
                wine_id: req.params.wine_id
            },
            {
                where: {
                    vintage_id: req.params.vintage_id,
                },
            }
        )
        res.status(200).json(`Vintage ID ${req.params.vintage} updated`);
    } catch (err) {
        res.status(500).json(err); // Status 400 - Bad Request
    }
});

//-------------------------------------------//
//- PUT - Soft Delete Vintage by Vintage ID -//
//-------------------------------------------//

// API: http://localhost:3001/api/vintage/inactivate/:vintage_id
// Example : http://localhost:3001/api/vintage/inactivate/10
// No JSON Body required.

router.put('/inactivate/:vintage_id', withAuth, checkVintageId, async (req, res) => { 
    try {
        // PUT - Inactivate Vintage by Vintage ID
        console.log (`\x1b[36m PUT - Vintage routes: '/inactivate/:vintage_id'\x1b[0m`)
        console.log (`\x1b[36m PUT - INACTIVATE Vintage Record by Vintage ID: \x1b[0m`) 
        await Vintage.update(
            {
                active_ind: 0,
            },
            {
                where: {
                    vintage_id: req.params.vintage_id,
                },
            }
        )
        res.status(200).json(`Vintage ID ${req.params.vintage_id} inactivated`);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
