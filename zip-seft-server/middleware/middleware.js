const admin = require("firebase-admin");
const {client} = require("../config/mongodb");
const Users = client.db("Procode").collection("users");



const decoded = Buffer.from(process.env.FB_SERVICE_KEY , 'base64').toString('utf8');

const serviceAccount = JSON.parse(decoded);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const verifyToken = async (req,res,next) => {
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).send({message : "Unauthorized access"});
    }
    
    try {
        const idToken =  token.split(" ")[1];
        const decodedToken = await admin.auth().verifyIdToken(idToken);
       req.decodedToken_email = decodedToken.email;
    }
    catch(error){
        return res.status(401).send({message : "Unauthorized access"});
    }
    next();
}

const verifyAdmin = async (req,res,next) => {
    const email = req.decodedToken_email;
    const query = {email : email};
    const user = await Users.findOne(query);
    if(!user || user.role !== "admin") return res.status(403).send({message : "Forbidden access middleware"});

    next();
}

module.exports = {
    verifyToken,
    verifyAdmin
}