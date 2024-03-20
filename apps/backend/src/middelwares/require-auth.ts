/* eslint-disable @typescript-eslint/no-explicit-any */

declare module 'express' {
    export interface Request {
        session?: {
            user?: any | null;
        };
    }
}

const requireAuth = (req, res, next) => {
    if (req.session.user && req.session.user !== '') {
        next();
    } else {
        console.log(req.session.user);
        next(new Error('No user is logged in'));
    }
}

export default requireAuth;