// import logo from "./logo.svg";
// import "./App.css";
import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import app from "./Firebase Configuration/FirebaseConfig";

function App() {
  let [start, setStart] = useState(false);
  let [questions, setQuestions] = useState([]);
  let db = getDatabase(app);
  // console.log("data", questions.length);

  useEffect(() => {
    let QuestionCollection = async () => {
      await get(ref(db, "question/"))
        .then((response) => {
          let questions = response.val();
          let questionList = [];

          for (const question in questions) {
            let questionObj = {
              id: question,
              question: questions[question].question,
              o1: questions[question].option1,
              o2: questions[question].option2,
              o3: questions[question].option3,
              o4: questions[question].option4,
              co: questions[question].correct_Option,
            };
            questionList.push(questionObj);
          }
          setQuestions(questionList);
        })
        .catch((error) => console.log(error));
    };
    QuestionCollection();
  }, [db]);

  return (
    <div className="w-[80%] h-[450px] mx-auto my-[50px] rounded-[10px] grid grid-cols-[2fr_2fr]">
      <div className="object-contain border-r border-neutral-400">
        <img src="/Quiz.svg" alt="Logo" className="w-[90%] h-[90%] mx-auto" />
      </div>
      <div className="flex items-center justify-center">
        {start === false ? (
          <button
            className="bg-gradient-to-r from-slate-800 to-slate-300 w-[60%] h-[50px] rounded-md border-none text-white font-bold text-[20px]"
            onClick={() => setStart(true)}
          >
            Let's Play
          </button>
        ) : (
          <div className="w-full h-full p-[30px_0]">
            <Questions questionList={questions} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

function Questions({ questionList }) {
  let [count, setCount] = useState(0);
  let [progress, setProgress] = useState(5);
  let [userAnswer, setUserAnswer] = useState([]);
  let [correctAnswerList, setCorrectAnswerList] = useState([]);
  let [results, setResults] = useState(0);
  let [close, setClose] = useState("scale-1");
  // console.log("data", userAnswer);

  // console.log("CO: ", correctAnswers);

  function handleDecrement() {
    if (count <= 0) {
      setCount(0);
    } else {
      setCount(count - 1);
    }
  }
  function handleIncrement() {
    if (count >= 20) {
      console.log("Great You attempted all questions. SCORES: ", results);
      console.log(results);
    } else {
      setCount(count + 1);
      let progressPercent = document.querySelector("#progressBar");
      setProgress((count + 2) * 5);
      progressPercent.style.width = progress + "%";
    }
    // console.log(progress, `Progress ${count}`);
  }

  function userAnswers() {
    let answers = [];
    let userInputs = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    for (let i = 0; i < userInputs.length; i++) {
      let userInput = {
        question: count,
        answer: userInputs[i].id,
      };

      answers.push(userInput);
      userInputs[i].checked = false;
    }
    setUserAnswer([...userAnswer, ...answers]);
  }

  useEffect(() => {
    let correctAnswers = [];
    for (let i = 0; i < questionList.length; i++) {
      correctAnswers.push(questionList[i].co.split("option")[1]);
    }
    setCorrectAnswerList(correctAnswers);

    if (
      userAnswer.length > 0 &&
      count > 0 &&
      count <= 21 &&
      userAnswer.length <= 21
    ) {
      // console.log("Hello");
      function points() {
        console.log(count, userAnswer.length);
        for (let i = count - 1; i < userAnswer.length; i++) {
          if (Number(userAnswer[i].answer) === Number(correctAnswerList[i])) {
            setResults(results + 1);
            console.log(`correct ${i}`, userAnswer.length, results);
          } else {
            console.log("incorrect");
          }
        }
      }
      points();
    }
  }, [userAnswer, questionList]);
  // console.log(userAnswer);
  // console.log(correctAnswerList);

  return (
    <div>
      <div
        className="w-[80%] h-[50px] mx-auto mb-[20px] flex items-center"
        id="progress"
      >
        <div className="w-full h-[20px] border border-green-600 box-border">
          <div
            className="w-[0%] h-full bg-green-600 box-border"
            id="progressBar"
          ></div>
        </div>
      </div>

      <div className="my-[10px]  w-[90%] mx-auto p-[10px]">
        <span className="mr-2">{count + 1}</span> {questionList[count].question}
      </div>
      <div className="my-[10px]  w-[90%] mx-auto p-[10px]">
        <input
          type="checkbox"
          className="accent-slate-600 cursor-pointer"
          id="1"
        />{" "}
        {questionList[count].o1}
      </div>
      <div className="my-[10px]  w-[90%] mx-auto p-[10px]">
        <input
          type="checkbox"
          className="accent-slate-600 cursor-pointer"
          id="2"
        />{" "}
        {questionList[count].o2}
      </div>
      <div className="my-[10px]  w-[90%] mx-auto p-[10px]">
        <input
          type="checkbox"
          className="accent-slate-600 cursor-pointer"
          id="3"
        />{" "}
        {questionList[count].o3}
      </div>
      <div className="my-[10px]  w-[90%] mx-auto p-[10px]">
        <input
          type="checkbox"
          className="accent-slate-600 cursor-pointer"
          id="4"
        />{" "}
        {questionList[count].o4}
      </div>
      <div className="my-[10px]  w-[90%] mx-auto p-[10px] flex items-center justify-between">
        <button
          className="bg-green-600 w-[100px] font-semibold h-[40px] rounded-md text-white "
          onClick={() => {
            handleDecrement();
            userAnswers();
          }}
        >
          Previous
        </button>
        <button
          className="bg-green-600 w-[100px] font-semibold h-[40px] rounded-md text-white "
          onClick={() => {
            handleIncrement();
            userAnswers();
          }}
        >
          Next
        </button>
      </div>
      {userAnswer.length >= 21 ? (
        <div
          className={`w-[80%] grid grid-cols-[3fr_1fr] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gradient-to-r from-blue-600 to-slate-200 shadow-lg rounded-md ${close}`}
        >
          <button
            className="fixed top-[20px] right-[20px] border text-[40px] font-[900] hover:bg-red-600 cursor-pointer hover:text-white w-[50px] text-center"
            onClick={() => setClose("scale-0")}
          >
            X
          </button>
          <div className="w-full flex items-center justify-center p-[40px]">
            <span className="font-bold text-[40px] text-slate-100">
              Congratulations you scored {results} out of {questionList.length}.
              You answered {questionList.length - results} questions incorrect.
            </span>
          </div>
          <div className="w-full object-contain flex items-center justify-center ">
            <img src="/Results.svg" alt="result" className="w-full h-[80%]" />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
