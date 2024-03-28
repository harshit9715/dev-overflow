import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.error("MONGODB_URL is missing");
  }

  if (isConnected) {
    return console.log("=> using existing database connection");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "DevOverflow",
    });
    isConnected = true;
    console.log("=> using new database connection");
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
};
