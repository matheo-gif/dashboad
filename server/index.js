import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import clientRoutes from "./routes/client.js"
import generalRoutes from "./routes/general.js"
import managementRoutes from "./routes/management.js"
import salesRoutes from "./routes/sales.js"

import User from "./models/User.js"
import Product from "./models/Product.js"
import ProductStat from "./models/ProductStat.js"
import Transaction from "./models/Transaction.js"
import OverallStat from "./models/OverallStat.js"
import { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat } from "./data/index.js"





/*CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json())
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/*ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// mongoose setup
const PORT = process.env.PORT || 9000;
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`server Port: ${PORT}`));
        /* only add data one time*/
        // User.insertMany(dataUser);
        // Product.insertMany(dataProduct);
        // Transaction.insertMany(dataTransaction)
        // ProductStat.insertMany(dataProductStat);
        // OverallStat.insertMany(dataOverallStat);

    })
    .catch((error) => console.log(`${error} did not connect`));