import mongoose from "mongoose";

let isConnect = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true); // no warning

  if (isConnect) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Dreams",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnect = true;

    console.log("MonggoDB connected");
  } catch (error) {
    console.log(error);
  }
};
