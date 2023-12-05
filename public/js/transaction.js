// Javascript used by transaction.hbs

const inactivateBttnEl = document.getElementsByClassName("inactivate")
const formEl = document.getElementById("new-transaction-form")

//--------------------------------------------------//
//- PUT - Inactivate Transaction by Transaction ID -//
//--------------------------------------------------//

document.addEventListener('click', (event) => {
    console.log("");
    console.log("! inactivateBttnEl Clicked"); 
    const element = event.target;
    // If the triggering element is <button> and has class "inactivate" then carry out the fetch request
    if (element.matches("button") === true && element.classList.contains("inactivate")) { 
        let transaction_id = element.getAttribute("data-index"); 
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
                    response.json().then(function (data) {                                          
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
});

//-------------------------//
//- POST request via form -//
//-------------------------//

async function newTransactionHandler(event) {
    event.preventDefault();

    // Create JSON Array
    let bodyArray = {}

    bodyArray.transaction_date = document.querySelector('#transaction_date').value
    bodyArray.vintage_id = document.querySelector('#vintage_id').value
    if (document.querySelector('#cost').value) {
        bodyArray.cost = parseInt(document.querySelector('#cost').value)        
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

    //Stringy the Array to prepare for FETCH
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

// Event listener for submit button
window.addEventListener("DOMContentLoaded", (event) => {
    formEl.addEventListener('submit', newTransactionHandler);
});