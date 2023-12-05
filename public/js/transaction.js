//--------------------------------------//
//- Javascript used by transaction.hbs -//
//--------------------------------------//

const inactivateBttnEl = document.getElementsByClassName("inactivate")
const formEl = document.getElementById("new-transaction-form")
const transTblEl = document.getElementById("trans-table")

//-------------------------//
//- POST request via form -//
//-------------------------//

const postTransactionHandler = async (event) => {
    event.preventDefault();
    console.log("triggered")
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

    console.log("bodyArray")
    console.log(bodyArray)

    //Stringify the Array to prepare for FETCH
    const bodyStringified = JSON.stringify(bodyArray)

    console.log("bodyStringified")
    console.log(bodyStringified)

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

const inactivateTrans = (transaction_id) => {
    let inactivateTransactionURL = `./../api/transaction/inactivate/${transaction_id}`
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: jsonString
    }        
    fetch(inactivateTransactionURL, options )
        .then(function (response) {                
            if (response.ok) {                                                                  
                    response.json()
                .then(function (data) {                                          
                    console.log("  Checking data received:")
                    console.log(data)
                });
                window.location.reload()
            } else {
                console.log ("something went wrong")
            }
        })
    .catch(function (error) {
        console.log ("something else went wrong")
    });
    return;
}

//------------------------------------------//
//- PUT (Update) request by Transaction ID -//
//------------------------------------------//

const updateTrans = async (transaction_id) => {
    try{
        console.log (transaction_id)
        
        let getOneTransactionURL = `./../api/transaction/${transaction_id}`
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },            
        }

        const response = await fetch (getOneTransactionURL, options)
                
        let array = JSON.parse(response)
        console.log(response)
        console.log(array)

        // } else {
        //     return
        // };    

    } catch (err) {
        console.error(err);
        res.status(500).json(err); // Status 500 - Internal Server Error
    }
};

// // Fetch the rest of the data for the transaction
        // let getOneTransactionURL = `./../api/transaction/${transaction_id}`
        // let options = {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },            
        // }
    //     fetch(getOneTransactionURL, options )
    //         .then(function (response) {                
    //             if (response.ok) {                                                                  
    //                 response.json().then(function (data) {                                          
    //                     console.log("  Checking data received:")
    //                     console.log(data)
    //                     const putDate = data.transaction_date;
    //                     const putCost = data.cost;
    //                     const putQtyIn = data.qty_in;
    //                     const putQtyOut = data.qty_out;                    
    //                     const putNotes = data.notes;
                        
    //                     console.log("Date " + putDate)
    //                     console.log("Cost " + putCost)
    //                     console.log("Qty_in " + putQtyIn)
    //                     console.log("Qty_out " + putQtyOut)
    //                     console.log("Notes " + putNotes)
                        
    //                 });
    //                 // window.location.reload()
    //             } else {
    //                 console.log ("something went wrong")
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log ("something else went wrong")
    //         });

    //     return;
    //     }
    // });

    //     let inactivateTransactionURL = `./../api/transaction/${transaction_id}`
    //     let options = {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         // body: jsonString
    //     }
        
    //     fetch(inactivateTransactionURL, options )
    //         .then(function (response) {                
    //             if (response.ok) {                                                                  
    //                 response.json().then(function (data) {                                          
    //                     console.log("  Checking data received:")
    //                     console.log(data)
    //                 });
    //                 window.location.reload()
    //             } else {
    //                 console.log ("something went wrong")
    //             }
    //         })
            // .catch(function (error) {
            //     console.log ("something else went wrong")
            // });
            // return;
// }

// } catch (err) {
//     console.error(err);
//     res.status(500).json(err); // Status 500 - Internal Server Error
// }
// });


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
   // If the Edit button was clicked
    if (element.matches("button") === true && element.classList.contains("edit")) { 
        console.log("  > Edit button clicked")
        updateTrans(transaction_id)
    }
});

//-----------------------------------------//
//- Event listener for submission of form -//
//-----------------------------------------//
formEl.addEventListener('submit', (event) => {
    console.log ("Add button clicked")
    postTransactionHandler(event);
})