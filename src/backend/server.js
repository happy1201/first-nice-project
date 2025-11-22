import express from "express"
import { hello } from "./controller/mainController.js";
import { firstIntegerValue } from "./controller/mainController.js";
import { createOrder, verifyPayment } from "./controller/mainController.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); 
const PORT = 9091;

app.get("/", hello);
app.get("/first-integer", firstIntegerValue);
app.post("/create-order", createOrder);
app.post("/verify-payment", verifyPayment);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});