import { connect } from "mongoose";

const connectToDb = async () => await connect(process.env.MONGO_URI ?? "");

export default connectToDb;
