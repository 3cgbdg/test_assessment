"use client"

import { deleteQuizzes, getQuizzes } from "@/services/apis";
import { IQuiz } from "@/types/types"
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react"

const Page = () => {
    const [quizzes, setQuizzes] = useState<IQuiz[]>();
    // getting quizzes
    useEffect(() => {
        const fetchQuizzes = async () => {
            const data = await getQuizzes();
            if (data)
                setQuizzes(data);
        };
        fetchQuizzes();
    }, [])
    // deleting quizzes
    const deleteQuiz = async (id: string) => {
        const isDeleted = await deleteQuizzes(id);
        if (isDeleted)
            setQuizzes(quizzes!.filter(q => q.id !== id));
    };
    return (
        <div className="flex items-center flex-col gap-4">
            <h1 className="section-title">All Quizzes</h1>
            {quizzes && quizzes.length > 0 ?
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-7 w-full">
                    {quizzes.map((quiz) => (
                        <div key={quiz.id} className="p-6 _border rounded-2xl flex gap-2 justify-between">
                            <div className="">
                                <h3 className="text-lg leading-7 font-semibold">{quiz.title}</h3>
                                <div className="">Number of questions : {quiz.questions.length}</div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <Link href={`quiz/${quiz.id}`} className="link">Check details</Link>
                                <button
                                    onClick={() => deleteQuiz(quiz.id)}
                                    className="button-transparent transition ml-2"
                                >
                                    <Trash2 size={20} />
                                </button>

                            </div>

                        </div>
                    ))}
                </div>
                :
                <h2 className="section-title text-center pt-10">There is no quizzes yet!</h2>
            }

        </div>
    )
}

export default Page