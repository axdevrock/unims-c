/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// @ refactor code for content management system

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";


const OuterContainer = ({children,title, back=false}) => {
  let navigate  = useNavigate();

  function handleGoBack(){
    navigate(-1)
  }

  return (
    <div className="p-6 ">
        <div className="flex  items-center gap-6">
        {back ? <p className="cursor-pointer" onClick={handleGoBack}><IoIosArrowBack size={32} /></p> :""}
        <h1 className="text-2xl font-medium">{title}</h1>
        </div>
        <div className="my-4">
          {children}
        </div>
    </div>
  )
}

export const OuterContainerNarrow = ({children,title, back=false}) => {
  let navigate  = useNavigate();

  function handleGoBack(){
    navigate(-1)
  }

  return (
    <div className="p-2">
        <div className="flex  items-center gap-6">
        {back ? <p className="cursor-pointer" onClick={handleGoBack}><IoIosArrowBack size={32} /></p> :""}
        <h1 className="text-2xl font-medium">{title}</h1>
        </div>
        <div className="my-1">
          {children}
        </div>
    </div>
  )
}

export function InputField({input}) {

  return <div className="flex flex-col gap-2 my-2 w-full">
      <label className="text-base capitalize font-light">{input.title}</label>
      <input
          type={input.type}
          placeholder={input.placeholder}
          onChange={(e)=>input.setValue(input.title, e.target.value)}
          className="bg-slate-900 text-base outline-none px-1 py-2 bg-transparent rounded-sm border-[1px] border-gray-700"/>
  </div>
}


export function ModelQuiz({open,setOpen,type,handleQuestionArray}){

  function addQuestion(data){
    handleQuestionArray(data);
    setOpen(false); 
  }
  return(
   <>
     {open && <div className="w-screen p-14 min-h-[120vh] absolute top-0 left-0 bg-slate-300">
      
      <div className="flex justify-between">
        <h1 className="text-2xl font-light">Add Question </h1>
        <h2 onClick={()=>setOpen(false)} className="text-3xl font-black">X</h2>
      </div>
      <p className="font-medium underline">Question Type : {type}</p>
     
      {(type == 'True/false') && <TrueFalse handleAddQuestion={addQuestion} />}
      {(type == 'Text') &&   <TextQuestion handleAddQuestion={addQuestion} />}
      {(type == 'Single choice') &&  <SingleChoice handleAddQuestion={addQuestion} />}
      {(type == 'Multiple choice') && <MultipleChoice handleAddQuestion={addQuestion} />}
      {(type == 'Match') && <p>Match the following</p>}
    </div>}
   </>
  )
}


function TrueFalse({handleAddQuestion}){
  const [question, setQuestion] = useState({
    type:'True/False',
    question:"",
    correctAnswer:null,
});

  function addQuestion(e){
    e.preventDefault();
    if(question.question && question.correctAnswer){  
      handleAddQuestion(question);  
    }
    
    
    return;
  }

  return(
    <div>
       <InputField
                    input={{
                    title: "question",
                    value: question.question,
                    placeholder: "Enter the question",
                    type: "text",
                    setValue: (name, value) => {
                      setQuestion({
              ...question, question:value
            })
                    }
                }}/>
        <div>
        <p>Correct Answer</p>
          <div>
          True : <input onChange={(e)=>{
            setQuestion({
              ...question, correctAnswer:e.target.value
            })
          }} name="answer" value={true} type="radio" /> 
          </div>
          <div>
          False : <input onChange={(e)=>{
            setQuestion({
              ...question, correctAnswer:e.target.value
            })
          }} name="answer" value={false} type="radio" /> 
          </div>
        </div>
        <div className="flex justify-end">
        <button onClick={(e)=>{
          addQuestion(e)
        }} className="bg-main text-white p-2 my-2 rounded-sm"> Add Question</button>

        </div>
        </div>
  )
}

function TextQuestion({handleAddQuestion}){
  const [question, setQuestion] = useState({
    type:'Text',
    question:"", 
});

  function addQuestion(e){
    e.preventDefault();
    if(question.question){  
      handleAddQuestion(question);  
    }
    
    
    return;
  }

  return(
    <div>
       <InputField
                    input={{
                    title: "question",
                    value: question.question,
                    placeholder: "Enter the text question",
                    type: "text",
                    setValue: (name, value) => {
                      setQuestion({
              ...question, question:value
            })
                    }
                }}/>
        
        <div className="flex justify-end">
        <button onClick={(e)=>{
          addQuestion(e)
        }} className="bg-main text-white p-2 my-2 rounded-sm"> Add Question</button>

        </div>
        </div>
  )
}

function SingleChoice({ handleAddQuestion }) {
  const [question, setQuestion] = useState({
    type: 'Single Choice',
    question: '',
    correctAnswer: null,
    options: ['', '', '', ''],  
  });

  function addQuestion(e) {
    e.preventDefault(); 
    if (question.question && question.correctAnswer !== null) {
      handleAddQuestion(question); 
      setQuestion({
        type: 'Single Choice',
        question: '',
        correctAnswer: null,
        options: ['', '', '', ''],
      });
    }  
  }
 
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...question.options];
    updatedOptions[index] = value;  
    setQuestion({ ...question, options: updatedOptions });
  };

  return (
    <div>
      <InputField
        input={{
          title: 'Question',
          value: question.question,
          placeholder: 'Enter the question',
          type: 'text',
          setValue: (name, value) => setQuestion({ ...question, question: value }),
        }}
      />

      <div>
        {/* Options Inputs */}
        {question.options.map((option, index) => (
          <InputField
            key={index}
            input={{
              title: `Answer ${index + 1}`,
              value: option,
              placeholder: `Answer ${index + 1}`,
              type: 'text',
              setValue: (name, value) => handleOptionChange(index, value),
            }}
          />
        ))}
      </div>

      <div>
        <p>Select the Correct Answer</p>
        {question.options.map((option, index) => (
          <div key={index}>
            {String.fromCharCode(97 + index)}:{' '}
            <input
              onChange={() => setQuestion({ ...question, correctAnswer: index })}
              name="answer"
              type="radio"
              checked={question.correctAnswer === index}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button onClick={addQuestion} className="bg-main text-white p-2 my-2 rounded-sm">
          Add Question
        </button>
      </div>
    </div>
  );
}

function MultipleChoice({ handleAddQuestion }) {
  const [question, setQuestion] = useState({
    type: 'Multiple Choice',
    question: '',
    correctAnswers: [],  
    options: ['', '', '', ''],  
  });
 
  function addQuestion(e) {
    e.preventDefault();
    if (question.question && question.correctAnswers.length > 0) {
      handleAddQuestion(question);
      setQuestion({
        type: 'Multiple Choice',
        question: '',
        correctAnswers: [],
        options: ['', '', '', ''],
      });
    }  
  }
 
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...question.options];
    updatedOptions[index] = value;
    setQuestion({ ...question, options: updatedOptions });
  };
 
  const handleCorrectAnswerChange = (index) => {
    const updatedCorrectAnswers = question.correctAnswers.includes(index)
      ? question.correctAnswers.filter((answer) => answer !== index) 
      : [...question.correctAnswers, index];  
    setQuestion({ ...question, correctAnswers: updatedCorrectAnswers });
  };

  return (
    <div> 
      <InputField
        input={{
          title: 'Question',
          value: question.question,
          placeholder: 'Enter the question',
          type: 'text',
          setValue: (name, value) => setQuestion({ ...question, question: value }),
        }}
      />

      <div>
        {/* Options Inputs */}
        {question.options.map((option, index) => (
          <InputField
            key={index}
            input={{
              title: `Answer ${index + 1}`,
              value: option,
              placeholder: `Answer ${index + 1}`,
              type: 'text',
              setValue: (name, value) => handleOptionChange(index, value),
            }}
          />
        ))}
      </div>

      <div>
        <p>Select the Correct Answers</p>
        {question.options.map((option, index) => (
          <div key={index}>
            {String.fromCharCode(97 + index)}:{' '}
            <input
              type="checkbox"
              checked={question.correctAnswers.includes(index)}
              onChange={() => handleCorrectAnswerChange(index)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button onClick={addQuestion} className="bg-main text-white p-2 my-2 rounded-sm">
          Add Question
        </button>
      </div>
    </div>
  );
}
export default OuterContainer