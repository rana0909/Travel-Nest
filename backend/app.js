const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const database = require("./config/database");
const UserRouter = require("./routes/UserRouter");
const PropertiesRouter = require("./routes/PropertiesRouter");

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const originList = ["http://localhost:3000", "http://localhost:4200"];

const corsOptions = {
  origin: (origin, callback) => {
    if (originList.includes(origin)) {
      callback(null, true);
    } else {
      console.log(origin);
      callback(new Error("not allowed by cors"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors());
app.use(cors(corsOptions));

app.use(UserRouter);
app.use(PropertiesRouter);

try {
  mongoose.connect(database.url, (err, resp) => {
    console.log("Connected to MongoDB!");
    app.listen(port, () => {
      console.log(`App listening on port : ${port}`);
    });
  });
} catch (err) {
  console.log(err);
}
