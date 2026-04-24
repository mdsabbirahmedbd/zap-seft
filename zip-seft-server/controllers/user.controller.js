const { ObjectId } = require("mongodb");
const {client} = require("../config/mongodb");
const Users = client.db("Procode").collection("users");

const createUser = async (req,res)=>{
    try{
    const user =  req.body;

    const isExist = await Users.findOne({email : user.email});
    if(isExist){
        return res.send({message : "User already exist"});
    }
    user.creation_date = new Date();
    user.role = "user";
    const result = await Users.insertOne(user);
    res.send({message: "User created successfully", result});
  }catch(error){
     res.status(500).send({message: "Failed to create user", error: error.message});
  }
}

const allUserGetting  = async (req,res) => {
    try{
        const searchText =  req.query.searchText
        const query = {}
        if(searchText){
            query.$or = [
                {displayName : {$regex : searchText, $options : "i"}},
                {email : {$regex : searchText, $options : "i"}}
            ]
        }
        const result = await Users.find(query).toArray();
        res.send(result);
    }catch(error){
        res.status(500).send({message: "Failed to get users", error: error.message});
    }
}

const updateUserRole = async (req,res) => {
    try{
        const id = req.params.id;
        const {role} = await req.body
        const query = {_id : new ObjectId(id)};
        const updatedDoc = {$set : {role: role}};
        const result = await Users.updateOne(query,updatedDoc);
        res.send(result);
    }catch(error){
        res.status(500).send({message: "Failed to update user role", error: error.message});
    }
}

const deleteUser = async (req,res) => {
   try{
     const id = req.params.id ;
     const query = {_id : new ObjectId(id)};
     const result = await Users.deleteOne(query);
     res.send(result);
   }
   catch(error){
    res.status(500).send({message: "Failed to delete user", error: error.message});
   }
}

const userRoleBases = async (req,res) => {
    try{
        const email =  req.params.email;
        const query = {email : email};
        const user = await Users.findOne(query);

        res.send({role : user?.role || "user"});
    }catch(error){
        res.status(500).send({message: "Failed to get user role", error: error.message});
    }
}

module.exports = {
    createUser,
    allUserGetting,
    updateUserRole,
    deleteUser,  
    userRoleBases
}