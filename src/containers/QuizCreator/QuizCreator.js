import React from 'react';
import { createControl, validate, validateForm } from '../../form/formFramework'
import classes from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'


function createOptionControl(number) {
  return createControl({
    label: `Ответ ${number}`,
    errorMessage: 'Значение не может быть пустым',
    id: number
  }, { required: true })
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Введите вопрос',
      errorMessage: 'Вопрос не может быть пустым',
    }, { required: true }),
    answer1: createOptionControl(1),
    answer2: createOptionControl(2),
    answer3: createOptionControl(3),
    answer4: createOptionControl(4),
  }
}

class QuizCreator extends React.Component {

  state = {
    quiz: [],
    isFormValid: false,
    formControls: createFormControls(),
    rightAnswerId: 1
  }

  submitHandler = (event) => {
    event.preventDefault()
  }

  addQuestionHandler = (event) => {
    event.preventDefault()

    const quiz = this.state.quiz.concat()
    const index = quiz.length + 1

    const { question, answer1, answer2, answer3, answer4 } = this.state.formControls

    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: answer1.value, id: answer1.id },
        { text: answer2.value, id: answer2.id },
        { text: answer3.value, id: answer3.id },
        { text: answer4.value, id: answer4.id },
      ]
    }

    quiz.push(questionItem)

    this.setState({
      quiz,
      isFormValid: false,
      formControls: createFormControls(),
      rightAnswerId: 1
    })
  }

  createQuizHandler = (event) => {
    event.preventDefault()

    console.log(this.state.quiz)
    // TODO: Server
  }

  onChangeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)

    formControls[controlName] = control

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <React.Fragment key={controlName + index}>
          <Input
            type={control.type}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            shouldValidate={!!control.validation}
            errorMessage={control.errorMessage}
            onChange={event => this.onChangeHandler(event.target.value, controlName)}
          />
          {index === 0 ? <hr /> : null}
        </React.Fragment>
      )
    })
  }

  selectChangeHandler = event => {
    this.setState({
      rightAnswerId: +event.target.value
    })
  }

  render() {
    const select = <Select
      label='Выберите правильный ответ'
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}
      options={[
        { text: 1, value: 1 },
        { text: 2, value: 2 },
        { text: 3, value: 3 },
        { text: 4, value: 4 },
      ]}
    />

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>

          <form onSubmit={this.submitHandler}>

            {this.renderInputs()}

            {select}

            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >Добавить вопрос</Button>
            <Button
              type="success"
              onClick={this.createQuizHandler}
              disabled={this.state.quiz.length === 0}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

export default QuizCreator
