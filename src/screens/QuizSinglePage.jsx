/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import OuterContainer, { OuterContainerNarrow } from "../Refactor/refactorComponents"
import axios from "axios";
import { toast } from "react-toastify";
import { json, useParams } from "react-router-dom";


const QuizSinglePage = () => {

    const [testDetails, setTestDetails] = useState([]);
    const { id } = useParams();


    useEffect(() => {
        const fetchQuizzes = async () => {
          try {
            const { data } = await axios.get(`/quiz/single-quiz/${id}`);
    
            if (data.success) {
              setTestDetails(data.data);
            } else {
              toast.error("Failed to fetch test");
            }
          } catch (error) {
            console.error("Error fetching quizzes:", error);
            toast.error("An error occurred while fetching the test");
          }
        };
    
        fetchQuizzes();
      }, [id]);
  return (
    <OuterContainer back title={'Test Details'}>
        {/* Test details */}
        <div className="">
            <p className="font-semibold text-xl">Title : {testDetails?.title}</p>
            <p className="font-medium my-2">Description : {testDetails?.description}</p>
            <div className="flex justify-between bg-slate-200 p-4 mt-4">
            <p className="font-normal text-base">Course Name: {testDetails?.courseId?.title}</p>
            <p className="font-normal text-base">Course ID: {testDetails?.courseId?.courseCode}</p>
            <p className="font-normal text-base">Dept. : {testDetails?.courseId?.courseDepartment}</p>
          
            </div>
            <div className="flex justify-between bg-slate-200 p-4  ">
            <p className="font-normal text-base">Total Students : {testDetails?.courseId?.students?.length}</p>
            <p className="font-normal text-base">Total Marks: {testDetails?.totalMarks}</p>
            <p className="font-normal text-base">created At: {testDetails?.createdAt?.slice(0,10)}</p> 
           </div>
           <div className="flex justify-between bg-slate-200 p-4 mb-4">
            <p className="font-medium text-base">Total Students Attempted the test : {testDetails?.studentsAttended?.length}</p> 
           </div>
        </div>
        {/* Student reponses */}
        <OuterContainerNarrow title={'Student respones'}>
            {
                testDetails?.studentsAttended?.length == 0 ? <p>No , student has yet attempted the test.</p>:""
            }
            {
                testDetails?.studentsAttended?.map((item, index)=><StudentResponse key={index} response={item} question={testDetails?.quizQuestions} />)
            }
        </OuterContainerNarrow> 
    </OuterContainer>
  )
}





export default QuizSinglePage

function StudentResponse({response,question}){ 
    const [isResponseOpen, setisResponseOpen] = useState(false)
    return(
        
        <div className="bg-slate-100 flex justify-between hover:bg-slate-300 p-2 my-3 rounded-md">
                <div>
                    <p className="text-md font-medium my-2">Student Name : {response?.studentId?.name}</p>
                    <p className="text-md font-medium my-2">Student Email : {response?.studentId?.email}</p>
                </div>
                <div className="flex  flex-col items-end">
                    <p className="text-md font- my-2">Scored  : {response?.score == 0? "Not marked yet." : response?.score}</p>
                    <p onClick={()=>{
                        setisResponseOpen(!isResponseOpen)
                    }} className="text-md p-2 bg-main w-max cursor-pointer text-white rounded-lg font- my-2">Check </p>
                </div>
                <ModelQuiz open={isResponseOpen} response={response} questions={question} setOpen={setisResponseOpen} />
        </div>




    )
}

export function ModelQuiz({ open, setOpen, response, questions }) {

  const [addScore, setAddScore] = useState(response?.score || 0); 
  const {id} = useParams();
  

  const handleAddMarks = async () => {  

    try {
      // Assuming the server endpoint and required request payload
      const serverResponse = await axios.put(`/quiz/update-test/${id}`, {
        score: addScore,
        studentId:response?.studentId?._id,
        testId:id
      });

      if (serverResponse.data.success) {
        toast.success("Score updated successfully!");
        setOpen(!open)
      } else {
        toast.error("Failed to update score.");
      }
    } catch (error) {
      console.error("Error updating score:", error);
      // toast.error("An error occurred while updating the score.");
    }
  };
  return (
    <>
      {open && (
        <div className="w-screen p-14 min-h-[140vh] absolute top-0 left-0 bg-slate-300">
          <div className="flex justify-between">
            <h1 className="text-2xl font-light">
              {response?.studentId?.name} response
            </h1>
            <h2 onClick={() => setOpen(false)} className="text-3xl font-black cursor-pointer">
              X
            </h2>
          </div>
          <div className="mt-4 space-y-4">
            {questions.map((item, index) => {
              const studentAnswer = response?.response?.[index];  
              return (
                <div key={index} className="bg-white p-4 rounded shadow">
                  <p className="font-semibold mb-2">
                    Q{index + 1}: {item.question}
                  </p>
                  {/* Displaying student response based on question type */}
                  {item.type === "True/False" && (
                    <>
                    <p className="text-base">
                      Student's Answer: {studentAnswer || "No answer provided"}
                    </p>
                    <p className="text-sm text-gray-600">
                        Correct Answer: {response?.response?.[index]} 
                      </p>
                    </>
                  )}

                  {item.type === "Text" && (
                    <>
                    <p className="text-base">
                      Student's Answer: {studentAnswer || "No answer provided"}
                    </p>
                    <p className="text-sm text-gray-600">
                        Correct Answer: {response?.response?.[index]}
                      </p>
                    </>
                    
                  )}

                  {item.type === "Single Choice" && (
                    <div>
                      <p className="text-base">
                        Student's Answer: {studentAnswer || "No answer provided"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Correct Answer: {response?.response?.[index]}
                      </p>
                    </div>
                  )}

                  {item.type === "Multiple Choice" && (
                    <div>
                      <p className="text-base">
                        Student's Answer:{" "} {response?.response?.[index]} 
                      </p>
                      <p className="text-sm text-gray-600">
                        Correct Answers:{" "}
                        {item.correctAnswers.map((ans) => item.options[ans]).join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>   
         {/* <div className="p-4 flex items-center gap-12">
         <label>score</label><input value={addScore} type="Number" onChange={(e)=>{
            setAddScore(e.target.value)
          }} />
          <button className="bg-main p-4 text-white" onClick={handleAddMarks}>Update score</button>
         </div> */}
        </div>
      )} 
    </>
  );
}
