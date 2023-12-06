const { Vintage } = require('../models');

const vintageData = [
    //Bin 28(1)
    {
        vintage: '2008',
        format: '750 mL',
        drink_by: '2040',
        vintage_total: 17,
        active_ind: 1,
        wine_id: 1,
    },
    {
        vintage: '2010',
        format: '750 mL',
        drink_by: '2040',
        vintage_total: 10,
        active_ind: 1,
        wine_id: 1,
    },

    // Bin 389 (2)
    {
        vintage: '2008',
        format: '750 mL',
        drink_by: '2048',
        vintage_total: 4,
        active_ind: 1,
        wine_id: 2,
    },
    {
        vintage: '2017',
        format: '1500 mL',
        drink_by: '2047',
        vintage_total: 6,
        active_ind: 1,
        wine_id: 2,
    },
    // Bin 707 (3)
    {
        vintage: '2008',
        format: '1500 mL',
        drink_by: '2038',
        vintage_total: 3,
        active_ind: 1,
        wine_id: 3,
    },
    {
        vintage: '2010',
        format: '750 mL',
        drink_by: '2040',
        vintage_total: 2,
        active_ind: 1,
        wine_id: 3,
    },
    // Grange (4)
    {
        vintage: '2004',
        format: '750 mL',
        drink_by: '2054',
        vintage_total: 2,
        active_ind: 1,
        wine_id: 4,
    },
    {
        vintage: '2008',
        format: '750 mL',
        drink_by: '2058',
        vintage_total: 6,
        active_ind: 1,
        wine_id: 4,
    },
    {
        vintage: '2012',
        format: '750 mL',
        drink_by: '2062',
        vintage_total: 3,
        active_ind: 1,
        wine_id: 4,
    },
    {
        vintage: '2017',
        format: '1500 mL',
        drink_by: '2067',
        vintage_total: 1,
        active_ind: 1,
        wine_id: 4,
    },
    // Apricot Block (5)
    // Seven Acre Shiraz (6)
    // Roennfeldt Road Cabernet Sauvignon (7)
    // Roennfeldt Road Shiraz (8)
    // Estate Chardonnay (9)
    // Estate Pinot Noir (10)
    // Premium Pinot Noir (11)
    // Premium Chardonnay (12)
    // Reserve Pinot Noir (13)
    // Backet Press (14)
    // Black Shiraz (15)
    // Rifle Range (16)

];

const seedVintages = () => Vintage.bulkCreate(vintageData);

module.exports = seedVintages;
