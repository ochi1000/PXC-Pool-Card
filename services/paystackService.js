const axios = require('axios');
const { env } = require('process')

const paymentServiceUrl = 'https://api.paystack.co/transaction/initialize';

async function makePayment(email, amount) {
  try {    
    const data = {
      "email": 'chukajide',
      "amount": 10000
    }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer'+' '+process.env.PAYSTACK_SECRET_KEY
    }
      const response = await axios.post('https://api.paystack.co/transaction/initialize', 
        {
          email: 'chukajide@gmail.com',
          amount: 1000
        },
        {
          headers : {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer'+' '+process.env.PAYSTACK_SECRET_KEY
          }
        });
        console.log(response)
      return response.data;
  } catch (error) {
      console.error('Payment request failed:', error);
      throw new Error('Payment request failed');
  }
}

module.exports = {makePayment}