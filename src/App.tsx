import React, { useState, useEffect } from 'react'
import Menu from "./components/Menu";
import Question from "./components/Question";
import { nanoid } from "nanoid";
import IQuestion from './types/questionType';

function App() {
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [checked, setChecked] = useState(false);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const shuffleArray = (arr: IQuestion[]) => arr.sort(() => Math.random() - 0.5)
  useEffect(() => {
    async function getQuestion() {
      const res = await fetch("https://opentdb.com/api.php?amount=5&category=18&encode=base64");
      const data = await res.json();
      console.log(data);

      let q: IQuestion[] = [];
      data.results.forEach((question: { question: any; incorrect_answers: any; correct_answer: any; }) => {
        q.push(
          {
            id: nanoid(),
            question: question.question,
            correct: question.correct_answer,
            selected: null,
            checked: false,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
          })
        setQuestions(q);
      });
    }
    getQuestion();
  }, [count])
  function handleCheck() {
    let selected = true;
    questions.forEach(question => {
      if (question.selected == null) {
        selected = false;
        return
      }
    })
    if (!selected) {
      return
    }
    setQuestions(questions => questions.map(question => {
      return { ...question, checked: true }
    }))
    setChecked(true);
    let correct = 0;
    questions.forEach(question => {
      if (question.correct == question.selected) {
        correct += 1;
      }
    })
    setCorrect(correct);
  }
  function handleClickAnswer(id: string, answer: any) {
    setQuestions(questions => questions.map(question => {
      return question.id === id ? { ...question, selected: answer } : question;
    }))
  }
  function handlePlayAgain() {
    setCount(count => count + 1);
    setChecked(false);
  }
  const questionElement = questions ? questions.map(question => {
    return (<Question key={question.id} q={question} id={question.id} handleClickAnswer={handleClickAnswer} />)
  }) : [];
  function start() {
    setStarted(x => !x);
  }
  return (
    <div className='container mx-auto'>
      <div className='w-full min-h-screen px-3  text-center flex flex-col align-middle items-center justify-center'>
        <div className=' divide-y-2'>
          {started ? questionElement : <Menu start={start} />}
        </div>

        <div className='mt-4'>
          <div className='mb-2'>
            {checked && <span className=''>You scored {correct}/5 correct answers.</span>}
          </div>
          {started ? <button className='btn-primary' onClick={checked ? handlePlayAgain : handleCheck}>{checked ? "Play Again" : "Check Answer"}</button> : <></>}
        </div>
      </div>
    </div>

  )
}

export default App
