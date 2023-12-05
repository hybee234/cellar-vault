//---------------------------------------------//
//- Javascript used by transaction.handlebars -//
//---------------------------------------------//

const inactivateBttnEl = document.getElementsByClassName("inactivate")
const addFormEl = document.getElementById("new-transaction-form")
const updateFormEl = document.getElementById("update-transaction-form")
const transTblEl = document.getElementById("trans-table")
const addTransactionBttnEl = document.getElementById("add-button")
const addModalEl = document.getElementById("new-transaction-modal")
const updateModalEl = document.getElementById("update-transaction-modal")

//-----------------------------//
//- POST request via add form -//
//-----------------------------//

const postTransactionHandler = async (event) => {
    event.preventDefault();
    // Create JSON Array
    let bodyArray = {}
    bodyArray.transaction_date = document.querySelector('#transaction_date').value
    bodyArray.vintage_id = document.querySelector('#vintage_id').value
    if (document.querySelector('#cost').value) {
        bodyArray.cost = document.querySelector('#cost').value   
    }
    if (document.querySelector('#qty_in').value) {
        bodyArray.qty_in = parseInt(document.querySelector('#qty_in').value)
    }
    if (document.querySelector('#qty_out').value) {
        bodyArray.qty_out = parseInt(document.querySelector('#qty_out').value)
    }
    if (document.querySelector('#notes').value) {
        bodyArray.notes = document.querySelector('#notes').value
    }
    // console.log("bodyArray")
    // console.log(bodyArray)

    //Stringify the Array to prepare for FETCH
    const bodyStringified = JSON.stringify(bodyArray)

    // console.log("bodyStringified")
    // console.log(bodyStringified)

    // FETCH Request (POST Method)
    const response = await fetch(`/api/transaction/${document.querySelector('#vintage_id').value}`, {
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
};

//-----------------------------------------------------------//
//- Function - Inactivate (PUT) Transaction by Transaction ID -//
//-----------------------------------------------------------//

const inactivateTrans = async (transaction_id) => {
    try{
    let inactivateTransactionURL = `./../api/transaction/inactivate/${transaction_id}`
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: jsonString
    }        
    const response = await fetch(inactivateTransactionURL, options )
    const data = await response.json()
    console.log(data)
    window.location.reload()        
    } catch (err) {
        console.error(err);
    
    }
};

//----------------------------------------//
//- PUT request via Add Transcation Modal-//
//----------------------------------------//

const putTransactionHandler = async (event) => {
    event.preventDefault();
    // Create JSON Array
    let bodyArray = {}

    bodyArray.transaction_date = document.querySelector('#updateDateInput').value
    bodyArray.vintage_id = document.querySelector('#updateVintageIdInput').value
    bodyArray.transaction_id = document.querySelector('#updateTransIdInput').value
    if (document.querySelector('#updateCostInput').value) {
        bodyArray.cost = document.querySelector('#updateCostInput').value   
    }
    if (document.querySelector('#updateQtyInInput').value) {
        bodyArray.qty_in = parseInt(document.querySelector('#updateQtyInInput').value)
    }
    if (document.querySelector('#updateQtyOutInput').value) {
        bodyArray.qty_out = parseInt(document.querySelector('#updateQtyOutInput').value)
    }
    if (document.querySelector('#updateNotesInput').value) {
        bodyArray.notes = document.querySelector('#updateNotesInput').value
    }

    // console.log("bodyArray")
    // console.log(bodyArray)

    //Stringify the Array to prepare for FETCH
    const bodyStringified = JSON.stringify(bodyArray)

    // console.log("bodyStringified")
    // console.log(bodyStringified)

    // FETCH Request (POST Method)
    const response = await fetch(`/api/transaction/${document.querySelector('#updateTransIdInput').value}`, {
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

//------------------------------------------------//
//- Show Update Transaction Modal - Prepopulated -//
//------------------------------------------------//

const showUpdateModal = async (transaction_id) => {
    try{                
        // GET details of transaction
        let getOneTransactionURL = `./../api/transaction/${transaction_id}`
        let options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },            
        }
        const response = await fetch(getOneTransactionURL, options )
        const transactionArray = await response.json() 

        // Pre-populate fiends in Update Modal Window with Transaction Values
        document.getElementById('updateDateInput').value = transactionArray.transaction_date
        document.getElementById('updateCostInput').value = transactionArray.cost
        document.getElementById('updateQtyInInput').value = transactionArray.qty_in
        document.getElementById('updateQtyOutInput').value = transactionArray.qty_out
        document.getElementById('updateNotesInput').value = transactionArray.notes
        document.getElementById('updateTransIdInput').value = transactionArray.transaction_id

        // Show the Update modal window 
        updateModalEl.style.display = 'block';
    
    } catch (err) {
        console.error(err);
    
    }
};

//-----------------------------------------------------------------//
//- Event listener - triggered by clicking with Transaction Table -// 
//-----------------------------------------------------------------//

transTblEl.addEventListener('click', (event) => {
    console.log ("click registered")
    const element = event.target;
    let transaction_id = element.getAttribute("data-index");
    event.preventDefault();

    // If the Delete button was clicked
    if (element.matches("button") === true && element.classList.contains("inactivate")) { 
        console.log("  > Delete button clicked")
        inactivateTrans(transaction_id)
    }
   // If the UPdate button was clicked
    if (element.matches("button") === true && element.classList.contains("update")) { 
        console.log("  > Update button clicked")
        showUpdateModal(transaction_id)
    }
});

//----------------------------------------------------------//
//- Event listener - Update Transaction Modal - Hide -//
//----------------------------------------------------------//
document.getElementById('cancelUpdate').addEventListener('click', function () {
    updateModalEl.style.display = 'none';
});

//----------------------------------------------------------//
//- Event listener - Update Transaction Modal - Submission -//
//----------------------------------------------------------//
updateFormEl.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log ("Update Submit button clicked")    
    putTransactionHandler(event);
})



//-------------------------------------------------------//
//- Event listener - Add Transaction Modal - Submission -//
//-------------------------------------------------------//
addFormEl.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log ("Add Submit button clicked")    
    postTransactionHandler(event);
})

//------------------------------------------------------//
//- Event Listener - Add Transaction Modal - Hide/Show -//
//------------------------------------------------------//

//Show "Add Tranasction Modal" when "Add Transaction" button is clicked
addTransactionBttnEl.addEventListener('click', function () {
    addModalEl.style.display = 'block';
});

//Hide "Add Tranasction Modal" when "Cancel" button is clicked
document.getElementById('cancelAdd').addEventListener('click', function () {
    addModalEl.style.display = 'none';
});