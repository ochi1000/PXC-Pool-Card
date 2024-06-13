const db = require('../models');
const { fund, makePayment } = require('../services/paystackService');
const Investor = db.Investor;

exports.deposit = async (req, res) => {
    try {
        // const { amount } = req.body;
        // const userId = req.user.id;

        // let investor = await db.User.findByPk(userId);
        // if (!investor) {
        //     return res.status(404).json({ message: 'Investor not found' });
        //     }
        // call paystack
        const paymentData = await makePayment(req.user.email, amount);
        // // res.redirect(paymentData.data.authorization_url)
        // investor.liquidity += parseFloat(amount);
        // await investor.save();

        res.status(200).json({
             message: 'Deposit successful', 
             paymentURL: paymentData.data.authorization_url, 
            //  liquidity: investor.liquidity 
            });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getInvestorInfo = async (req, res) => {
    try {
        const investor = await Investor.findOne({ where: { userId: req.user.id } });
        if (!investor) {
            return res.status(404).json({ message: 'Investor not found' });
        }
        res.status(200).json(investor);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
