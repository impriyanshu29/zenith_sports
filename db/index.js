import mongoose  from  "mongoose"
import { DB_NAME } from "../constants.js"


const conectDB = async()=>{
    try{
            const connectiondb = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
            console.log(`\n MongoDB connected !! DB HPST : ${connectiondb.connection.host}`);
    }catch(error){
        console.log('====================================');
        console.log("MongoDb connection failed ->", error);
        console.log('====================================');
    }
}

export default conectDB