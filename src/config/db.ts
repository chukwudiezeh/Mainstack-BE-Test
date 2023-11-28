import mongoose, { ConnectOptions }  from "mongoose";
mongoose.set('strictQuery', true);

// Db connection
export const connectDB = async (): Promise<void> => {
    await mongoose.connect(process.env.MONGO_DB_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    console.log("db connected");
};
