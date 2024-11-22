require("dotenv").config();
const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const { corsOptions } = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const { credentials } = require("./middleware/credential");
const verifyJWT = require("./middleware/verifyJwt");
connectDB();
//app.use(cors(corsOptions));
app.use(credentials)
app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());
app.use(`/car`,require('./routes/car/addCar'))
app.use(`/car`,require('./routes/car/getCarlist'))
app.use(`/car`,require('./routes/car/getDaily'))
app.use(`/car`,require('./routes/car/getinfo'))
app.use(`/car`,require('./routes/car/getRepairs'))
app.use(`/driver`,require('./routes/driver/acceptDriver'))
app.use(`/driver`,require('./routes/driver/getDrivers'))
app.use(`/driver`,require('./routes/driver/getinfo'))
app.use(`/driver`,require('./routes/driver/getDaily'))
app.use(`/driver`,require('./routes/driver/getRepairs'))
app.use(``, require(`./routes/user`));

app.use(verifyJWT)
app.use(`/interview`,require('./routes/interview/add'))
app.use(`/interview`,require('./routes/interview/getData'))

app.get(`/`, (req, res) => {
  res.send(`reat output`);
});

mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");
  app.listen(port, () => {
    console.log(`server runing on port ${port} `);
  });
});
