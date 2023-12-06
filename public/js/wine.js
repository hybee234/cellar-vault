//--------------------------------------//
//- Javascript used by wine.handlebars -//
//--------------------------------------//

const tableContinerEl = document.getElementById("table-container")                                  // Create listener that triggers when any wine-table is clicked

// Add Wine
const addWineOpenModalEl = document.getElementById("add-wine-open-modal")                           // Add Wine Button
const addWineCancelBttnEl = document.getElementById("add-wine-cancel-button")                       // Add Wine Cancel Button
const addWineModalEl = document.getElementById("add-wine-modal")                                    // Add Wine Modal Window
const addWineFormEl = document.getElementById("add-wine-form")                                      // Add Wine Form

// Update Wine
const updateWineModalEl = document.getElementById("update-wine-modal")                              // Update Wine Modal Window
const updateWineFormEl = document.getElementById("update-wine-form")                                // Update Wine Form
const updateWineCancelBttnEl = document.getElementById("update-wine-cancel-button")                 // Update Wine Cancel Button
const updateWineDeleteBttnEl = document.getElementById("update-wine-delete-button")                 // Update Wine Delete Button

// Inactivate Wine
const inactivateWineModalEl = document.getElementById('inactivate-wine-modal')                      // Inactivate Wine Modal Window
const inactivateWineConfirmButtonEl = document.getElementById('inactivate-wine-confirm-button')     // Inactivate Wine Confirm Button
const inactivateWineCancelButtonEl = document.getElementById('inactivate-wine-cancel-button')       // Inacitvate Wine Cancel Button
const inactivateWineCloseButtonEl = document.getElementById('inactivate-wine-close-button')         // Inacitvate Wine Close Button

// Add Vintage
const addVintageCancelBttnEl = document.getElementById("add-vintage-cancel-button")                 // Add Vintage Cancel Button
const addVintageModalEl = document.getElementById("add-vintage-modal")                              // Add Vintage Modal Window
const addVintageFormEl = document.getElementById("add-vintage-form")                                // Add Vintage Form

// Update Vintage
const updateVintageModalEl = document.getElementById("update-vintage-modal")                        // Update Vintage Modal Window
const updateVintageFormEl = document.getElementById("update-vintage-form")                          // Update Vintage Form
const updateVintageCancelBttnEl = document.getElementById("update-vintage-cancel-button")           // Update Vintage Cancel Button
const updateVintageDeleteBttnEl = document.getElementById("update-vintage-delete-button")           // Update Vintage Delete Button

// Inactivate Vintage
const inactivateVintageModalEl = document.getElementById('inactivate-vintage-modal')                   // Inactivate Vintage Modal Window
const inactivateVintageConfirmButtonEl = document.getElementById('inactivate-vintage-confirm-button')  // Inactivate Vintage Confirm Button
const inactivateVintageCancelButtonEl = document.getElementById('inactivate-vintage-cancel-button')    // Inacitvate Vintage Cancel Button
const inactivateVintageCloseButtonEl = document.getElementById('inactivate-vintage-close-button')      // Inacitvate Vintage Close Button

        //------------------//
        //- Wine Functions -//
        //------------------//

//--------------------------//
//- POST (Add) Wine Record -//
//--------------------------//

const postWineHandler = async (event) => {
    event.preventDefault();
    // Build JSON body
    // {
    //     "wine_name" : "Diana Madeline",
    //     "active_ind" : 1	    
    // }
    
    let JSONBody = {}    
    JSONBody.wine_name = document.getElementById('add-wine-name').value
    //Stringify the Array to prepare for FETCH
    const bodyStringified = JSON.stringify(JSONBody)

    // FETCH Request (POST Method)
    const response = await fetch(`/api/wine/${document.getElementById('add-wine-brand-id').value}`, {
        method: 'POST',
        body: bodyStringified,        
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        if (response.ok) {
            window.location.reload() // Reload screen 
        } else {
            alert('Failed to Add Wine Record');
        }
    return;
}

//----------------------------//
//- PUT (update) Wine Record -//
//----------------------------//

const putWineHandler = async (event) => {
    event.preventDefault();
    // Build JSON body
    // {
    //     "wine_name" : "Diana Madeline",
    //     "active_ind" : 1	    
    // }

    let JSONBody = {}
    JSONBody.wine_name = document.querySelector('#update-wine-name').value
    //Stringify the Array to prepare for FETCH
    const bodyStringified = JSON.stringify(JSONBody)

    // FETCH Request (POST Method)
    const response = await fetch(`/api/wine/${document.querySelector('#update-wine-wine-id').value}`, {
    method: 'PUT',
    body: bodyStringified,        
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        window.location.reload() // Reload screen
    } else {
        alert('Failed to Update Wine Record');
    }
    return;
};


//--------------------------------//
//- PUT (inactivate) Wine Record -//
//--------------------------------//

const inactivateWineHandler = async (wine_id) => {
    
    // console.log(wine_id)
    
    try{
    let inactivateWineURL = `./../api/wine/inactivate/${wine_id}`
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: jsonString
    }        
    const response = await fetch(inactivateWineURL, options )
    const data = await response.json()
    // console.log(data)
    window.location.reload() // Reload screen 
    } catch (err) {
        console.error(err);
    
    }
    return;
};

        //---------------------//
        //- Vintage Functions -//
        //---------------------//

//--------------------------//
//- POST (Add) Vintage Record -//
//--------------------------//

const postVintageHandler = async (event) => {
    event.preventDefault();
    // Build JSON body
    // {
    //     "vintage": 2009,
    //     "format": "750mL",
    //     "drink_by": 2039,
    //     "active_ind": 1   
    // }
    
    let JSONBody = {}    
    if (document.getElementById('add-vintage-vintage').value) {
        JSONBody.vintage = document.getElementById('add-vintage-vintage').value
    }
    if (document.getElementById('add-vintage-format').value) {
    JSONBody.format = document.getElementById('add-vintage-format').value
    }
    if (document.getElementById('add-vintage-drink-by').value) {
    JSONBody.drink_by = document.getElementById('add-vintage-drink-by').value
    }
    //Stringify the Array to prepare for FETCH
    const bodyStringified = JSON.stringify(JSONBody)
    // console.log(bodyStringified)
    // FETCH Request (POST Method)
    const response = await fetch(`/api/vintage/${document.getElementById('add-vintage-wine-id').value}`, {
        method: 'POST',
        body: bodyStringified,        
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        if (response.ok) {
            window.location.reload() // Reload screen 
        } else {
            alert('Failed to add vintage');
        }
    return;
}


//----------------------------//
//- PUT (update) Vintage Record -//
//----------------------------//

const putVintageHandler = async (event) => {
    event.preventDefault();
    // Build JSON body
    // {
    //     "vintage_id": 2,
    //     "vintage": 2010,
    //     "format": "750mL",
    //     "drink_by": 2040,
    //     "vintage_total": 10,
    //     "active_ind": 1,
    //     "wine_id": 1
    // }

    let JSONBody = {}
    if (document.querySelector('#update-vintage-vintage').value) {
    JSONBody.vintage = document.querySelector('#update-vintage-vintage').value
    }
    if (document.querySelector('#update-vintage-format').value) {
    JSONBody.format = document.querySelector('#update-vintage-format').value
    }
    if (document.querySelector('#update-vintage-drink-by').value) {
    JSONBody.drink_by = document.querySelector('#update-vintage-drink-by').value
    }
    
    //Stringify the Array to prepare for FETCH
    const bodyStringified = JSON.stringify(JSONBody)

    // FETCH Request (POST Method)
    const response = await fetch(`/api/vintage/${document.querySelector('#update-vintage-vintage-id').value}`, {
    method: 'PUT',
    body: bodyStringified,        
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        window.location.reload() // Reload screen
    } else {
        alert('Failed to Update Wine Record');
    }
    return;
};

//--------------------------------//
//- PUT (inactivate) Wine Record -//
//--------------------------------//

const inactivateVintageHandler = async (vintage_id) => {
    
    // console.log(vintage)
    
    try{
    let inactivateVintageURL = `./../api/vintage/inactivate/${vintage_id}`
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: jsonString
    }        
    const response = await fetch(inactivateVintageURL, options )
    const data = await response.json()
    // console.log(data)
    window.location.reload() // Reload screen 
    } catch (err) {
        console.error(err);    
    }
    return;
};

        //-------------------//
        //- Shared Listener -//
        //-------------------//

//----------------------------------------------------------------------------------------//
//- Event listener - Table Area - Update Wine/ Add Vintage / Update Vintage Modal - Show -// 
//----------------------------------------------------------------------------------------//

//Listen for a click within the Table area - the body of the page ...
tableContinerEl.addEventListener('click', async (event) => {
    // console.log ("Table area click registered")
    const element = event.target;    

    //------------------------------//
    //- Modal - Update Wine - Show -//
    //------------------------------//

    //(Pull wine details, pre-render Update Wine Modal and show.) //

    if (element.matches("button") === true && element.classList.contains("update-wine-button")) { 
        let update_wine_wine_id = element.getAttribute("data-index");
        event.preventDefault();
        // console.log("  > Update Wine button clicked")
        try{                
            // GET details of wine
            let getOneWineURL = `./../api/wine/${update_wine_wine_id}`
            let options = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                },            
            }
            const response = await fetch(getOneWineURL, options )
            const wineArray = await response.json()             
            // Pre-populate fields in UPDATE WINE modal 
            document.getElementById('update-wine-name').value = wineArray.wine_name
            document.getElementById('update-wine-wine-id').value = wineArray.wine_id
            document.getElementById('update-wine-delete-button').value = wineArray.wine_id  //set value of delete button so that it can be passsed through

            // Show the UPDATE WINE modal 
            updateWineModalEl.style.display = 'block';
        } catch (err) {
            console.error(err);        
        }
        return;
    }

    //------------------------------//
    //- Modal - Add Vintage - Show -//
    //------------------------------//
    if (element.matches("button") === true && element.classList.contains("add-vintage-button") === true) { 
        let add_vintage_wine_id = element.getAttribute("data-index");
        event.preventDefault();
        // console.log("  > Add Vintage button clicked")
        // console.log ("Wine_id: " + add_vintage_wine_id)       

       // Pre-populate fields/values as needed
       document.getElementById('add-vintage-wine-id').value = add_vintage_wine_id //Hidden ID

        // Show ADD VINTAGE modal
        addVintageModalEl.style.display = 'block';
        return;
    }
    
    //---------------------------------//
    //- Modal - Update Vintage - Show -//
    //---------------------------------//

    // Pull vintage details, pre-render Update Vintage Modal and show.
    if (element.matches("button") === true && element.classList.contains("update-vintage-button")) { 
        let update_vintage_vintage_id = element.getAttribute("data-index");
        event.preventDefault();
        // console.log("  > Update Vintage button clicked")
        
        try{        
            // GET details of vintage
            let getOneVintageURL = `./../api/vintage/${update_vintage_vintage_id}`
            let options = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                },            
            }
            const response = await fetch(getOneVintageURL, options )
            const vintageArray = await response.json()      

            // {
            //     "vintage_id": 2,
            //     "vintage": 2010,
            //     "format": "750mL",
            //     "drink_by": 2040,
            //     "vintage_total": 10,
            //     "active_ind": 1,
            //     "wine_id": 1
            // }


            // Pre-populate fiends in Update Modal Window with Transaction Values
            document.getElementById('update-vintage-vintage').value = vintageArray.vintage
            document.getElementById('update-vintage-format').value = vintageArray.format
            document.getElementById('update-vintage-drink-by').value = vintageArray.drink_by 
            document.getElementById('update-vintage-vintage-id').value = vintageArray.vintage_id
            document.getElementById('update-vintage-delete-button').value = vintageArray.vintage_id  //set value of delete button so that it can be passsed through            

            // Show the Update modal window 
            updateVintageModalEl.style.display = 'block';
        } catch (err) {
            console.error(err);        
        }
        return;
    }
    
});



        //------------------//
        //- Wine Listeners -//
        //------------------//

//------------------------------------------//
//- Event Listener - Add Wine Modal - Show -//
//------------------------------------------//

//Show "Add Wine Modal" when "Add Wine" button is clicked
addWineOpenModalEl.addEventListener('click', function () {
    // console.log ("Add Wine Record Modal - Show")     
    addWineModalEl.style.display = 'block';
});

//------------------------------------------//
//- Event Listener - Add Wine Modal - Hide -//
//------------------------------------------//

//Hide "Add Wine Modal" when "Cancel" button is clicked
addWineCancelBttnEl.addEventListener('click', function () {
    // console.log ("Add Wine Record Modal - Hide(Cancel)")     
    addWineModalEl.style.display = 'none';
});

//---------------------------------------------------//
//- Event listener - Add Wine Modal - Submit Button -//
//---------------------------------------------------//
addWineFormEl.addEventListener('submit', (event) => {
    event.preventDefault(); 
    // console.log ("Add Wine Record Modal - Submit")     
    postWineHandler(event)
})

//---------------------------------------------//
//- Event listener - Update Wine Modal - Hide -//
//---------------------------------------------//

//Hide "Update Wine Modal" when "Cancel" button is clicked
updateWineCancelBttnEl.addEventListener('click', function () {
    // console.log ("Update Wine Record Modal - Hide (Cancel)")  
    updateWineModalEl.style.display = 'none';
});

//-----------------------------------------------//
//- Event listener - Update Wine Modal - Submit -//
//-----------------------------------------------//
updateWineFormEl.addEventListener('submit', (event) => {
    event.preventDefault();
    // console.log ("Update Wine Record Modal - Submit")  
    putWineHandler(event)
})

//-----------------------------------------------//
//- Event listener - Update Wine Modal - Delete -//
//-----------------------------------------------//
updateWineDeleteBttnEl.addEventListener('click', (event) => {
    event.preventDefault();
    // console.log ("Update Wine Record Modal - Delete Clicked - updateWineDeleteBttnEl")  
    let wine_id = event.target.getAttribute("value")     
    inactivateWineModal(wine_id)
})

//-----------------------------------------//
//- Modal (inactivate) Wine Record - Show -//
//-----------------------------------------//

// Show Inactivate Modal 
const inactivateWineModal = async (wine_id) => {
    try{                
        // GET details of Wine
        // console.log ("Inactivate Wine Record Modal - Show - inactivateWineModal")  
        let getOneWineURL = `./../api/wine/${wine_id}`
        let options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },            
        }
        const response = await fetch(getOneWineURL, options )
        const wineArray = await response.json()             
        // Pre-populate fields in Inactivate Modal Window 
        document.getElementById('inactivate-wine-heading').textContent = wineArray.wine_name
        document.getElementById('inactivate-wine-confirm-button').value = wineArray.wine_id  //set value of delete button so that it can be passsed through
        // Show the Inactivate  modal window 
        inactivateWineModalEl.style.display = 'block';

    } catch (err) {
        console.error(err);        
    }
    return;
};

//--------------------------------------------------//
//- Modal (inactivate) Wine Record - Hide (Cancel) -//
//--------------------------------------------------//

inactivateWineCancelButtonEl.addEventListener('click', function () {
    // console.log ("Inactivate Wine Record Modal - Hide (Cancel) - inactivateWineCancelButtonEl")  
    inactivateWineModalEl.style.display = 'none';
});

//-------------------------------------------------//
//- Modal (inactivate) Wine Record - Hide (Close) -//
//-------------------------------------------------//

inactivateWineCloseButtonEl.addEventListener('click', function () {
    // console.log ("Inactivate Wine Record Modal - Hide (Close) - inactivateWineCloseButtonEl")  
    inactivateWineModalEl.style.display = 'none';
});

//-------------------------------------------//
//- Modal (inactivate) Wine Record - Submit -//
//-------------------------------------------//

inactivateWineConfirmButtonEl.addEventListener('click', function (event) {
    event.preventDefault();
    // console.log ("Inactivate Wine Record Modal - Submit")  
    let wine_id = event.target.getAttribute("value")        
    inactivateWineHandler(wine_id)
});

        //---------------------//
        //- Vintage Listeners -//
        //---------------------//


//-----------------------------------------------//
//- Modal - Add Vintage Record - Hide (Cancel) -//
//-----------------------------------------------//

addVintageCancelBttnEl.addEventListener('click', function () {
    // console.log ("Add Vintage Record Modal - Hide (Cancel)")  
    addVintageModalEl.style.display = 'none';
});

//-------------------------------------//
//- Modal Add Vintage Record - Submit -//
//-------------------------------------//

addVintageFormEl.addEventListener('submit', (event) => {
    // console.log ("Add Vintage Record Modal - Submit Clicked")    
    event.preventDefault();
    // console.log ("Update Wine Submit button clicked")    
    postVintageHandler(event)
})

//------------------------------------------//
//- Modal - Update Vintage - Hide (cancel) -// 
//------------------------------------------//

updateVintageCancelBttnEl.addEventListener('click', function () {
    // console.log ("Update Vintage Record Modal - Hide (Cancel)")    
    updateVintageModalEl.style.display = 'none';
});

//------------------------------------------//
//- Modal - Update Vintage Record - Submit -//
//------------------------------------------//

updateVintageFormEl.addEventListener('submit', (event) => {
    event.preventDefault();
    // console.log (" Update Vintage Record Modal - Submit clicked")    
    putVintageHandler(event)
})

//--------------------------------------------------//
//- Event listener - Update Vintage Modal - Delete -//
//--------------------------------------------------//
updateVintageDeleteBttnEl.addEventListener('click', (event) => {
    event.preventDefault();
    // console.log (" Update Vintage Record Modal - Delete clicked")    
    let vintage_id = event.target.getAttribute("value")       
    inactivateVintageModal(vintage_id)
})

//--------------------------------------------//
//- Modal (inactivate) Vintage Record - Show -//
//--------------------------------------------//

const inactivateVintageModal = async (vintage_id) => {
    try{                
        // console.log ("Inactivate Vintage Record Modal - Show") 
        // GET details of Vintage
        let getOneVintageURL = `./../api/vintage/${vintage_id}`
        let options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },            
        }

        // {
        //     "vintage_id": 3,
        //     "vintage": 2008,
        //     "format": "750 mL",
        //     "drink_by": 2048,
        //     "vintage_total": 18,
        //     "active_ind": 1,
        //     "wine_id": 2
        //   }

        const response = await fetch(getOneVintageURL, options )
        const vintageArray = await response.json()             
        
        // Pre-populate fields in Inactivate Modal Window 
        document.getElementById('inactivate-vintage-heading-one').textContent = `Vintage: ${vintageArray.vintage}, Format: ${vintageArray.format}`
        document.getElementById('inactivate-vintage-heading-two').textContent = `${vintageArray.vintage_total} bottle(s) remaining`
        document.getElementById('inactivate-vintage-confirm-button').value = vintageArray.vintage_id  //set value of delete button so that it can be passsed through
        
        // console.log("document.getElementById('inactivate-vintage-confirm-button').value")
        // console.log(document.getElementById('inactivate-vintage-confirm-button').value)

        // Show the Inactivate  modal window 
        inactivateVintageModalEl.style.display = 'block';

    } catch (err) {
        console.error(err);        
    }
    return;
};

//-----------------------------------------------------//
//- Modal (inactivate) Vintage Record - Hide (Cancel) -//
//-----------------------------------------------------//

inactivateVintageCancelButtonEl.addEventListener('click', function () {
    // console.log ("Inactivate Vintage Record Modal - Hide (Cancel)") 
    inactivateVintageModalEl.style.display = 'none';
});

//----------------------------------------------------//
//- Modal (inactivate) Vintage Record - Hide (Close) -//
//----------------------------------------------------//

inactivateVintageCloseButtonEl.addEventListener('click', function () {
    // console.log ("Inactivate Vintage Record Modal - Hide (Close)") 
    inactivateVintageModalEl.style.display = 'none';
});

//----------------------------------------------//
//- Modal (inactivate) Vintage Record - Submit -//
//----------------------------------------------//

inactivateVintageConfirmButtonEl.addEventListener('click', function (event) {
    event.preventDefault();
    // console.log ("Update Vintage Delete button clicked") 
    let vintage_id = event.target.getAttribute("value")
    console.log (vintage_id)        
    inactivateVintageHandler(vintage_id)
});