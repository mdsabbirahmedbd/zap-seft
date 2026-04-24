const {client} = require("../config/mongodb");
const Trakings = client.db("Procode").collection("Trakings");


 const logTraking = async (trackingId,status) => {
    const log = {
        trackingId,
        status,
        date: new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }),
        details : status.split("_").join(" "),
    }

    const result = await Trakings.insertOne(log);
    return result
 }



 const getAllTraking  = async (req,res) => {
     const trackingId = req.params;
     const result = await Trakings.find(trackingId).toArray();
     res.send(result);
 }



 module.exports = {logTraking ,getAllTraking}