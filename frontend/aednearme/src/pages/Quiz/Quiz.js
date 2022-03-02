import { Button, FormControl, InputLabel, MenuItem, Paper, Select } from '@material-ui/core';
import React, {useState} from 'react'
import axios from 'axios'

const Quiz = () => {
    let data 
    const baseUrl = 'http://localhost:8000/quiz/'
    const [category, setCategory] = useState('CPR')
    const [questions, setQuestions] = useState([])
    const [correctAnswer, setCorrectAnswer] = useState([])
    const [options, setOptions] = useState([])
    const [score, setScore] = useState([0,0,0,0,0,0])
    const [finalScore,setFinalScore] = useState(0)


    const handleCategory = (e) => setCategory(e.target.value)

    const handleScore = (e) => {
      for (let i=0; i<correctAnswer.length; i++)  {
        const newScore = score
        if (options[i].includes(e.target.value)) {
          if (e.target.value == correctAnswer[i]) {
            newScore[i]=1
            setScore(newScore)
          }
          else {
            newScore[i]=0
            setScore(newScore)
          }
        }
      }
    }

    const handleStart = async (data) => {
      const response = await axios.get(baseUrl+category)
      data = response.data.data
      const answers = [data.incorrect_answers_1.split(',')]
      answers[0].push(data.correct_answer_1)
      answers.push(data.incorrect_answers_2.split(','))
      answers[1].push(data.correct_answer_2)
      answers.push(data.incorrect_answers_3.split(','))
      answers[2].push(data.correct_answer_3)
      answers.push(data.incorrect_answers_4.split(','))
      answers[3].push(data.correct_answer_4)
      answers.push(data.incorrect_answers_5.split(','))
      answers[4].push(data.correct_answer_5)
      answers.push(data.incorrect_answers_6.split(','))
      answers[5].push(data.correct_answer_6)      
      console.log(answers)
      setOptions(answers)
      setQuestions([data.question_1, data.question_2, data.question_3, data.question_4, data.question_5, data.question_6])
      setCorrectAnswer([data.correct_answer_1, data.correct_answer_2, data.correct_answer_3, data.correct_answer_4, data.correct_answer_5, data.correct_answer_6])
      
      return data
    }
    const handleSubmit = (e) => {
      e.preventDefault()
      setFinalScore(score.reduce((a,b) => a+b))
    } 
   

  return (
    <div style={{ padding: "40px", paddingBottom: "100px" }}>
    <Paper>
    <FormControl>
      <FormControl>

        <InputLabel>Category</InputLabel>
        <Select 
          onChange={handleCategory}
          value={category}
          label="Category">
          <MenuItem value='CPR'>CPR</MenuItem>
          <MenuItem value='AED'>AED</MenuItem>
          <MenuItem value='Choking'>Choking</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <Button variant="contained" onClick={handleStart} >Start Quiz</Button>

      </FormControl>
    </FormControl>
    </Paper>
   
    
         <div>
         
          <div>
            <form>    

              {
                !questions[0] ? '': questions.map((question, i) => {
                  return (
                  <div>
                    <h3>
                      Question {i+1}: {question}
                    </h3>
                    <input id={`q${i}o1`} type='radio' name={`question_${i}`} value={options[i][0]} onChange={handleScore}/>
                    <label for={`q${i}o1`}>{options[i][0]}</label>
                    <input id={`q${i}o2`} type='radio' name={`question_${i}`} value={options[i][1]} onChange={handleScore}/>
                    <label for={`q${i}o2`}>{options[i][1]}</label>
                    <input id={`q${i}o3`} type='radio' name={`question_${i}`} value={options[i][2]} onChange={handleScore}/>
                    <label for={`q${i}o3`}>{options[i][2]}</label>
                    <input id={`q${i}o4`} type='radio' name={`question_${i}`} value={options[i][3]} onChange={handleScore}/>
                    <label for={`q${i}o4`}>{options[i][3]}</label>
                    <br/>
                    <br/>
                    {i == 5 ? <Button variant='contained' type='submit' onClick={handleSubmit}>Submit</Button> :''}
                  </div>
                   )
                  })
              }
            </form>
          </div>
          <div>
            {finalScore ? <h3>Results: {finalScore}/{questions.length}</h3> : ""}
          </div>
         </div>
    </div>
  )
}


export default Quiz