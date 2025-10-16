import { IQuestion, IQuiz } from "@/types/types";
import axios from "axios";

// creating quiz return boolean (true--created othewise false)
export const createQuiz = async ({ questions, quizTitle }: { questions: IQuestion[], quizTitle: string }): Promise<boolean> => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/quizzes`, {
            questions: questions, quizTitle: quizTitle
        })
        return !!res;
    } catch (err) {
        console.error(err);
        return false;

    }
}

//getting quizzs
export const getQuizzes = async (): Promise<IQuiz[] | null> => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/quizzes`)
        return res.data;
    } catch (err) {
        console.error(err);
        return null;
    }
}

//getting quiz
export const getQuiz = async (quizId: string): Promise<IQuiz | null> => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/${quizId}`)
        return res.data;
    } catch (err) {
        console.error(err);
        return null;
    }
}

// deleting quiz return boolean (true--deleted othewise false)
export const deleteQuizzes = async (quizId: string): Promise<boolean> => {
    try {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/${quizId}`)
        return !!res;
    } catch (err) {
        console.error(err);
        return false;
    }
}
