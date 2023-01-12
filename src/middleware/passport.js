import   User  from "../models/user";
import passportJwt from 'passport-jwt'
import passport from "passport";
const JWTstrategy = passportJwt.Strategy;
const ExtractJWT = passportJwt.ExtractJwt;

export default function  passporter(){
    // let opt={};
    // opt.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme('jwt')
    // opt.secretOrKey = "TOP_SECRET";
    try{
        passport.use(new JWTstrategy({
            secretOrKey: "TOP_SECRET",
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()


         },
         async (jwtPayload, done) => {
            try {
              const user = await User.findOne({ _id: jwtPayload._id });
              return done(null, user);
            } catch (err) {
              return done(err);
            }
          }
        ))
        
        //async(jwt_payload, done)=>{
        //     let user = await User.findOne({_id:jwt_payload.id}).exec();
        //     // if(!__dirname.isEmpty(user)){
        //     //     done(null,user);
        //     // }
        //     // else{
        //     //     done(null, false);
        //     // }
        //     return done(null, user);
        // }));
    } catch(err){
        throw(err);
    }
}