import express from "express";
import { adminLoginValidator, validate } from "../lib/validator.js";
import { adminLogin, getAdminData } from "../controllers/admin.controller.js";
import { isAdmin } from "../middlewares/auth.js";

const app = express.Router();

app.post("/verify", adminLoginValidator(), validate, adminLogin);
app.get("/logout");
app.use(isAdmin);
app.get("/", getAdminData);
app.get("/users");
app.get("/chats");
app.get("/messages");
app.get("/stats");

export default app;
