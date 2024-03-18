import mongoose from "mongoose";

const DBConnection =async()=>{
    try {
        const connection =await mongoose.connect(process.env.DATABASE_CONNECTION_URL)
        if(!connection){
            console.log("Database not connected....");
        }else{
            console.log("Database connected successfuly....");
        }
    } catch (error) {
        console.log("DataBase connection error: ",error);
    }
}

export default DBConnection;