/*
        Features to add / Bugs to address 
          Create a feature to sort the answers so the left hand answer isn't always correct 
            * Currently Sort Answers does not load in the first instance
          Build a Catch to make sure that the items properly load in before the game starts
          Build a counter to count the score 
          Build a message at the end of the game to congratulate the player and give them their score

          Deal with True and False questions loading incorrectly 
          Manage symbols such as speechmarks loading incorrectly 


*/

import {useEffect, useState} from 'react'
import './App.css';
import Question from './Component/Question'

function App() {

  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])

      // ACCESS THE OPEN TDB API and store 10 answers in the questions array
    useEffect(() => {
      // Define the API URL
      const apiUrl = 'https://opentdb.com/api.php?amount=10';
      
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          let i = 0
          let listOfQuestions = []
          while (i < data.results.length) {
            listOfQuestions[i] = data.results[i]
            i++
          }
          setQuestions(listOfQuestions)
          const potentialAnswersTemp = listOfQuestions[currentQuestion].incorrect_answers.map((instance) => instance)
          potentialAnswersTemp.push(listOfQuestions[currentQuestion].correct_answer)
          potentialAnswersTemp.sort()
          setAnswers(potentialAnswersTemp)

        })
      }, []);

      // This function takes the answer and checks it against the value of the answer.
      function chosenAnswer(valueOfButton) {
        console.log(valueOfButton)
          console.log("reached 4")
          console.log(questions[currentQuestion].correct_answer)
            if (valueOfButton === questions[currentQuestion].correct_answer) {
              alert("congratulations you found the correct answer")
              nextQuestion()
            }
            else {
              alert("false answers")
            }
          //}
        }
     // }

      // When the correct answer is chosen move forward to the next question
      function nextQuestion() {
        if (currentQuestion <= questions.length) {
          setCurrentQuestion(currentQuestion + 1)
          sortAnswers(currentQuestion)
        }
        else {
          alert("well done you have finished the test")
          console.log("current Question else" + currentQuestion)
        }
      }

      function sortAnswers(currentQuestion) {
        const listOfQuestions = questions
        const potentialAnswersTemp = listOfQuestions[currentQuestion].incorrect_answers.map((instance) => instance)
        potentialAnswersTemp.push(listOfQuestions[currentQuestion].correct_answer)
        potentialAnswersTemp.sort()
        setAnswers(potentialAnswersTemp)
      }

      // do not start programme until all questions have loaded in
      if (questions.length > 9) {
        console.log("questions " + questions)
        console.log("answers " + answers)
        console.log("currentQuestion " + currentQuestion)

        return (
          <div className="App">
            <h1 id="title"> Welcome to The Trivia Game</h1>
            <Question q={questions[currentQuestion].question}
                      answers={answers}
                      onChange={chosenAnswer}/>
          </div>
        );
      }


 
}

export default App;
