//--------------------------------------//
//- Javascript used by wine.handlebars -//
//--------------------------------------//

const addWineOpenModalEl = document.getElementById("add-wine-open-modal")           // Add Wine Button
const addWineCancelBttnEl = document.getElementById("add-wine-cancel-button")       // Add Wine Cancel Button
const addWineModalEl = document.getElementById("add-wine-modal")                    // Add Wine Modal Window
const addWineFormEl = document.getElementById("add-wine-form")                      // Add Wine Form

// const updateWineOpenModalEl = document.getElementById("update-wine-open-modal")    // Update Wine Button
const updateWineCancelBttnEl = document.getElementById("update-wine-cancel-button")   // Update Wine Cancel Button
const updateWineModalEl = document.getElementById("update-wine-modal")                // Update Wine Modal Window
const updateWineFormEl = document.getElementById("update-wine-form")                  // Update Wine Form
const wineTableContinerEl = document.getElementById("wine-tables-container")                     // Create listener that triggers when any wine-table is clicked


//--------------------------------//
//- POST (Add) Wine via Add Form -//
//--------------------------------//

const postWineHandler = async (event) => {
    event.preventDefault();
    // Create JSON body
    // {
    //     "wine_name" : "Diana Madeline",
    //     "active_ind" : 1	    
    // }

    console.log(document.getElementById('add-wine-name').value)
    let bodyArray = {}
    // bodyArray.wine_name = document.querySelector('#add-wine-name').value
    bodyArray.wine_name = document.getElementById('add-wine-name').value
    console.log ("stuck here at 1")
    const bodyStringified = JSON.stringify(bodyArray)

    console.log (bodyStringified)
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












//-----------------------------------------------//
//- Event Listener - Add Wine Modal - Hide/Show -//
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

//-----------------------------------------------------------------//
//- Event listener - triggered by clicking with Transaction Table -// 
//-----------------------------------------------------------------//

//Show "Update Wine Modal" when "Update" button is clicked within "Wine Table"
wineTableContinerEl.addEventListener('click', async (event) => {
    console.log ("wine table area click registered")
    const element = event.target;
    console.log(element)
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
        console.log(wineArray)
        // Pre-populate fiends in Update Modal Window with Transaction Values
        document.getElementById('update-wine-name').value = wineArray.wine_name
        document.getElementById('update-wine-brand-id').value = wineArray.brand_id

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
