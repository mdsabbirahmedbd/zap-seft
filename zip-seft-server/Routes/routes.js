const express = require("express");
const router = express.Router();
const { verifyToken ,verifyAdmin} = require("../middleware/middleware");


// User relatate api router 
const {createUser,allUserGetting,updateUserRole,deleteUser,userRoleBases} = require("../controllers/user.controller");
router.post('/users', createUser);
router.get('/all-users', verifyToken ,verifyAdmin, allUserGetting);
router.patch('/update-role/:id', verifyToken, verifyAdmin, updateUserRole);
router.delete('/delete-user/:id', verifyToken,verifyAdmin, deleteUser);
router.get('/user/:email/role' , verifyToken, userRoleBases)


// Rider relatate api router 
const {createRider, getAllRiders,updateRider,RiderAssinedOrUpdate,allAssignedRides,RiderAction,riderDeliveryChart} = require("../controllers/rider.controller"); 
router.post('/rider', createRider ,verifyToken);
router.get('/all-riders', getAllRiders, verifyToken, verifyAdmin);
router.patch('/update-rider/:id', verifyToken, verifyAdmin, updateRider);
router.patch('/rider-assigned/:id' , verifyToken ,verifyAdmin,RiderAssinedOrUpdate);
router.get('/assigned-rides' , verifyToken ,allAssignedRides);
router.patch('/rider-action/:id/status' , verifyToken ,RiderAction);
router.get('/rider-delivery-chart' , verifyToken ,riderDeliveryChart);



// payment  relatate api router 
const { getPaymentHistory,createCheckoutSession,paymentSuccess} = require('../controllers/payment.controller')
router.get('/payment-history', verifyToken, getPaymentHistory);
router.post('/create-checkout-session', verifyToken, createCheckoutSession);
router.patch('/payment-success', verifyToken, paymentSuccess);



// Parcel Relatate Api 
const {createParcel, getParcels, getParcelsById,deleteParcel,ParcelStatus} = require('../controllers/parcel.controller');
router.post('/parcels', verifyToken, createParcel);
router.get('/parcels', verifyToken, getParcels);
router.get('/parcel-payment/:id', verifyToken, getParcelsById);
router.delete('/parcelDelete/:id', verifyToken, deleteParcel);
router.get("/parcel-status", verifyToken ,verifyAdmin,ParcelStatus);


// Track Parcel 
const {getAllTraking} = require("../controllers/trakings.controller");

router.get('/track-parcel/:trackingId', getAllTraking);





// Sample Route
router.get("/", (req, res) => {
  res.send("Zip Self Server API Running...");
});

module.exports = router;
