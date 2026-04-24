const {client} = require("../config/mongodb");
const stripe = require('stripe')(process.env.PAYMENT_SECRET);
const {logTraking} = require("../controllers/trakings.controller");
const { ObjectId } = require("mongodb");

const PaymentCollection = client.db("Procode").collection("payment");
const Parsels = client.db("Procode").collection("parcels");


const getPaymentHistory  = async (req,res) => {
     try{
    const email = req.query.email;
    const query =  {};
    if(email){
        query.customer_email = email;
        if (email !== req.decodedToken_email) {
            return res.status(403).send({message : "Forbidden access"});
        }
    }

    const result = await PaymentCollection.find(query).toArray();
    res.send(result)
  }
  catch{
    res.status(500).send({message: "Failed to get payment history", error: error.message});
  }
}


const createCheckoutSession  =  async (req,res) => {
    try{
        const paymentInfo = req.body
   const amount = parseInt(paymentInfo.parcelCost)*100;
   const session = await stripe.checkout.sessions.create({
     line_items: [
       {
         price_data: {
           currency: "USD",
           unit_amount: amount,
           product_data: {
             name: `Please Pay for : ${paymentInfo.parcelName}`,
           },
         },
         quantity: 1,
       },
     ],
     customer_email: paymentInfo.senderEmail,
     mode: "payment",
     metadata: {
       parcelId: paymentInfo.parcelId,
       parcelName: paymentInfo.parcelName
     },
     success_url:`${process.env.DOMAIN}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`,
     cancel_url: `${process.env.DOMAIN}/dashboard/payment-cancel`,
   });
   res.json({url: session.url})
    }
    catch{
        res.status(500).send({message: "Failed to create checkout session", error: error.message});
    }
}

const paymentSuccess  = async (req,res) => {
    try{
           const sessionId = req.query.session_id;
            const session = await stripe.checkout.sessions.retrieve(sessionId);
            const payment_query = {transactionId : session.payment_intent};
        
            const parcelId = session.metadata.parcelId;
            const query  = {_id : new ObjectId(parcelId)};
            const isExist = await PaymentCollection.findOne(payment_query);
            const result2 = await Parsels.findOne(query);
        
            if(isExist){
               return  res.send({message : "Payment already exist", traking_Id : isExist.traking_Id ,transactionId : isExist.transactionId});
            }
        
            
        
            if(session.payment_status === "paid"){
        
                const updateDoc = {
                    $set : {
                        payment_status : "paid"
                    }
                }
                const result = await Parsels.updateOne(query,updateDoc);
        
        
                const payment = {
                   currency : session.currency,
                    amount : session.amount_total/100,
                    parcelId : session.metadata.parcelId,
                    parcelName : session.metadata.parcelName,
                    customer_email : session.customer_email,
                    transactionId : session.payment_intent,
                    payment_status : session.payment_status,
                    paid_at : new Date(),
                    traking_Id : result2.tracking_id
                }
                if (session.payment_status === "paid"){
                      logTraking(result2.tracking_id,"Pending_Delivery");
                    const resultPayment = await PaymentCollection.insertOne(payment);
                  return  res.send({
                      success : true,
                      paymentInfo : resultPayment,
                      traking_Id : result2.tracking_id,
                      transactionId : session.payment_intent
                    });
                }
        
            }
        
            res.send({success : false});
    }
    catch{
        res.status(500).send({message: "Failed to create checkout session", error: error.message});
    }
}



module.exports = {
    getPaymentHistory,
    createCheckoutSession,
    paymentSuccess
}