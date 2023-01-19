



import passport from "passport";
import User from "../models/user";
import passportJwt from "passport-jwt";

const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
function passportConfig(){
passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'TOP_SECRET',
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findOne({ _id: jwtPayload });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
  }
export default passportConfig;




















