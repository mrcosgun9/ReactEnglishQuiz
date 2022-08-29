import React from 'react'

function Menu(props: { start: () => void }) {
  return (
    <div>
      <h1>English Quizz</h1>
      <span>Description</span>
      <button onClick={() => props.start()}>Start Quizz</button>
    </div>
  )
}

export default Menu