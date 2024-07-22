const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const cors = require('cors');
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const schools = require("./routes/api/schools.js");
const levels = require('./routes/api/levels');
const shift = require("./routes/api/shift.js");
const series = require('./routes/api/series.js');

const app = express();

// Body Parser middleware

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.raw())
app.use(bodyParser.json());

// DB Config
const db_uri = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
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
app.use("/api/schools", schools);
app.use("/api/series", series);
app.use("/api/levels", levels);
app.use("/api/shift", shift);
// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set Static Folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on Port ${port}`));
