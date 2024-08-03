import { get, getDatabase, ref, remove, set, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import app from "./Firebase Configuration/FirebaseConfig";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
// import Cookie from "js-cookie";
// import { useNavigate } from "react-router-dom";
const Admin = () => {
  let db = getDatabase(app);

  let [questionList, setQuestionList] = useState([]);
  let [modal, setModal] = useState("scale-0");
  let [updateQuestion, setUpdateQuestion] = useState([]);
  //   console.log("data..", questionList.length);
  let handleQuestions = async () => {
    let questions = [];
    await get(ref(db, "question/")).then((response) => {
      let questionList = response.val();

      for (let v in questionList) {
        let question = {
          id: v,
          question: questionList[v].question,
          o1: questionList[v].option1,
          o2: questionList[v].option2,
          o3: questionList[v].option3,
          o4: questionList[v].option4,
          co: questionList[v].correct_Option,
        };
        questions.push(question);
      }
    });
    // console.log(questions);
    setQuestionList(questions);
  };
  // Add a question
  let AddQuestions = (e) => {
    e.preventDefault();
    let question = {
      question: e.target.question.value,
      option1: e.target.o1.value,
      option2: e.target.o2.value,
      option3: e.target.o3.value,
      option4: e.target.o4.value,
      correct_Option: e.target.co.value,
    };
    // console.log(question);
    set(
      ref(db, "question/" + Math.floor(Math.random() * 9999 * 10000)),
      question
    );
    handleQuestions();
    let form = document.querySelector("#form");
    form.reset();
  };
  // Delete
  function deleteQuestion(id) {
    if (window.confirm("Are you sure you want to delete it?")) {
      remove(ref(db, "question/" + id));
      handleQuestions();
    }
  }
  //  Multiple deletion
  function handleMultiDeleteOp(ids, e) {
    let deleteAll = [];
    let checks = document.querySelectorAll("input[type=checkbox]:checked");

    for (let i = 0; i < checks.length; i++) {
      deleteAll.push(checks[i].id);
      checks[i].checked = false;
    }
    // console.log("data", deleteAll);
    if (window.confirm("Are you sure you want to delete all?")) {
      deleteAll.map((v, i) => {
        remove(ref(db, "question/" + v));

        handleQuestions();
      });
    }
  }
  // fetch data and populate form for Update in modal
  function handleUpdate(id) {
    setModal("scale-1");
    let question = questionList.find((v, i) => v.id === id);
    setUpdateQuestion(question);
    // console.log(question);
  }
  // Update Question
  function updateQuestionData(id, e) {
    e.preventDefault();

    let UpdatedQuestion = {
      id: id,
      question: e.target.question.value,
      option1: e.target.o1.value,
      option2: e.target.o2.value,
      option3: e.target.o3.value,
      option4: e.target.o4.value,
      correct_Option: e.target.co.value,
    };
    update(ref(db, "question/" + id), UpdatedQuestion);
    handleQuestions();
    setModal("scale-0");
  }
  useEffect(() => {
    handleQuestions();
  }, []);
  return (
    <div className="w-full grid grid-cols-[1fr_3fr]">
      <div className="w-full border bg-white">
        <h1 className="text-center my-[30px] text-[25px] font-semibold">
          Add Questions
        </h1>
        <form onSubmit={AddQuestions} id="form">
          <div className="w-[90%] mx-auto my-[10px] gap-[10px] grid grid-cols-[100px_auto] ">
            <label htmlFor="question" className="font-semibold m-2">
              Question
            </label>
            <input
              type="text"
              name="question"
              id="question"
              placeholder="Question..."
              className="w-full p-3 focus:outline-none bg-slate-100"
            />
          </div>
          <div className="w-[90%] mx-auto my-[10px] gap-[10px] grid grid-cols-[100px_auto]">
            <label htmlFor="o4" className="font-semibold m-2">
              Option 1
            </label>
            <input
              type="text"
              name="o1"
              id="o1"
              placeholder="Option 1..."
              className="w-full p-3 focus:outline-none bg-slate-100"
            />
          </div>
          <div className="w-[90%] mx-auto my-[10px] gap-[10px] grid grid-cols-[100px_auto]">
            <label htmlFor="o2" className="m-2 font-semibold">
              Option 2
            </label>
            <input
              type="text"
              name="o2"
              id="o2"
              placeholder="Option 2..."
              className="w-full p-3 focus:outline-none bg-slate-100"
            />
          </div>
          <div className="w-[90%] mx-auto my-[10px] gap-[10px] grid grid-cols-[100px_auto]">
            <label htmlFor="o3" className="m-2 font-semibold">
              Option 3
            </label>
            <input
              type="text"
              name="o3"
              id="o3"
              placeholder="Option 3..."
              className="w-full p-3 focus:outline-none bg-slate-100"
            />
          </div>
          <div className="w-[90%] mx-auto my-[10px] gap-[10px] grid grid-cols-[100px_auto]">
            <label htmlFor="o4" className="m-2 font-semibold">
              Option 4
            </label>
            <input
              type="text"
              name="o4"
              id="o4"
              placeholder="Option 4..."
              className="w-full p-3 focus:outline-none bg-slate-100"
            />
          </div>
          <div className="w-[90%] mx-auto my-[10px] grid gap-[10px] grid-cols-[100px_auto]">
            <label htmlFor="o1" className="m-2 font-semibold">
              Answer
            </label>
            <input
              type="text"
              name="co"
              id="co"
              placeholder="Answer..."
              className="w-full p-3 focus:outline-none bg-slate-100"
            />
          </div>
          <div className="w-full flex items-center justify-center">
            <button className="w-[200px] my-[30px] h-[40px] rounded-md font-semibold bg-gradient-to-r from-slate-800 to-slate-300 border-none text-white uppercase">
              Add
            </button>
          </div>
        </form>
      </div>
      <div className="w-full">
        <table className="border w-[90%] mx-auto my-[30px]">
          <thead>
            <tr className="bg-slate-300">
              <td className="p-[10px] ">
                <button
                  className="bg-red-400 text-white rounded-md p-1 w-[80px] hover:bg-red-500"
                  onClick={() => handleMultiDeleteOp()}
                >
                  Delete
                </button>
              </td>
              <td className="p-[10px]">Sno.</td>
              <td className="p-[10px]">Id</td>
              <td className="p-[10px]" colSpan={2}>
                Questions
              </td>
              <td className="p-[10px]">option1</td>
              <td className="p-[10px]">option2</td>
              <td className="p-[10px]">option3</td>
              <td className="p-[10px]">option4</td>
              <td className="p-[10px]">Answer</td>
              <td className="p-[10px]" colSpan={2}>
                Action
              </td>
            </tr>
          </thead>
          <tbody>
            {questionList.length > 0 ? (
              questionList.map((v, i) => {
                return (
                  <tr key={i} className="font-semibold">
                    <td className="border p-7">
                      <input type="checkbox" name="checked" id={v.id} />
                    </td>
                    <td className="text-[13px] border p-1">{i + 1}</td>
                    <td className="text-[13px] border p-1">{v.id}</td>
                    <td className="text-[13px] p-1 border" colSpan={2}>
                      {v.question}
                    </td>
                    <td className="text-[13px] border p-1">{v.o1}</td>
                    <td className="text-[13px] border p-1">{v.o2}</td>
                    <td className="text-[13px] border p-1">{v.o3}</td>
                    <td className="text-[13px] border p-1">{v.o4}</td>
                    <td className="text-[13px] border p-1 ">{v.co}</td>
                    <td className="border box-border text-center" colSpan={2}>
                      <CiEdit
                        className="inline-block m-1 bg-yellow-300 cursor-pointer"
                        title="update"
                        onClick={() => handleUpdate(v.id)}
                      />
                      <AiOutlineDelete
                        className="inline-block m-1 bg-red-400 cursor-pointer"
                        title="delete"
                        onClick={() => deleteQuestion(v.id)}
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="h-[100px] bg-white">
                <td colSpan={13} className="p-[10px] text-center">
                  <span className="text-[25px] font-semibold">
                    No questions added yet
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div
        className={`fixed w-[600px] h-[500px] bg-slate-800 top-[50%] left-[50%]  translate-x-[-50%] p-[10px] translate-y-[-50%] ${modal}`}
      >
        <button
          onClick={() => setModal("scale-0")}
          className="text-[30px] bg-white font-bold border fixed right-[10px] top-[10px] pointer-cursor hover:bg-red-500 hover:text-white w-[40px]"
        >
          X
        </button>
        <h1 className="text-center text-white text-[20px] my-[20px]">
          Update Question
        </h1>
        <form onSubmit={(e) => updateQuestionData(updateQuestion.id, e)}>
          <div className="w-full grid grid-cols-[100px_auto] my-[10px]">
            <label htmlFor="question" className=" text-white p-2">
              Question
            </label>
            <input
              type="text"
              name="question"
              id="question"
              className="p-2 focus:outline-none rounded-md"
              defaultValue={updateQuestion.question}
              placeholder="Question..."
            />
          </div>
          <div className="w-full grid grid-cols-[100px_auto] my-[10px]">
            <label htmlFor="o1" className=" text-white p-2">
              Option1
            </label>
            <input
              type="text"
              name="o1"
              defaultValue={updateQuestion.o1}
              id="o1"
              className="p-2 focus:outline-none rounded-md"
              placeholder="Option 1..."
            />
          </div>
          <div className="w-full grid grid-cols-[100px_auto] my-[10px]">
            <label htmlFor="o2" className=" text-white p-2">
              Option2
            </label>
            <input
              type="text"
              name="o2"
              id="o2"
              defaultValue={updateQuestion.o2}
              className="p-2 focus:outline-none rounded-md"
              placeholder="Option 2..."
            />
          </div>
          <div className="w-full grid grid-cols-[100px_auto] my-[10px]">
            <label htmlFor="o3" className=" text-white p-2">
              Option3
            </label>
            <input
              type="text"
              name="o3"
              defaultValue={updateQuestion.o3}
              id="o3"
              className="p-2 focus:outline-none rounded-md"
              placeholder="Option 3..."
            />
          </div>
          <div className="w-full grid grid-cols-[100px_auto] my-[10px]">
            <label htmlFor="o4" className=" text-white p-2">
              Option4
            </label>
            <input
              type="text"
              name="o4"
              defaultValue={updateQuestion.o4}
              id="o4"
              className="p-2 focus:outline-none rounded-md"
              placeholder="Option 4..."
            />
          </div>
          <div className="w-full grid grid-cols-[100px_auto] my-[10px]">
            <label htmlFor="co" className=" text-white p-2">
              Answer
            </label>
            <input
              type="text"
              name="co"
              defaultValue={updateQuestion.co}
              id="co"
              className="p-2 focus:outline-none rounded-md"
              placeholder="Answer..."
            />
          </div>
          <div className="w-full my-[30px] flex items-center justify-center ">
            <button className="bg-gradient-to-r from-slate-500 to-slate-200 text-[18px] rounded-md w-[50%] h-[40px] font-bold ">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;
