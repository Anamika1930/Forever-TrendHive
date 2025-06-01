import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoute.js'
import adminAuth from './middleware/adminAuth.js';
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App Config 
const app = express();
const port =process.env.PORT || 4000
connectDB()
connectCloudinary()

// middilewares 
app.use(express.json());
app.use(cors())

// api endpoints
app.use('/api/user',userRouter);
// app.use('/api/product',productRouter);
app.use('/api/product', adminAuth, productRouter);
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Server Error" });
});

app.listen(port, ()=> console.log('Server started on PORT : '+port))

