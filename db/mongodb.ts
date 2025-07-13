import mongoose from "mongoose";

const mongodbUrl = process.env.MONGODB_URI as string;

if (!mongodbUrl) {
  throw new Error(
    "please set your mongodb connection string in the environment variables"
  );
}

if (!global.mongoose) {
  global.mongoose = {
    connection: null,
    promise: null,
  };
}

const cachedConnection = global.mongoose;

const connectToMongodb = async () => {
  if (cachedConnection.connection) {
    return cachedConnection.connection;
  }
  if (!cachedConnection.promise) {
    cachedConnection.promise = mongoose
      .connect(mongodbUrl)
      .then(() => mongoose.connection);
  }
  try {
    cachedConnection.connection = await cachedConnection.promise;
  } catch (error) {
    cachedConnection.promise = null;
    throw error;
  }
  return cachedConnection.connection;
};

export default connectToMongodb;
