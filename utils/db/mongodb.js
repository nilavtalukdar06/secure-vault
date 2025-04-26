import mongoose from "mongoose";

const databaseUrl = process.env.DATABASE_URL;

const connect = async () => {
  try {
    await mongoose.connect(databaseUrl);
    console.log("connected to database");
  } catch (error) {
    console.error(`error connecting to mongodb, error: ${error}`);
  }
};

export default connect;
