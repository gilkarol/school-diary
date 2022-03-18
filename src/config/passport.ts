
import { Strategy, ExtractJwt } from 'passport-jwt'
import { User } from '../entity/User';
import database from '../util/database';

export default (passport: any) => {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET_TOKEN,
    }
    passport.use(
        new Strategy(options, async (jwt_payload: any, done: any) => {
            try {
                const database1 = await database
                const userRepository = database1.getRepository(User)
                const user = await userRepository.findOne({ id: jwt_payload.userId })
                if (user) return done(null, user)
                return done(null, false)
            } catch (err) {
                return done(err, false)
            }
        })
    )
    
}
