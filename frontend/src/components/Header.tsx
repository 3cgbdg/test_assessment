import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='_border'>
      <div className="_container flex items-center justify-center gap-20 p-4 min-h-16">
        <Link className='button-transparent' href={'/create'}>Create a quiz</Link>
        <Link className='button-transparent' href={'/quizzes'}>Quizzes</Link>
      </div>
    </div>
  )
}

export default Header