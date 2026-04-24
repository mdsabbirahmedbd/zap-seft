const {client} = require("../config/mongodb");
const { ObjectId } = require("mongodb");
const Parsels = client.db("Procode").collection("parcels");


const createParcel = async (req,res) => {
        try{
        const parcel = req.body;
        const result = await Parsels.insertOne(parcel);
        res.send({message: "Parcel created successfully", result});
    }catch(error){
         res.status(500).send({message: "Failed to create parcel", error: error.message});
    }
}

const ParcelStatus = async (req,res) => {
    try{
       const pipline = [
           {
            $group:{
                _id : "$delivery_status",
                count : {$sum : 1}
            }
           },
           {
            $project : {
                status : "$_id",
                count : 1,
                _id : 1
            }
           }
       ]

       const result = await Parsels.aggregate(pipline).toArray();
       res.send(result);
    }
    catch(error){
        res.status(500).send({message: "Failed to find  parcel status", error: error.message});
    }
}


const getParcels  = async (req,res) => {
    try{
        const {email,delivaryStatus} = req.query;
        const query =  {};
        if(email){
            query.created_by = email;
        }

        if(delivaryStatus){
            query.delivery_status = delivaryStatus;
        }

        const option = {sort: {creation_date: -1 }}
        const result = await Parsels.find(query,option).toArray();
        res.send(result);
 }catch(error){
    res.status(500).send({message: "Failed to get parcels", error: error.message});
 }
}

const getParcelsById = async (req,res)=>{
    try{
         const id = req.params.id;
         const query  = {_id : new ObjectId(id)};
         const result = await Parsels.findOne(query);
         res.send(result);
       }
       catch(error){
        res.status(500).send({message: "Failed to get parcel", error: error.message});
       }
}

const deleteParcel  = async (req,res) => {
    try{
           const id = req.params.id;
           const query = {_id : new ObjectId(id)}
           const result  = await Parsels.deleteOne(query);
           res.send(result);
        }
        catch(error){
            res.status(500).send({message: "Failed to delete parcel", error: error.message});
        }
}

module.exports = {
    createParcel,
    getParcels,
    getParcelsById,
    deleteParcel,
    ParcelStatus
}
