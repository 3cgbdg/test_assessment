"use client"

import { getQuiz, } from "@/services/apis";
import { IQuiz } from "@/types/types"
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"

const Page = () => {
    const [quiz, setQuiz] = useState<IQuiz>();
    const { id } = useParams() as { id: string };
    // getting quiz by id 
    useEffect(() => {
        if (!id) return;
        const fetchQuiz = async () => {
            const data = await getQuiz(id);
            if (data)
                setQuiz(data);
        };
        fetchQuiz();
    }, [id])


    return (
        <div className="flex items-center flex-col gap-4">
            <h1 className="section-title">Quiz : '{quiz?.title}'</h1>
            {quiz ?
                <div className="">

                    {quiz.questions.length > 0 && (
                        <div className="_border rounded-2xl flex flex-col gap-4 p-4 bg-white shadow-sm">
                            <h2 className="text-xl font-semibold">Questions ({quiz.questions.length})</h2>
                            <div className="">
                                <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto w-[250px] ">
                                    {quiz.questions.map((question, idx) => (
                                        <div
                                            key={question.id}
                                            className="_border pl-4 py-2 flex justify-between items-start  p-3 rounded"
                                        >
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">
                                                    {idx + 1}. {question.text}
                                                </p>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    Type: <span className="font-semibold ">{question.type}</span>
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Answer:
                                                    <span className="font-semibold">
                                                        {typeof question.answer === "boolean"
                                                            ? question.answer ? "Yes" : "No"
                                                            : Array.isArray(question.answer)
                                                                ? question.answer.join(", ")
                                                                : question.answer}
                                                    </span>
                                                </p>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            </div>


                        </div>
                    )}
                </div>
                :
                <h2 className="section-title text-center pt-10">404</h2>
            }

        </div>
    )
}

export default Page