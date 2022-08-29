import React from 'react'

function Menu(props: { start: () => void }) {
  return (
    <div className='menu'>
      <h1>Computer Questions</h1>
      <h3>Description</h3>
      <button className='btn btn-sucess' onClick={() => props.start()}>Start Quizz</button>
    </div>
  )
}

export default Menu