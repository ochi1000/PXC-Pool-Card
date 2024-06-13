const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');
const investorController = require('../controllers/investorController');

router.post('/deposit', investorController.deposit);
router.get('/info', isAuthenticated, investorController.getInvestorInfo);

module.exports = router;
