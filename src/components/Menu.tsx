import React from 'react'
import { FaGithub } from 'react-icons/fa';
function Menu(props: { start: () => void }) {
  return (
    <div className='menu'>
      <h1>Computer Questions</h1>
      <div className='flex justify-center py-2'>
        <a href='https://github.com/mrcosgun9' target="_blank">
          <FaGithub className='text-3xl transition duration-150 ease-in-out text-blue-500 hover:text-blue-700' />
        </a>

      </div>
      <button className='btn btn-sucess mt-2' onClick={() => props.start()}>Start Quizz</button>
    </div>
  )
}

export default Menu