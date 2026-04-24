const { ObjectId } = require("mongodb");
const {client} = require("../config/mongodb");
const Riders = client.db("Procode").collection("riders");
const Users = client.db("Procode").collection("users");
const Parsels = client.db("Procode").collection("parcels");
const {logTraking} = require("../controllers/trakings.controller");

const createRider = async (req,res) => {
      try{
          const rider = req.body;
          const result = await Riders.insertOne(rider);
          res.send({message: "Rider created successfully", result});
  }catch(error){
       res.status(500).send({message: "Failed to create rider", error: error.message});
  }
}

const riderDeliveryChart  = async  (req,res) => {
    try{
      const email  = req.query.email;
      const pipline = [
         {
           $match : {
              riderEmail : email,
              delivery_status : 'Delivered'
           }
         },
         {
            $group : {
                   _id: "$riderEmail",
                    totalDeliveries: { $sum: 1 },
                    totalEarned: { $sum: "$totalcost" },
            }
         },
         {
      
                $addFields: {
                    payout: { $multiply: ["$totalEarned", 0.30] }
                }
            }
         
      ]

      const result = await Parsels.aggregate(pipline).toArray();
      res.send(result[0] || {}); 
    } 
    catch(error){
       res.status(500).send({message: "Failed to get riders delivery chart", error: error.message});
    }
}

const getAllRiders = async (req,res) => {
   try{
      const {district,status,work_status} = req.query
      const query = {}

      if(status){
          query.status = status
      }
        
      if(work_status){
          query.work_status = work_status;
      }
      if(district){
          query.district = district;
      }


      const result = await Riders.find(query).toArray();
      res.send(result); 
   }
   catch(error){
       res.status(500).send({message: "Failed to get riders", error: error.message});
   }
}


const updateRider = async (req,res) => {
  try{
    const status = req.body.status;
   const id = req.params.id 
   const query = {_id : new ObjectId(id)};
   const updatedDoc = {
     $set :{
        status : status
     }
   }
   const result = await Riders.updateOne(query,updatedDoc);

      const email = req.body.email;
      const query2 = {email  : email};
      
    
   if(status === "approved"){
    const updateDoc = {$set :{ role : "rider"}};
      const result = await Users.updateOne(query2,updateDoc);
   }else if(status === "rejected"){
    const updateDoc = {$set :{ role : "user"}};
    const result = await Users.updateOne(query2,updateDoc);
   }
   res.send(result);
  }
  catch(error){
       res.status(500).send({message: "Failed to update rider", error: error.message});
  }
}




const RiderAssinedOrUpdate = async (req,res) => {
   try{
      const {riderId , riderName , riderEmail,parcelId,trackingId } = req.body;
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const updatedDoc = {
         $set :{
            delivery_status : "Driver_Assigned",
            riderId : riderId,
            riderName : riderName,
            riderEmail : riderEmail
         }
      }
      const result = await Parsels.updateOne(query,updatedDoc);

      const riderQuery = {_id : new ObjectId(riderId)};
      const updateRider = {$set:{work_status : 'In Delivery'}};
      const riderResult = await Riders.updateOne(riderQuery,updateRider);
      logTraking(trackingId,"Driver_Assigned")

      res.send(result);

   }
   catch(error){
       res.status(500).send({message: "Failed to rider assined or  update ", error: error.message});
   }
}

const allAssignedRides = async (req,res) => {
   try{
      const {delivaryStatus,riderEmail} = req.query
      const query = {}
      if(delivaryStatus !== 'Delivered'){
         query.delivery_status = {$in:['On_The_Way','Driver_Assigned','Picked_Up']}
      }
      else {
         query.delivery_status = delivaryStatus
      }


      if(riderEmail){
         query.riderEmail = riderEmail
      }
      const result = await Parsels.find(query).toArray();
      res.send(result);

   }
   catch(error){
       res.status(500).send({message: "Failed to update rider", error: error.message});
   }

}


const RiderAction = async (req,res) => {
   try{
      const id = req.params.id;
      const {delivery_status,trackingId} = req.body;
      const query = {_id : new ObjectId(id)};
      const updatedDoc = { $set :{delivery_status : delivery_status }}
      const result = await Parsels.updateOne(query,updatedDoc);

   //   update rider role if parcel delivered
      if(delivery_status === "Delivered"){
           const {riderId} = req.body;
           const riderQuery = {_id : new ObjectId(riderId)};
           const updateRider = {$set:{work_status : 'available'}};
           const riderResult = await Riders.updateOne(riderQuery,updateRider);
      } 
      logTraking(trackingId,delivery_status)
      res.send(result);
   }
   catch(error){
       res.status(500).send({message: "Failed to update rider", error: error.message});
   }
}


module.exports = {
    createRider,
    getAllRiders,
    updateRider,
    RiderAssinedOrUpdate,
    allAssignedRides,
    RiderAction,
    riderDeliveryChart
}