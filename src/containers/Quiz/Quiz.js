import React from 'react';
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

class Quiz extends React.Component {
  state = {
    results: {}, // {[id]: 'success' | 'error'}
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // { [id]: 'success' | 'error'}
    quiz: [
      {
        question: 'Какого цвета трава?',
        rightAnswerId: 2,
        id: 1,
        answers: [
          { text: 'Красная', id: 1 },
          { text: 'Зеленая', id: 2 },
          { text: 'Синяя', id: 3 },
          { text: 'Черная', id: 4 },
        ]
      },
      {
        question: 'Сколько будет 2 + 2 * 2',
        rightAnswerId: 4,
        id: 2,
        answers: [
          { text: '8', id: 1 },
          { text: '10', id: 2 },
          { text: '4', id: 3 },
          { text: '6', id: 4 },
        ]
      }
    ]
  }

  onAnswerClickHandler = (answerId) => {
    // Устранение ошибки многократного нажатия на правильный ответ
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)
      if (this.state.answerState[key] === 'success') {
        return
      }
    }

    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results

    // Функция проверки правильности ответа
    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      this.setState({
        answerState: { [answerId]: 'success' },
        results
      })

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({ isFinished: true })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }
        window.clearTimeout(timeout)
      }, 1000)

    } else {
      results[question.id] = 'error'
      this.setState({
        answerState: { [answerId]: 'error' },
        results
      })
    }
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }
  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {},
    })
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {
            this.state.isFinished
              ? <FinishedQuiz
                results={this.state.results}
                quiz={this.state.quiz}
                onRetry={this.retryHandler}
              ></FinishedQuiz>
              : <ActiveQuiz
                question={this.state.quiz[this.state.activeQuestion].question}
                answers={this.state.quiz[this.state.activeQuestion].answers}
                onAnswerClick={this.onAnswerClickHandler}
                quizLength={this.state.quiz.length}
                answerNumber={this.state.activeQuestion + 1}
                state={this.state.answerState}
              ></ActiveQuiz>
          }
        </div>
      </div>
    )
  }
}

export default Quiz