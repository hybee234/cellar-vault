//---------------------------------------------//
//- Javascript used by transaction.handlebars -//
//---------------------------------------------//

const transTblEl = document.getElementById("trans-table")
const addTransactionBttnEl = document.getElementById("add-Transaction-button")

const addTransactionModalEl = document.getElementById("add-transaction-modal")
const addTransactionFormEl = document.getElementById("add-transaction-form")
const addTransactionCloseBttnEl = document.getElementById('add-transaction-close-button')
const addTransactionCancelBttnEl = document.getElementById('add-transaction-cancel-button')

const updateTransactionModalEl = document.getElementById("update-transaction-modal")
const updateTransactionFormEl = document.getElementById("update-transaction-form")
const updateTransactionCloseBttnEl = document.getElementById("update-transaction-close-button");
const updateTransactionCancelBttnEl = document.getElementById('update-transaction-cancel-button')

//---------------------------------//
//- POST (Add) Transaction Record -//
//---------------------------------//

const postTransactionHandler = async (event) => {
    event.preventDefault();
    // Create JSON Array

    let JSONBody = {}
    JSONBody.transaction_date = document.querySelector('#transaction_date').value
    JSONBody.vintage_id = document.querySelector('#vintage_id').value
    if (document.querySelector('#cost').value) {
        JSONBody.cost = document.querySelector('#cost').value   
    }
    if (document.querySelector('#qty_in').value) {
        JSONBody.qty_in = parseInt(document.querySelector('#qty_in').value)
    }
    if (document.querySelector('#qty_out').value) {
        JSONBody.qty_out = parseInt(document.querySelector('#qty_out').value)
    }
    if (document.querySelector('#notes').value) {
        JSONBody.notes = document.querySelector('#notes').value
    }
    // console.log("JSONBody")
    // console.log(JSONBody)

    //Stringify the Array to prepare for FETCH
    const bodyStringified = JSON.stringify(JSONBody)

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

//---------------------------------------//
//- PUT (inactivate) Transaction Record -//
//---------------------------------------//

const inactivateTransactionHandler = async (transaction_id) => {
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
    window.location.reload() // Reload screen 
    } catch (err) {
        console.error(err);
    
    }
};

//-----------------------------------//
//- PUT (update) Transaction Record -//
//-----------------------------------//

const putTransactionHandler = async (event) => {
    event.preventDefault();
    // Create JSON Array
    let JSONBody = {}

    JSONBody.transaction_date = document.querySelector('#updateDateInput').value
    JSONBody.vintage_id = document.querySelector('#updateVintageIdInput').value
    JSONBody.transaction_id = document.querySelector('#updateTransIdInput').value
    if (document.querySelector('#updateCostInput').value) {
        JSONBody.cost = document.querySelector('#updateCostInput').value   
    }
    if (document.querySelector('#updateQtyInInput').value) {
        JSONBody.qty_in = parseInt(document.querySelector('#updateQtyInInput').value)
    }
    if (document.querySelector('#updateQtyOutInput').value) {
        JSONBody.qty_out = parseInt(document.querySelector('#updateQtyOutInput').value)
    }
    if (document.querySelector('#updateNotesInput').value) {
        JSONBody.notes = document.querySelector('#updateNotesInput').value
    }

    // console.log("JSONBody")
    // console.log(JSONBody)

    //Stringify the Array to prepare for FETCH
    const bodyStringified = JSON.stringify(JSONBody)

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







//-----------------------------------------------------------------------------//
//- Event listener - Modal - Update Transaction/Inactivate Transaction - Show -// 
//-----------------------------------------------------------------------------//

transTblEl.addEventListener('click', async (event) => {
    
    console.log ("click registered")
    const element = event.target;
    let transaction_id = element.getAttribute("data-index");
    event.preventDefault();

    // Modal - Inactivate Transaction Record - Show -//
    if (element.matches("button") === true && element.classList.contains("inactivate-transaction")) { 
        console.log("  > Delete button clicked");
        inactivateTransactionHandler(transaction_id);
    };
    // Modal - Update Transaction Record - Show //
    if (element.matches("button") === true && element.classList.contains("update-transaction")) { 
        console.log("  > Update button clicked");
        // GET details of transaction
        try{
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
            updateTransactionModalEl.style.display = 'block';   
        }  catch (err) {
            console.error(err);
        
        }  
    }
});


//---------------------------------------------------------------//
//- Event listener - Modal - Update Transaction Record - Submit -//
//---------------------------------------------------------------//
updateTransactionFormEl.addEventListener('submit', (event) => {  
    putTransactionHandler(event);
})

//--------------------------------------------------------------------//
//- Event Listener - Modal Update Transaction Record - Hide (Cancel) -//
//--------------------------------------------------------------------//
updateTransactionCancelBttnEl.addEventListener('click', function () {
    updateTransactionModalEl.style.display = 'none';
});

//-------------------------------------------------------------------//
//- Event Listener - Modal Update Transaction Record - Hide (Close) -//
//-------------------------------------------------------------------//
updateTransactionCloseBttnEl.addEventListener('click', function () {    
    updateTransactionModalEl.style.display = 'none';
});

//----------------------------------------------------------//
//- Event Listener - Modal - Add Transaction Record - Show -//
//----------------------------------------------------------//
addTransactionBttnEl.addEventListener('click', function () {
    addTransactionModalEl.style.display = 'block';
});

//-----------------------------------------------------------//
//- Event listener - Modal - Add Transaction Modal - Submit -//
//-----------------------------------------------------------//
addTransactionFormEl.addEventListener('submit', (event) => {    
    postTransactionHandler(event);
})

//-------------------------------------------------------------------//
//- Event Listener - Modal - Add Transaction Record - Hide (Cancel) -//
//-------------------------------------------------------------------//
addTransactionCancelBttnEl.addEventListener('click', function () {
    addTransactionModalEl.style.display = 'none';
});

//----------------------------------------------------------------//
//- Event Listener - Modal Add Transaction Record - Hide (Close) -//
//----------------------------------------------------------------//
addTransactionCloseBttnEl.addEventListener('click', function () {
    addTransactionModalEl.style.display = 'none';
});







