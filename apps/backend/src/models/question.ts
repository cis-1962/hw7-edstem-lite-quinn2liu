import { Schema, model } from 'mongoose';

const questionSchema = new Schema({
    questionText: { type: String },
    answer: { type: String },
    author: { type: String},
});

const Question = model('Question', questionSchema);

export default Question;