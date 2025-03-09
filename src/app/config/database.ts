import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToDb = async () => {
  try {
    const connectionString = `${process.env.MONGO_URI}`;
    await mongoose.connect(connectionString);

    console.log('Connected to MongoDB...');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectToDb;
