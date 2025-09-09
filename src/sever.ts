import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import helmet from "helmet"

import http from "http";

dotenv.config();

const app = express();
var server = http.createServer(app);


//middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());


// start the server
const PORT = process.env.PORT || 5000;
