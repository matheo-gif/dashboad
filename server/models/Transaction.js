import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    userId: String,
    cost: String,
    products: {
        Type: [mongoose.Types.ObjectId],
        of: Number
    },
}, { timestamps: true });

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;