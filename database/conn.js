import mongoose from "mongoose";

const connect = async ()=>{
    try{
      const {connection} = await mongoose.connect(process.env.MONGODB_CONNECTION);
      if(connection.readyState == 1){
        return Promise.resolve(true);
      }
    }catch(error){
        return Promise.reject(error);
    }
}

export default connect;