
//question type 
export interface IQuestion {
    id: string;
    text: string;
    type: "boolean" | "input" | "checkbox";
    answer: boolean | string | string[];
}

// quiz type
export interface IQuiz {
    id: string,
    title: string,
    questions: IQuestion[],
    createdAt: string,

}