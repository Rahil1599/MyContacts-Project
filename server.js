const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");

connectDb();
const app = express();

const port = process.env.PORT || 8082;


app.use(express.json());
app.use("/api/contacts", require("./Routes/ContactRoutes"));
app.use("/api/users", require("./Routes/UserRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
