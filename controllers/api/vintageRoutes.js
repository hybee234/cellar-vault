const router = require('express').Router();
const { Vintage } = require('../../models'); 
const checkVintageId = require('../../utils/checkVintageId');
const checkWineId = require('../../utils/checkWineId');
const withAuth = require('../../utils/auth'); // Import the withAuth middleware

// Root: http://localhost:3001/api/vintage/

//---------------------------------------------------//
//- GET - All active Vintage under Selected Wine ID -//
//---------------------------------------------------// 

// API: http://localhost:3001/api/vintage/:wine_id
// Example : http://localhost:3001/api/vintage/:1
// No JSON Body required

router.get('/:wine_id', withAuth, checkWineId, async (req, res) => { // withAuth middleware added
    try {
        // Get all active Vintages under target Wine_ID
        const getActiveVintages = await Vintage.findAll({
            //attributes: ['wine_id', 'wine_name', 'active_ind', 'brand_id'], // Specify the columns to fetch
            where: {
                active_ind: 1, // This will only include brands where active_ind is 1
                wine_id: req.params.wine_id  // where brand ID matches the brand ID in URL
            }
        });
        res.status(200).json(getActiveVintages);
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

router.post('/:wine_id', withAuth, checkWineId, async (req, res) => { // withAuth middleware added
    try {
        // POST new Vintage under Wine ID
        const postNewVintage = await Vintage.create(
            {
                vintage: req.body.vintage,
                format: req.body.format,
                drink_by: req.body.drink_by,                
                active_ind: req.body.active_ind,
                wine_id: req.params.wine_id      
            });
        res.status(200).json(postNewVintage);
        // TODO: Refresh page to show changes 
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

router.put('/:vintage_id', withAuth, checkVintageId, async (req, res) => { // withAuth middleware added
    try {
        // PUT - Update Vintage by Vintage ID
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
        // TODO: Refresh page to show changes 
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

router.put('/inactivate/:vintage_id', withAuth, checkVintageId, async (req, res) => { // withAuth middleware added
    try {
        // PUT - Soft Delete Vintage by Vintage ID
        const inactivateVintage = await Vintage.update( 
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
        // TODO: Refresh page to show changes 
    } catch (err) {
        res.status(500).json(err); 
    }        
});

module.exports = router;
