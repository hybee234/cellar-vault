const sequelize = require('../config/connection');

const seedBrands = require('./seedBrands');
const seedWines = require('./seedWines');
const seedVintages = require('./seedVintages');
const seedTransactions = require('./seedTransactions');
const seedUsers = require('./seedUsers');
require('dotenv').config();

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedBrands();
    console.log('\n----- BRANDS SEEDED -----\n');
    await seedWines();
    console.log('\n----- WINES SEEDED -----\n');
    await seedVintages();
    console.log('\n----- VINTAGES SEEDED -----\n');
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    await seedTransactions();
    console.log('\n----- TRANSACTIONS SEEDED -----\n');    
    process.exit(0);
};

seedAll();
