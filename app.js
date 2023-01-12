import express, { json } from 'express';
import mongoose ,{ set, connect } from 'mongoose';
import routes from "./src/routes/route";
import smsRoute from "./src/routes/smsRoute";
import userRoute from "./src/routes/userRoute";
import passport from 'passport';
import bodyParser from 'body-parser';
import "dotenv/config";
import swaggerUI from "swagger-ui-express";
// import specs from "./swagger";
import { swaggerSpec } from './src/swagger.js';


set('strictQuery', true);
const app = express();
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use(json());
connect(process.env.DB_REMOTE, { useNewUrlParser: true })
.then(()=>{console.log("DB started!!!")});
app.use("/api/news/", routes);
app.use("/api", smsRoute);

// new from user
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./src/middleware/passport').default(passport)
require('./src/middleware/auth')
app.use('/api/user', userRoute);
// app.use("/heloo",passport.authenticate('jwt',{session:false}),userRoute)

app.listen(2005,()=>{console.log("server has started")});
export default app;























//image to check later


    // import { v2 as cloudinary } from 'cloudinary'
    // cloudinary.config({ 
    //     cloud_name: 'dwncoz80h', 
    //     api_key: '565431864745684', 
    //     api_secret: '-j9R4BM_Ld2EQk0wJXpr1oYqxpo' 
    //   });   