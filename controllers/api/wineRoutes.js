const router = require('express').Router();
const { Vintage, Wine } = require('../../models');
const checkBrandId = require('../../utils/checkBrandId');
const checkWineId = require('../../utils/checkWineId');
const withAuth = require('../../utils/auth'); // Import the withAuth middleware

// Root: http://localhost:3001/api/wine/

//-----------------------------//
//- GET - One Wine by Wine_ID -//
//-----------------------------//

router.get('/:wine_id', withAuth, checkWineId, async (req,res) => {    
    try {
        // POST new transaction under Vintage ID
        const getOneWine = await Wine.findOne({
            where: { 
                wine_id: req.params.wine_id,                    
            }});

        const wine = getOneWine.get({ plain:true})      // Serialize the data 
        console.log (wine)
        res.status(200).json(wine);
    } catch (err) {
        res.status(400).json(err); // Status 400 - Bad Request
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

router.post('/:brand_id', withAuth, checkBrandId, async (req, res) => {
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

router.put('/:wine_id', withAuth, checkWineId, async (req, res) => {
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

router.put('/inactivate/:wine_id', withAuth, checkWineId, async (req, res) => {
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
