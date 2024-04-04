import express, { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import requireAuth from '../middelwares/require-auth';
import mongoose from 'mongoose';

const accountRouter = express.Router();

accountRouter
    .route('/signup')
    .post( async (req: Request, res: Response, next: NextFunction) => {

        if (mongoose.connection.readyState !== 1) {
            return res.status(500).send('Database not connected');
        }

        const { username, password } = req.body as {
            username: string;
            password: string;
        };

        if (!username || !password) {
            return res.status(400).send('Username or password not provided.');
        }

        try {
            const userExists = await User.findOne({ username });
            if ( userExists ) {
                return res.status(401).send(`The username "${username}" is already in use.`);
            }
            const user = new User( { username, password} );
            await user.save();

            req.session!.user =  username;

            res.send('User information saved correctly!');
        } catch (error) {
            next(error);
        }
    });

accountRouter
    .route('/login')
    .post( async (req: Request, res: Response, next: NextFunction) => {
        const { username, password } = req.body as {
            username: string;
            password: string;
        };

        if (!username || !password) {
            return res.status(400).send('Username or password not provided.');
        }

        try {
            const user = await User.findOne( {username} );
            if (!user) {
                return res.status(402).send('Username not found');
            }
            if (password !== user.password) {
                return res.status(403).send('Incorrect password');
            }
            req.session!.user =  username;    
            res.send('Login successful.');
        } catch(error) {
            next(error);
        }
    });

accountRouter
    .route('/logout')
    .post(requireAuth, async (req: Request, res: Response) => {
        if (req.session) {
            req.session.user = null;
        }
        res.send('User logged out.');
    });

accountRouter
    .route('/userstatus')
    .get(async (req: Request, res: Response) => {
        if (
            req.session!.user === null ||
            req.session!.user === '' ||
            req.session!.user === undefined
          ) {
            res.send('User logged out.');
          } else {
            res.send(req.session!.user);
          }
    })
export default accountRouter;

