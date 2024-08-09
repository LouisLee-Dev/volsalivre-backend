const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const cities = require("./routes/api/cities");
const neighs = require("./routes/api/neighborhoods");
const turno = require("./routes/api/turno");
const tipo = require("./routes/api/tipo.js");
const periodo = require("./routes/api/periodo.js");
const users = require("./routes/api/users");
const roles = require("./routes/api/role.js");
const schools = require("./routes/api/schools");
const student = require("./routes/api/student.js");
const levels = require('./routes/api/levels');
const series = require("./routes/api/series");
const stripe = require("./routes/api/stripe.js");

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
app.use("/api/cities", cities);
app.use("/api/neighs", neighs);
app.use("/api/turno", turno);
app.use("/api/tipo", tipo);
app.use("/api/periodo", periodo);
app.use("/api/users", users);
app.use("/api/roles", roles);
app.use("/api/schools", schools);
app.use("/api/students", student);
app.use("/api/series", series);
app.use("/api/levels", levels);
app.use("/api/stripe", stripe);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on Port ${port}`));
