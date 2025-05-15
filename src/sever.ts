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


//Global error handler
app.use(errorHandler);

//Socket.IO connection listener
io.on("connection", (socket:any) => {
    console.log("new client connected: ", socket.id);

    socket.on("disconnect", () => {
        console.log("Client disconnected: ", socket.id);
    })
})

// start the server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})