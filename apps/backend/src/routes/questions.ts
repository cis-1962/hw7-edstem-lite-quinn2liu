import express, { Request, Response, NextFunction } from 'express';
import Question from '../models/question';
import requireAuth from '../middelwares/require-auth';

const questionsRouter = express.Router();

questionsRouter
    .route('/questions')
    .get( async (req: Request, res: Response, next: NextFunction) => {
        try {
            const questions = await Question.find();
            res.json(questions);
        } catch (error) {
            next(error);
        }
    });

questionsRouter
    .route('/add')
    .post(requireAuth, async (req: Request, res: Response, next: NextFunction) => {
        const { questionText } = req.body;
        const author = req.session ? req.session.user : undefined;
        if (!questionText) {
            return res.status(404).send('No question');
        }
        try {
            const question = new Question({questionText, author});
            await question.save();
            res.send('Question saved.');
        } catch (error) {
            next(error);
        }
});

questionsRouter
    .route('/answer')
    .post(requireAuth, async (req: Request, res: Response, next: NextFunction) => {
        const {_id, answer } = req.body;

        if (!_id || !answer) {
            return res.status(403).send('ID or answer not provided.');
        } 

        try {
            const question = await Question.findById(_id);
            if (!question) {
                return res.status(404).send('Question was not found.');
            }
            question.answer = answer;
            await question.save();
            res.send('Question answered.');
        } catch (error) {
            next(error);
        }
    })

export default questionsRouter;