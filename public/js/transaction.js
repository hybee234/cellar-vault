// Javascript used by transaction.hbs

const inactivateBttnEl = document.getElementsByClassName("inactivate")
const formEl = document.getElementById("new-transaction-form")
console.log(formEl)
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
    const transaction_date = document.querySelector('#transaction_date').value;
    
    // let newTransaction=[];
    // let test = {};

    let cost = "";
        if (document.querySelector('#cost').value) {
            // test.push(document.querySelector('#cost').value)
            cost = document.querySelector('#cost').value
        } else {
        }

    let qty_in = "";
        if (document.querySelector('#qty_in').value) {
            // test.push(document.querySelector('#qty_in').value)
            qty_in = document.querySelector('#qty_in').value
        } else {
        }

    let qty_out = "";
        if (document.querySelector('#qty_out').value) {
            // test.push(document.querySelector('#qty_out').value)
            qty_out = document.querySelector('#qty_out').value
        } else {
        }

    let notes = "";
        if (document.querySelector('#notes').value) {
            // test.push(document.querySelector('#note').value)
            notes = document.querySelector('#notes').value
        } else {
        }
        
    const vintage_id = document.querySelector('#vintage_id').value;
    // test.push(document.querySelector('#vintage_id').value)
    // const user_id = document.querySelector('#user_id').value;

// console.log(test)
// console.log (req.session.user_id)

const body = JSON.stringify({
    cost,
    transaction_date,
    qty_in,
    qty_out,
    notes,
    vintage_id,
    // user_id
});

console.log("body")
console.log(body)

        const response = await fetch(`/api/transaction/${vintage_id}`, {
        method: 'POST',
        body: body,        
            headers: {
                'Content-Type': 'application/json',
            },
            });
    
        if (response.ok) {
            window.location.reload()
        } else {
        alert('Failed to add transaction');
        }
    } 

    console.log(formEl)

    window.addEventListener("DOMContentLoaded", (event) => {
        formEl.addEventListener('submit', newTransactionHandler);

    });
    