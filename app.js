import express, {json} from "express";
import { set, connect } from 'mongoose';
import routes from "./src/routes/route";
import smsRoute from "./src/routes/smsRoute";
import userRoute from "./src/routes/userRoute";
import passport from 'passport';
import bodyParser from 'body-parser';
import "dotenv/config";
import swaggerUI from "swagger-ui-express";
import { swaggerSpec } from './src/swagger.js';
import cors from "cors";
import passportConfig from './src/middleware/auth';
passportConfig();
set('strictQuery', true);
const app = express();
app.use(json());
app.use(cors())
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
connect(process.env.DB_REMOTE, { useNewUrlParser: true })
.then(()=>{console.log("DB started!!!")});

app.use("/api/", routes);
app.use("/api/", smsRoute);
app.use('/api/auth/', userRoute);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());

app.listen(2006,()=>{console.log("server has started")});
export default app;





















