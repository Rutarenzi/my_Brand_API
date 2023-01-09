import { default as user } from "../models/user";
import passportJwt from 'passport-jwt'

const JWTstrategy = passportJwt.Strategy;
const ExtractJWT = passportJwt.ExtractJwt;

export default (passport) =>{
    let opt={};
    opt.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme('jwt')
    opt.secretOrKey = "secretKey";
    try{
        passport.use(new JWTstrategy(opt, async(jwt_payload, done)=>{
            let user = await user.findOne({_id:jwt_payload.userId}).exec();
            if(!__dirname.isEmpty(user)){
                done(null,user);
            }
            else{
                done(null, false);
            }
        }));
    } catch(err){
        throw(err);
    }
}