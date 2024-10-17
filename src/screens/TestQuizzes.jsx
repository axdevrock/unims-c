/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react"
import OuterContainer, { InputField, ModelQuiz } from "../Refactor/refactorComponents";
import { toast } from 'react-toastify';
import axios from "axios";
import { useParams } from "react-router-dom"; 
 

const TestQuizzes = () => {

    
    const [quizQuestions, setquizQuestions] = useState([]); 
    const [loading, setLoading] = useState(false); // Loading state for handling submissions

    const [quizDetails, setQuizDetdetails] = useState({
        title:"",
        description:"",
        totalMarks:null
    });
    const {id}= useParams() ;
    function handleQuestionArray(data) {  
        setquizQuestions((prevQuizQuestions) => {
          return [...prevQuizQuestions, data];  
        });    
      } 

      async function handleAddQuiz() {
        if (!quizDetails.title || !quizDetails.totalMarks || !quizDetails.description || !quizQuestions.length) {
          toast.error('All fields are mandatory'); 
          return; 
        }
    
        let postData = {
          ...quizDetails,
          courseId:id,
          quizQuestions,
        }; 
    
        try {
          setLoading(true);  
          const response = await axios.post('/quiz/add', JSON.stringify(postData), {
            headers: { 'Content-Type': 'application/json' }, 
          });
          toast.success('Quiz added successfully');  
          
          setQuizDetdetails({ title: '', description: '', totalMarks: null });
          setquizQuestions([]);
        } catch (error) {
          console.error('Error adding quiz:', error);
          toast.error('Failed to add quiz'); 
        } finally {
          setLoading(false);  
        } 
      }
        
      
    return (
        <OuterContainer back title={'Add a new Quiz ..'}>
            {/* Details */}
            <form>
                <InputField
                    input={{
                    title: "Title",
                    value: quizDetails.title,
                    placeholder: "Enter a title",
                    type: "text",
                    setValue: (name, value) => {
                        setQuizDetdetails({
                            ...quizDetails, title:value
                        })
                    }
                }}/>
                <InputField
                    input={{
                    title: "Description",
                    value: quizDetails.description,
                    placeholder: "Enter a description for quiz..",
                    type: "textarea",
                    setValue: (name, value) => {
                        setQuizDetdetails({
                            ...quizDetails, description:value
                        })
                    }
                }}/> 
                <InputField
                    input={{
                    title: "Total Marks",
                    value: quizDetails.totalMarks,
                    placeholder: "Enter a total marks for test..",
                    type: "number",
                    setValue: (name, value) => {
                        setQuizDetdetails({
                            ...quizDetails, totalMarks:value
                        })
                    }
                }}/> 
                {/* Displaying quiz data */}
                <p className="my-6 italic font-medium">Total number of added Question {quizQuestions.length}</p>
                {
                    quizQuestions.length ? <DisplayQuizQuestions data={quizQuestions}/> :"" 
                }
                {/* <pre>{JSON.stringify(quizQuestions)}</pre> */}
                <AddQuestion  handleQuestionArray={handleQuestionArray} />
            </form>
             
            

<div className="flex justify-end">
<button className="p-4 bg-main text-white rounded-3xl" onClick={handleAddQuiz}>Add quiz</button>

</div>
            

        </OuterContainer>
    )
}

export default TestQuizzes



function AddQuestion({handleQuestionArray}){
    const [questionType, setquestionType] = useState(null);

    const [open, setOpen] = useState(false)
    function handleAddQuestion(e){
        e.preventDefault();
        if(questionType === null){
            toast.error('Please select the question type.')
            return;
        } 
        setOpen(true)
        // If not logic
    } 
    return(
        <div className="flex gap-2  my-8 border-2 border-black p-4 w-max rounded-full ">
               <select value={questionType || ''}  onChange={e => setquestionType(e.target.value)} className="p-2 outline-none rounded-full hover:opacity-85">
               <option value="" disabled>
                Question type
                </option>
                <option value="True/false">True/false</option>
                {/* <option value="Text">Text</option> */}
                <option value="Single choice">Single choice</option>
                <option value="Multiple choice">Multiple choice</option>
                {/* <option value="Match">Match</option> */}
               </select>
               <button onClick={(e)=>handleAddQuestion(e)} className="bg-main text-white p-2 rounded-full hover:opacity-85">Add a question </button>
               <ModelQuiz handleQuestionArray={handleQuestionArray} type={questionType} setOpen={setOpen} open={open}/>
            </div>
    )
}


function DisplayQuizQuestions({ data }) {
  return (
    <div>
      {data.map((item, index) => { 
        if (item.type === 'True/False') {
          return (
            <div className="border-2 relative my-6 border-slate-200 p-2 rounded-xl bg-slate-50 hover:bg-slate-200" key={index}>
              <p>True/False Question:</p>
              <p>Question: {item.question}</p>
              <p>Answer: {item.correctAnswer ? 'True' : 'False'}</p>
              <p className="absolute -top-4 right-0 w-8 h-8 rounded-full text-white bg-gray-300 flex justify-center items-center">{index+1}</p>
            </div>
          );
        }

        if (item.type === 'Text') {
          return (
            <div className="border-2 relative my-6 border-slate-200 p-2 rounded-xl bg-slate-50 hover:bg-slate-300" key={index}>
              <p>Text Question:</p>
              <p>Question: {item.question}</p> 
              <p className="absolute -top-4 right-0 w-8 h-8 rounded-full text-white bg-gray-300 flex justify-center items-center">{index+1}</p>

            </div>
          );
        }

        if (item.type === 'Single Choice') {
          return (
            <div className="border-2 relative my-6 border-slate-200 p-2 rounded-xl bg-slate-50 hover:bg-slate-300" key={index}>
              <p>Single Choice Question:</p>
              <p>Question: {item.question}</p>
              <ul>
                {item.options.map((option, i) => (
                  <li key={i}>{"- > "}{option}</li>
                ))}
              </ul>
              <p>Correct Answer: {item.options[item.correctAnswer]}</p>
              <p className="absolute -top-4 right-0 w-8 h-8 rounded-full text-white bg-gray-300 flex justify-center items-center">{index+1}</p>

            </div>
          );
        }

        if (item.type === 'Multiple Choice') {
          return (
            <div className="border-2 relative my-6 border-slate-200 p-2 rounded-xl bg-slate-50 hover:bg-slate-300" key={index}>
              <p>Multiple Choice Question:</p>
              <p>Question: {item.question}</p>
              <ul>
                {item.options.map((option, i) => (
                  <li key={i}>{'-> ' }   {option}</li>
                ))}
              </ul>
              <p>Correct Answers: {item.correctAnswers.map((ans) => item.options[ans]).join(', ')}</p>
              <p className="absolute -top-4 right-0 w-8 h-8 rounded-full text-white bg-gray-300 flex justify-center items-center">{index+1}</p>

            </div>
          );
        }

        if (item.type === 'Match') {
          return (
            <div key={index}>
              <p>Match Question:</p>
              {/* <p>Question: {item.question}</p> */}
              {/* Assuming item.pairs contains the matching pairs
              {item.pairs.map((pair, i) => (
                <p key={i}>{pair.left} - {pair.right}</p>
              ))} */}
            </div>
          );
        }

        // Default rendering if no type matches
        return <p key={index}>Unknown question type.</p>;
      })}
    </div>
  );
}
 
