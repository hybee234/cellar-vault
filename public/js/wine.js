//--------------------------------------//
//- Javascript used by wine.handlebars -//
//--------------------------------------//

const addWineOpenModalEl = document.getElementById("add-wine-open-modal")                           // Add Wine Button
const addWineCancelBttnEl = document.getElementById("add-wine-cancel-button")                       // Add Wine Cancel Button
const addWineModalEl = document.getElementById("add-wine-modal")                                    // Add Wine Modal Window
const addWineFormEl = document.getElementById("add-wine-form")                                      // Add Wine Form

const wineTableContinerEl = document.getElementById("wine-tables-container")                        // Create listener that triggers when any wine-table is clicked
const updateWineModalEl = document.getElementById("update-wine-modal")                              // Update Wine Modal Window
const updateWineFormEl = document.getElementById("update-wine-form")                                // Update Wine Form
const updateWineCancelBttnEl = document.getElementById("update-wine-cancel-button")                 // Update Wine Cancel Button
const updateWineDeleteBttnEl = document.getElementById("update-wine-delete-button")                 // Update Wine Delete Button

const inactivateWineModalEl = document.getElementById('inactivate-wine-modal')                      // Inactivate Wine Modal Window
const inactivateWineConfirmButtonEl = document.getElementById('inactivate-wine-confirm-button')     // Inactivate Wine Confirm Button
const inactivateWineCancelButtonEl = document.getElementById('inactivate-wine-cancel-button')       // Inacitvate Wine Cancel Button
const inactivateWineCloseButtonEl = document.getElementById('inactivate-wine-close-button')         // Inacitvate Wine Cancel Button


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
            alert('Failed to add transaction');
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
        alert('Failed to add transaction');
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









//-----------------------------------------------//
//- Event Listener - Add Wine Modal - Show/Hide -//
//-----------------------------------------------//

//Show "Add Wine Modal" when "Add Wine" button is clicked
addWineOpenModalEl.addEventListener('click', function () {
    addWineModalEl.style.display = 'block';
});

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

//--------------------------------------------------//
//- Event listener - Update Wine Modal - Show/Hide -// 
//--------------------------------------------------//

//Show "Update Wine Modal" when "Update" button is clicked within "Wine Table"
wineTableContinerEl.addEventListener('click', async (event) => {
    console.log ("wine table area click registered")
    const element = event.target;    
   // If the Update button was clicked
    if (element.matches("button") === true && element.classList.contains("update-wine")) { 
        let wine_id = element.getAttribute("data-index");
        event.preventDefault();
        console.log("  > Update wine button clicked")
        try{                
            // GET details of transaction
            let getOneWineURL = `./../api/wine/${wine_id}`
            let options = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                },            
            }
            const response = await fetch(getOneWineURL, options )
            const wineArray = await response.json()             
            // Pre-populate fiends in Update Modal Window with Transaction Values
            document.getElementById('update-wine-name').value = wineArray.wine_name
            document.getElementById('update-wine-wine-id').value = wineArray.wine_id
            document.getElementById('update-wine-delete-button').value = wineArray.wine_id  //set value of delete button so that it can be passsed through

            // Show the Update modal window 
            updateWineModalEl.style.display = 'block';
        } catch (err) {
            console.error(err);        
        }
    };
    return
});

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

//------------------------------------------------//
//- Modal (inactivate) Wine Record - Show / Hide -//
//------------------------------------------------//

// Show Inactivate Modal 
const inactivateModal = async (wine_id) => {
    try{                
        // GET details of transaction
        let getOneWineURL = `./../api/wine/${wine_id}`
        let options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },            
        }
        const response = await fetch(getOneWineURL, options )
        const wineArray = await response.json()             
        // Pre-populate fiends in Update Modal Window with Transaction Values
        document.getElementById('inactivate-wine-heading').textContent = wineArray.wine_name
        document.getElementById('inactivate-wine-confirm-button').value = wineArray.wine_id  //set value of delete button so that it can be passsed through
        // Show the inactivate  modal window 
        inactivateWineModalEl.style.display = 'block';

    } catch (err) {
        console.error(err);        
    }
};

// Hide Inactivate Wine Modal - "Cancel" button
inactivateWineCancelButtonEl.addEventListener('click', function () {
    inactivateWineModalEl.style.display = 'none';
});

// Hide Inactivate Wine Modal - "Close" button
inactivateWineCloseButtonEl.addEventListener('click', function () {
    inactivateWineModalEl.style.display = 'none';
});

// Hide Inactivate Wine Modal - "Close" button
inactivateWineConfirmButtonEl.addEventListener('click', function (event) {
    event.preventDefault();
    // console.log ("Update Wine Delete button clicked") 
    let wine_id = event.target.getAttribute("value")        
    inactivateWineHandler(wine_id)
});