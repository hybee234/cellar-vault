//--------------------------------------//
//- Javascript used by wine.handlebars -//
//--------------------------------------//

const tableContinerEl = document.getElementById("table-container")                                  // Create listener that triggers when any wine-table is clicked

const addWineOpenModalEl = document.getElementById("add-wine-open-modal")                           // Add Wine Button
const addWineCancelBttnEl = document.getElementById("add-wine-cancel-button")                       // Add Wine Cancel Button
const addWineModalEl = document.getElementById("add-wine-modal")                                    // Add Wine Modal Window
const addWineFormEl = document.getElementById("add-wine-form")                                      // Add Wine Form

const updateWineModalEl = document.getElementById("update-wine-modal")                              // Update Wine Modal Window
const updateWineFormEl = document.getElementById("update-wine-form")                                // Update Wine Form
const updateWineCancelBttnEl = document.getElementById("update-wine-cancel-button")                 // Update Wine Cancel Button
const updateWineDeleteBttnEl = document.getElementById("update-wine-delete-button")                 // Update Wine Delete Button

const inactivateWineModalEl = document.getElementById('inactivate-wine-modal')                      // Inactivate Wine Modal Window
const inactivateWineConfirmButtonEl = document.getElementById('inactivate-wine-confirm-button')     // Inactivate Wine Confirm Button
const inactivateWineCancelButtonEl = document.getElementById('inactivate-wine-cancel-button')       // Inacitvate Wine Cancel Button
const inactivateWineCloseButtonEl = document.getElementById('inactivate-wine-close-button')         // Inacitvate Wine Cancel Button


const addVintageCancelBttnEl = document.getElementById("add-vintage-cancel-button")                 // Add Wine Cancel Button
const addVintageModalEl = document.getElementById("add-vintage-modal")                              // Add Wine Modal Window
const addVintageFormEl = document.getElementById("add-vintage-form")                                // Add Wine Form



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
};


//--------------------------------//
//- PUT (inactivate) Wine Record -//
//--------------------------------//

const inactivateWineHandler = async (wine_id) => {
    
    console.log(wine_id)
    
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
    console.log(data)
    window.location.reload() // Reload screen 
    } catch (err) {
        console.error(err);
    
    }
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
    JSONBody.vintage = document.getElementById('add-vintage-vintage').value
    JSONBody.format = document.getElementById('add-vintage-format').value
    JSONBody.drink_by = document.getElementById('add-vintage-drink-by').value
    //Stringify the Array to prepare for FETCH
    const bodyStringified = JSON.stringify(JSONBody)

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
}




        //------------------//
        //- Wine Listeners -//
        //------------------//

//------------------------------------------//
//- Event Listener - Add Wine Modal - Show -//
//------------------------------------------//

//Show "Add Wine Modal" when "Add Wine" button is clicked
addWineOpenModalEl.addEventListener('click', function () {
    addWineModalEl.style.display = 'block';
});

//------------------------------------------//
//- Event Listener - Add Wine Modal - Hide -//
//------------------------------------------//

//Hide "Add Wine Modal" when "Cancel" button is clicked
addWineCancelBttnEl.addEventListener('click', function () {
    addWineModalEl.style.display = 'none';
});

//---------------------------------------------------//
//- Event listener - Add Wine Modal - Submit Button -//
//---------------------------------------------------//
addWineFormEl.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log ("Add Wine Submit button clicked")    
    postWineHandler(event)
})

//---------------------------------------------------------------------------------------------//
//- Event listener - Table Area - Update Wine/ Add Vintage / Update Vintage Modal - Show/Hide -// 
//---------------------------------------------------------------------------------------------//

//Listen for a click within the Table area - the body of the page ...
tableContinerEl.addEventListener('click', async (event) => {
    console.log ("Table area click registered")
    const element = event.target;    
   // If the UPDATE WINE button is clicked - pull wine details, pre-render Update Wine Modal and show.
    if (element.matches("button") === true && element.classList.contains("update-wine")) { 
        let update_wine_wine_id = element.getAttribute("data-index");
        event.preventDefault();
        console.log("  > Update wine button clicked")
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
    }

    // If the ADD VINTAGE button is clicked (VINTAGE) - show modal 
    if (element.matches("button") === true && element.classList.contains("add-vintage")) { 
        let add_vintage_wine_id = element.getAttribute("data-index");
        event.preventDefault();
        console.log("  > ADD Vintage button clicked")
        console.log (add_vintage_wine_id)       

       // Pre-populate fields/values as needed
       document.getElementById('add-vintage-wine-id').value = add_vintage_wine_id //Hidden ID

        // Show ADD VINTAGE modal
        addVintageModalEl.style.display = 'block';
    }
    
    // If the Update Vintage button is clicked - pull vintage details, pre-render Update Vintage Modal and show.
    // if (element.matches("button") === true && element.classList.contains("update-wine")) { 
    //     let wine_id = element.getAttribute("data-index");
    //     event.preventDefault();
    //     console.log("  > Update wine button clicked")
    //     try{                
    //         // GET details of transaction
    //         let getOneWineURL = `./../api/wine/${wine_id}`
    //         let options = {
    //             method: 'GET',
    //             headers: {
    //                 'Accept': 'application/json'
    //             },            
    //         }
    //         const response = await fetch(getOneWineURL, options )
    //         const wineArray = await response.json()             
    //         // Pre-populate fiends in Update Modal Window with Transaction Values
    //         document.getElementById('update-wine-name').value = wineArray.wine_name
    //         document.getElementById('update-wine-wine-id').value = wineArray.wine_id
    //         document.getElementById('update-wine-delete-button').value = wineArray.wine_id  //set value of delete button so that it can be passsed through

    //         // Show the Update modal window 
    //         updateWineModalEl.style.display = 'block';
    //     } catch (err) {
    //         console.error(err);        
    //     }
    //}
    
});

//---------------------------------------------//
//- Event listener - Update Wine Modal - Hide -//
//---------------------------------------------//

//Hide "Update Wine Modal" when "Cancel" button is clicked
updateWineCancelBttnEl.addEventListener('click', function () {
    updateWineModalEl.style.display = 'none';
});

//-----------------------------------------------//
//- Event listener - Update Wine Modal - Submit -//
//-----------------------------------------------//
updateWineFormEl.addEventListener('submit', (event) => {
    event.preventDefault();
    // console.log ("Update Wine Submit button clicked")    
    putWineHandler(event)
})

//-----------------------------------------------//
//- Event listener - Update Wine Modal - Delete -//
//-----------------------------------------------//
updateWineDeleteBttnEl.addEventListener('click', (event) => {
    event.preventDefault();
    // console.log ("Update Wine Delete button clicked") 
    let wine_id = event.target.getAttribute("value")     
    inactivateModal(wine_id)
})

//-----------------------------------------//
//- Modal (inactivate) Wine Record - Show -//
//-----------------------------------------//

// Show Inactivate Modal 
const inactivateModal = async (wine_id) => {
    try{                
        // GET details of Wine
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
};

//--------------------------------------------------//
//- Modal (inactivate) Wine Record - Hide (Cancel) -//
//--------------------------------------------------//

inactivateWineCancelButtonEl.addEventListener('click', function () {
    inactivateWineModalEl.style.display = 'none';
});

//-------------------------------------------------//
//- Modal (inactivate) Wine Record - Hide (Close) -//
//-------------------------------------------------//

inactivateWineCloseButtonEl.addEventListener('click', function () {
    inactivateWineModalEl.style.display = 'none';
});

//-------------------------------------------//
//- Modal (inactivate) Wine Record - Submit -//
//-------------------------------------------//

inactivateWineConfirmButtonEl.addEventListener('click', function (event) {
    event.preventDefault();
    // console.log ("Update Wine Delete button clicked") 
    let wine_id = event.target.getAttribute("value")        
    inactivateWineHandler(wine_id)
});

        //---------------------//
        //- Vintage Listeners -//
        //---------------------//


//-----------------------------------------------//
//- Modal - Add Vintage Record - Hide (Ccancel) -//
//-----------------------------------------------//

addVintageCancelBttnEl.addEventListener('click', function () {
    addVintageModalEl.style.display = 'none';
});

//-------------------------------------//
//- Modal Add Vintage Record - Submit -//
//-------------------------------------//

addVintageFormEl.addEventListener('submit', (event) => {
    event.preventDefault();
    // console.log ("Update Wine Submit button clicked")    
    postVintageHandler(event)
})



//--------------------------------------------------//
//- Event listener - Add Vintage Modal - Show/Hide -// 
//--------------------------------------------------//

