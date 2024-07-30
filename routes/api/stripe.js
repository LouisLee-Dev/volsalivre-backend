const express = require('express');
const router = express.Router();
const Stripe = require('stripe');

const server_stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/pay', async (req, res) => {    
    const { amount } = req.body;    

    try {  
      const paymentIntent = await server_stripe.paymentIntents.create({  
        amount,  
        currency: 'usd',  
      });
      res.json({ clientSecret: paymentIntent.client_secret });  
    } catch (error) {  
      res.status(500).send({ error: error.message });  
    }  
})

module.exports = router;