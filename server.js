//require dotenv file to encode password
require("dotenv").config();

//Initializing necessary dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const res = require("express/lib/response");
const { Router } = require("express");
const user_controller = require("./controllers/user_controller");
const jobsController = require("./controllers/jobs_controller")
const auth_middleware = require("./middleware/auth_middleware");

//Will probably insert router here later

const app = express();
const port = process.env.PORT || 3000;
const connStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@generalassembly.odxzs.mongodb.net`;

//set view engine
app.set('view engine', 'ejs')

//express use
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors({
  origin: '*'
}))

const jobRoutes = require('./routers/job_routes')
app.use('/jobs', jobRoutes)

const userRoutes = require('./routers/user_routes')
app.use('/users', userRoutes)

//listening port
app.listen(port, async () => {
  try {
    await mongoose.connect(connStr, { dbName: "Job-Posting" });
  } catch (err) {
    console.log(err);
    console.log(`Failed to connect to DB`);
    process.exit(1);
  }
  console.log("Connected to DB");
  console.log(`Example app listening on port ${port}`);
});
