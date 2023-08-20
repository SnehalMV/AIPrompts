import mongoose from "mongoose";

let isConnected = false

export const dbConnection = async () => {
  mongoose.set("strictQuery", true)

  if(isConnected){
    console.log("Connected to MongoDB");
  }

  try {
    await mongoose.connect(process.env.MONGO_CONN_URI, {
      dbName:'Prompts',
      useNewUrlParser:true,
      useUnifiedTopology:true
    })

    isConnected = true
    console.log("Connected to MongoDB");

  } catch (error) {
    console.log(error);
  }
}