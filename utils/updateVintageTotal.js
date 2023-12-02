const { Vintage, Transaction } = require('../models'); 

// const updateVintageTotal = async (req, res, next) => {
const updateVintageTotal = async (vintage_id) => {

    // Find SUM of qty_in for the Vintage ID of interest (active transactions only)
    const totalQtyIn = await Transaction.sum('qty_in',  
        {where: { vintage_id: vintage_id , active_ind: 1}}
    );
    
    // Find SUM of qty_out for the Vintage ID of interest (active transactions only)
    const totalQtyOut = await Transaction.sum('qty_out',   
        {where: { vintage_id: vintage_id, active_ind: 1 }}
    );

    // Determine difference for total buttles for vintage
    const vintageTotal = totalQtyIn - totalQtyOut
        console.log (`\x1b[32m Total Qty In: \x1b[0m${totalQtyIn}`)
        console.log (`\x1b[32m Total Qty OUt: \x1b[0m${totalQtyOut}`)
        console.log (`\x1b[32m Updated Vintage Total: \x1b[0m${vintageTotal}`)

    // Write vintage total to vintage table
    await Vintage.update (
        {
            vintage_total: vintageTotal
        },
        {
            where: {
                vintage_id: vintage_id
            }
        }
    )
    return;

}

module.exports = updateVintageTotal;
