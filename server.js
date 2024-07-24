const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const roles = require("./routes/api/role.js");
const posts = require("./routes/api/posts");
const schools = require("./routes/api/schools");
const levels = require('./routes/api/levels');
const shift = require("./routes/api/shift");
const series = require("./routes/api/series");

const app = express();

// Body Parser middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db_uri = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport.js")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/roles", roles);
app.use("/api/schools", schools);
app.use("/api/series", series);
app.use("/api/levels", levels);
app.use("/api/shift", shift);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on Port ${port}`));
