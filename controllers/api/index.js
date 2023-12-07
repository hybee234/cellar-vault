const router = require('express').Router();
const userRoutes = require('./userRoutes');
const brandRoutes = require('./brandRoutes')
const wineRoutes = require('./wineRoutes')     
const vintageRoutes = require('./vintageRoutes')
const transactionRoutes = require('./transactionRoutes') 

router.use('/users', userRoutes);
router.use('/brand', brandRoutes);
router.use('/wine', wineRoutes);   
router.use('/vintage', vintageRoutes);    
router.use('/transaction', transactionRoutes);    

module.exports = router;


