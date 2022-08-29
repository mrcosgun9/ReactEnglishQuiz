import React from 'react'
import { nanoid } from "nanoid";
import IQuestion from '../types/questionType';
function Question(props: { q: IQuestion, id: string, handleClickAnswer: (id: string, answer: any) => void }) {
  let answers = props.q.answers;

  function handleClick(answer: any) {
    if (props.q.checked) {
      return;
    }
    props.handleClickAnswer(props.id, answer);
  }
  const answersElements = answers.map(answer => {
    let id: string = "";
    if (props.q.checked) {
      if (props.q.correct == answer) {
        id = "correct"
      }
      else if (props.q.selected === answer) {
        id = "incorect"
      }
      else {
        id = "not-selected"
      }
    }
    return (
      <button key={nanoid()} id={id} className={answer === props.q.selected ? "answer selected" : "answer"} onClick={() => handleClick(answer)}>
        {atob(answer)}
      </button>
    )
  })

  return (
    <div className='question-container'>
      <h3>{atob(props.q.question)}</h3>
      <div className='question-items'>
        {answersElements}
      </div>
      <div className='line'></div>
    </div>
  )
}

export default Question