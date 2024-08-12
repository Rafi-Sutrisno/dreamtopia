import mongoose from "mongoose";

let isConnect = false;

const connectToDB = async () => {
  mongoose.set("strictQuery", true); // no warning

  if (isConnect) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Dreams",
    });

    isConnect = true;

    console.log("MonggoDB connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
