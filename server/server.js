require('dotenv').config();
const express = require('express');
const cors = require("cors");
const app = express();
const authRoute = require('./router/auth-router');
const contactRoute = require('./router/contact-router');
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDb = require('./utils/db');
const errorMiddleware = require('./middlewares/error-middleware');

//lets tackle cors
// const corsOptions = {
//   origin: process.env.CLIENT_URL,
//   methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
//   credentials:true,
// }

// app.use(cors(corsOptions));

app.use(cors());

app.use(express.json());


app.use(express.json());// this keeps the data in json format
app.use('/api/auth', authRoute); //this is the main route
app.use('/api/form',contactRoute);
app.use('/api/data',serviceRoute);

//define admin route
app.use("/api/admin",adminRoute);

app.use(errorMiddleware);



const PORT = process.env.PORT || 5000;

connectDb().then(()=>{
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

});

