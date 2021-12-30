import React from 'react';
import AnswersList from './AnswersList/AnswersList';
import classes from './ActiveQuiz.module.css'

const ActiveQuiz = props => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <strong>{props.answerNumber}.</strong>&nbsp;
          {props.question}&nbsp;
        </span>

        <small>{props.answerNumber} из {props.quizLength}</small>
      </p>

      <AnswersList
        state={props.state}
        onAnswerClick={props.onAnswerClick}
        answers={props.answers}
      ></AnswersList>
    </div>
  )
}

export default ActiveQuiz