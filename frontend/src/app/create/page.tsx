'use client'
import { createQuiz } from "@/services/apis";
import { IQuestion } from "@/types/types";
import { ArrowRight, Trash2, Plus } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState } from "react"
import { useForm } from "react-hook-form"


// form for reactHookForms
interface IQuizForm {
    title: string;
    questionTitle?: string;
    type?: "boolean" | "input" | "checkbox";
    answer?: boolean | string | string[];
    checkboxAnswer?: string;
}

const Page = () => {
    const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm<IQuizForm>();
    const [quizTitle, setQuizTitle] = useState<string | null>(null);
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [checkboxAnswers, setCheckboxAnswers] = useState<string[]>([]);
    const [newCheckboxAnswer, setNewCheckboxAnswer] = useState<string>("");
    const router = useRouter();
    // adding title and moving to next stage
    const addTitle = (data: IQuizForm) => {
        if (data.title?.trim()) {
            setQuizTitle(data.title);
            reset();
        }
    }
    // adding question
    const addQuestion = (data: IQuizForm) => {
        if (!data.questionTitle?.trim()) return;

        let finalAnswer: boolean | string | string[] = "";
        // checking type
        if (data.type === "boolean") {
            finalAnswer = data.answer === true || data.answer === "true";
        } else if (data.type === "checkbox") {
            finalAnswer = checkboxAnswers;
        } else {
            finalAnswer = data.answer || "";
        }

        const newQuestion: IQuestion = {
            id: Date.now().toString(),
            text: data.questionTitle,
            type: data.type as "boolean" | "input" | "checkbox",
            answer: finalAnswer
        };
        // adding to questions 
        setQuestions([...questions, newQuestion]);
        setCheckboxAnswers([]);
        // resseting checkbox answer input
        reset({ type: "boolean", checkboxAnswer: "" });
    };

    const deleteQuestion = (id: string) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    const addCheckboxAnswer = () => {
        if (newCheckboxAnswer.trim()) {
            setCheckboxAnswers([...checkboxAnswers, newCheckboxAnswer]);
            setNewCheckboxAnswer("");
        }
    };

    const removeCheckboxAnswer = (index: number) => {
        setCheckboxAnswers(checkboxAnswers.filter((_, i) => i !== index));
    };

    const type = watch("type");

    return (
        <div className="flex flex-col gap-6 items-center p-4  ">
            <h1 className="text-3xl font-bold">Create a quiz</h1>

            {!quizTitle ? (
                <div className="max-w-[800px] w-full">
                    <div className="_border rounded-2xl flex flex-col gap-4 p-4 bg-white shadow-sm">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm leading-[22px] font-medium">Quiz Title</label>
                            <input
                                {...register("title", {
                                    validate: {
                                        isEmpty: (value) => value?.trim() !== "" || "Field is required",
                                    },
                                })}
                                className="w-full _border rounded-md p-2"
                                placeholder="Enter quiz title"
                                type="text"
                            />
                            {errors.title && (
                                <span className="text-red-500 font-medium">{errors.title.message}</span>
                            )}
                        </div>
                        <button
                            onClick={handleSubmit(addTitle)}
                            type="button"
                            className="button-transparent w-fit mx-auto flex items-center gap-2 px-4 py-2 rounded-md transition"
                        >
                            Next <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-[900px] flex flex-col gap-6">

                    <div className="_border rounded-2xl flex flex-col gap-4 p-4 bg-white shadow-sm">
                        <h2 className="text-xl font-semibold">Quiz: {quizTitle}</h2>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm leading-[22px] font-medium">Question text</label>
                            <input
                                {...register("questionTitle", {
                                    validate: {
                                        isEmpty: (value) => value?.trim() !== "" || "Field is required",
                                    },
                                })}
                                className="w-full _border rounded-md p-2"
                                placeholder="Enter question text"
                                type="text"
                            />
                            {errors.questionTitle && (
                                <span className="text-red-500 font-medium">{errors.questionTitle.message}</span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm leading-[22px] font-medium">Question type</label>
                            <select
                                {...register("type")}
                                className="max-w-[200px] _border rounded-md p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="boolean">Yes/No</option>
                                <option value="checkbox">Multiple answers</option>
                                <option value="input">Text answer</option>
                            </select>
                        </div>


                        {type === "boolean" && (
                            <div className="flex flex-col gap-2">
                                <h3 className="font-medium">Select the correct answer:</h3>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setValue("answer", true)}
                                        className="px-4 py-2 button-transparent"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setValue("answer", false)}
                                        className="px-4 py-2 button-transparent"
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        )}


                        {type === "checkbox" && (
                            <div className="flex flex-col gap-2">
                                <h3 className="font-medium">Add correct answers:</h3>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter answer option"
                                        className="flex-1 _border rounded-md p-2 "
                                        value={newCheckboxAnswer}
                                        onChange={(e) => setNewCheckboxAnswer(e.target.value)}

                                    />
                                    <button
                                        type="button"
                                        onClick={addCheckboxAnswer}
                                        className="button-transparent px-3 py-2  flex items-center gap-1 transition"
                                    >
                                        <Plus size={18} /> Add
                                    </button>
                                </div>

                                {checkboxAnswers.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {checkboxAnswers.map((answer, idx) => (
                                            <div
                                                key={idx}
                                                className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                                            >
                                                {answer}
                                                <button
                                                    type="button"
                                                    onClick={() => removeCheckboxAnswer(idx)}
                                                    className="text-red-500 hover:text-red-700 font-bold cursor-pointer"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}


                        {type === "input" && (
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium">Correct answer:</label>
                                <input
                                    type="text"
                                    placeholder="Enter the correct answer"
                                    {...register("answer")}
                                    className="_border rounded-md p-2 "
                                />
                            </div>
                        )}

                        <button
                            onClick={handleSubmit(addQuestion)}
                            type="button"
                            className=" w-fit mx-auto flex items-center button-transparent gap-2 px-4 py-2 rounded-md transition"
                        >
                            Add Question <ArrowRight size={20} />
                        </button>
                    </div>


                    {questions.length > 0 && (
                        <div className="_border rounded-2xl flex flex-col gap-4 p-4 bg-white shadow-sm">
                            <h2 className="text-xl font-semibold">Questions ({questions.length})</h2>

                            <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto">
                                {questions.map((question, idx) => (
                                    <div
                                        key={question.id}
                                        className="_border pl-4 py-2 flex justify-between items-start  p-3 rounded"
                                    >
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">
                                                {idx + 1}. {question.text}
                                            </p>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Type: <span className="font-semibold capitalize">{question.type}</span>
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Answer:{" "}
                                                <span className="font-semibold">
                                                    {typeof question.answer === "boolean"
                                                        ? question.answer ? "Yes" : "No"
                                                        : Array.isArray(question.answer)
                                                            ? question.answer.join(", ")
                                                            : question.answer}
                                                </span>
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => deleteQuestion(question.id)}
                                            className="button-transparent transition ml-2"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <button onClick={async () => {
                                const isOkay = await createQuiz({ questions: questions, quizTitle: quizTitle });
                                if (isOkay) {
                                    router.push('/quizzes');
                                }
                            }}
                                type="button"
                                className="button-transparent w-fit mx-auto px-6 py-2"
                            >
                                Save Quiz
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Page;