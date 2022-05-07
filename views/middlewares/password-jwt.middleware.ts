/**
 * Author: Nam Dinh
 * Created At: Mon Apr 18 2022
 * File name: api-auth.middleware.ts
 */

import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import authService from '@services/auth-service';
import logger from 'jet-logger';
import _ from 'lodash';
import { Request, Response, NextFunction } from 'express';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(
    'jwt',
    new JwtStrategy(options, (jwtPayload, done) => {
        authService
            .verifyToken(jwtPayload.id)
            .then((user) => {
                done(null, user);
            })
            .catch((err) => done({ error: err }, false));
    })
);

export default passport;
