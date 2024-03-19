import express, { json } from "express";
import "dotenv/config";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import AuthRouter from "./src/routers/Auth.router.js";
import DBConnection from "./src/database/DB_Connection.js";
import { errorThrowingMiddleware } from "./src/middlewares/ErrorThrowing.middleware.js";

const app = express();

const server = createServer(app);

app.use(json());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  },
});
const options = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(options));

DBConnection();
app.use(errorThrowingMiddleware);

app.use("/api/auth", AuthRouter);
io.on("connection", (socket) => {
  socket.emit("welcome", `welcome to the server ${socket.id}`);

  socket.on("massage", (m) => {
    console.log(m);
    io.emit("data", m);
  });
});

server.listen(process.env.PORT, () => {
  console.log("Server is running on port ", process.env.PORT);
});
