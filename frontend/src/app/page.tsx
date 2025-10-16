"use client"
import { useRouter } from "next/navigation"

const Page = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-[150px]">
      <div className="items-center flex-col flex gap-4">
        <h1 className="page-title">Quiz app</h1>
        <p className="text-gray leading-7 text-lg">Want to start your journey!</p>
        <div className="flex items-center gap-2">
          <button onClick={() => router.push('/create')} className="button-transparent">Create your first quiz</button>
          <button onClick={() => router.push('/quizzes')} className="link">Go to available quizzes</button>
        </div>
      </div>
    </div>
  )
}

export default Page