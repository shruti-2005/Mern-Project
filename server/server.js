require('dotenv').config();
const express = require('express');
const app = express();
const authRoute = require('./router/auth-router');
const contactRoute = require('./router/contact-router');
const connectDb = require('./utils/db');
const errorMiddleware = require('./middlewares/error-middleware');

app.use(express.json());// this keeps the data in json format
app.use('/api/auth', authRoute); //this is the main route
app.use('/api/form',contactRoute);

app.use(errorMiddleware);



const PORT = 3000;

connectDb().then(()=>{
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

});

