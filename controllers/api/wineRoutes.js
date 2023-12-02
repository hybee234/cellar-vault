const router = require('express').Router();
const { Vintage, Wine } = require('../../models'); 
const checkBrandId = require('../../utils/checkBrandId');
const checkWineId = require('../../utils/checkWineId');

// Root: http://localhost:3001/api/wine/

//-----------------------------------------------//
//- GET - All active Wines under Selected Brand -//
//-----------------------------------------------//

// API: http://localhost:3001/api/wine/:brand_id
// Example : http://localhost:3001/api/wine/1
// No JSON Body required

router.get('/:brand_id', checkBrandId, async (req, res) => {
    try {
        // GET all active Wines and attached Vintages under target Brand_ID
        const getActiveWines = await Wine.findAll({
            //attributes: ['wine_id', 'wine_name', 'active_ind', 'brand_id'], // Specify the columns to fetch
            include: [{ model: Vintage }],
            where: {
                active_ind: 1, // This will only include brands where active_ind is 1
                brand_id: req.params.brand_id  // where brand ID matches the brand ID in URL
            }
        });
        res.status(200).json(getActiveWines);
    } catch (err) {
        console.error(err);
        res.status(500).json(err); // Status 500 - Internal Server Error
    }
});

//---------------------------------//
//- POST - Add a Wine to Brand ID -//
//---------------------------------//

// API: http://localhost:3001/api/wine/:brand_id
// Example : http://localhost:3001/api/wine/6
// Example JSON Body
//  {
//	    "wine_name" : "Diana Madeline",
//	    "active_ind" : 1	
//  }

router.post('/:brand_id', checkBrandId, async (req, res) => {
    try {
        // POST new Wine under Brand ID
        const postNewWine = await Wine.create(
            {
                wine_name: req.body.wine_name,
                active_ind: req.body.active_ind,
                brand_id: req.params.brand_id      
            });
        res.status(200).json(postNewWine);
        // TODO: Refresh page to show changes 
    } catch (err) {
        res.status(400).json(err); // Status 400 - Bad Request
    }
});

//--------------------------------//
//- PUT - Update Wine by Wine ID -//
//--------------------------------//

// API: http://localhost:3001/api/wine/:wine_id
// Example : http://localhost:3001/api/wine/21
// Example JSON Body
// {
//     "wine_name": "Diana Madeline",
//     "active_ind": 1,
//     "brand_id": 6
// }

router.put('/:wine_id', checkWineId, async (req, res) => {
    try {
        // PUT - Update Wine by Wine ID
        const putWine = await Wine.update( 
            {
                wine_name: req.body.wine_name,
                active_ind: req.body.active_ind,
                brand_id: req.body.brand_id,        
            },
            {
                where: {  
                    wine_id: req.params.wine_id,                    
                },
            }        
        )
        res.status(200).json(`Wine ID ${req.params.wine_id} updated`);
        // TODO: Refresh page to show changes 
    } catch (err) {
        res.status(500).json(err); // Status 400 - Bad Request
    }        
});

//-------------------------------------//
//- PUT - Soft Delete Wine by Wine ID -//
//-------------------------------------//

// API: http://localhost:3001/api/wine/inactivate/:wine_id
// Example : http://localhost:3001/api/wine/inactivate/21
// No JSON Body required.

router.put('/inactivate/:wine_id', checkWineId, async (req, res) => {
    try {
        // PUT - Soft Delete Wine by Wine ID
        const inactivateWine = await Wine.update( 
            {                
                active_ind: 0,      
            },
            {
                where: {  
                    wine_id: req.params.wine_id,                    
                },
            }        
        )
        res.status(200).json(`Wine ID ${req.params.wine_id} inactivated`);
        // TODO: Refresh page to show changes 
    } catch (err) {
        res.status(500).json(err); 
    }        
});

module.exports = router;
