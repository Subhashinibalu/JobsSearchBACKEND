import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './Database/config.js'
import authRoute from './Routers/authRouter.js'


dotenv.config()

const app = express()

//middlewares
app.use(cors({
    origin:"*",
    credentials:true
}));

app.use(express.json())

//error handler middleware
// if there is an error will return that error
//else will return status code 500 with error message "Internal Server Error"
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });

//database connection
connectDB();

//routes
app.get('/',(req,res)=>{
    res.send("Welcome")
})


//API routes

//route for registration
app.use('/api/auth',authRoute)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port`)
})