/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import OuterContainer, { InputField } from "../../Refactor/refactorComponents";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserContext } from "../../../context/userContext"; 
import MarksModal from "../../utils/MarksModel"; 
const SingleTestPage = () => {
  const { user } = useUserContext();
  const [testDetails, setTestDetails] = useState([]);
  const [isAttempted, setIsAttempted] = useState(false);
  const [studentResponse, setStudentResponse] = useState({});
  const [score, setScore] = useState(0);
  // 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [marks, setmarks] = useState(0)

  const sid = user?._id;
  const navigate = useNavigate();

  const { id } = useParams();

  // Fetch test details on component mount
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

  // Check if the student has attempted the test
  useEffect(() => {
    if (testDetails && sid) {
      const attempted = isAttemptedByStudent({ sid, data: testDetails?.studentsAttended }); 
      
      setIsAttempted(attempted);
      studentScore({ sid, data: testDetails, setScore }); 
    }
    
  }, [sid, testDetails]);

  // Helper function to check if the test has been attempted
  function isAttemptedByStudent({ sid, data }) { 
    
    return data?.some((stu) => stu.studentId?._id === sid);
  }

  function studentScore({ sid, data, setScore }) {  
    const student = data.studentsAttended?.find((stu) =>{ 
      return stu.studentId?._id.toString() === sid.toString();  
       
      
    });
     
    if (student) { 
      setScore(student.score);  
    } else { 
      setScore(0);  
    }
  }
  

  // Handle changes in the student responses
  const handleResponseChange = (index, value, isMultipleChoice = false) => {
    setStudentResponse((prev) => {
      if (isMultipleChoice) {
        // Update the array of selected options for multiple choice
        const currentResponses = prev[index] || [];
        const updatedResponses = currentResponses.includes(value)
          ? currentResponses.filter((opt) => opt !== value) // Remove if already selected
          : [...currentResponses, value]; // Add new selection

        return {
          ...prev,
          [index]: updatedResponses,
        };
      } else {
        return {
          ...prev,
          [index]: value,
        };
      }
    });
  };

  // Handle test submission
  async function handleSubmitTest() {  
 

    try {
        const { data } = await axios.post(`/quiz/submit-test`,{
            studentId:sid,
            testId:id,
            response : studentResponse
        });
        if (data.success) {
            toast.success('Test submitted succesfully');
            setmarks(data?.data)
            setIsModalOpen(true)
            setStudentResponse({}); } 

            else {
            toast.error("Failed to submit test");
          }
        } catch (error) {
          console.error("Error fetching quizzes:", error);
          toast.error("An error occurred while submitting the test");
        }

    return;
  }

  return (
    <OuterContainer back title={"Test screen"}>
      {/* Test details */}
      <div>
        <p className="font-semibold capitalize text-gray-700">
          Title: {testDetails.title}
        </p>
        <p className="my-2 capitalize">Description: {testDetails.description}</p>
        <div className="flex justify-between">
          <p className="font-semibold capitalize text-gray-700">
            Total Marks: {testDetails.totalMarks}
          </p>
          <p className="capitalize text-gray-700">
            Created At: {testDetails?.createdAt?.slice(0, 10)}
          </p>
        </div>
      </div>
      {/* Display whether the test was attempted */}
      <p className="my-4 underline underline-offset-4">
        {isAttempted
          ? "You have attempted this test."
          : "This test has not been attempted yet."}
      </p>

    {isAttempted ?"" : <div className="responses my-4">
        {testDetails?.quizQuestions?.map((item, index) => {
          switch (item.type) {
            case "True/False":
              return (
                <div className="bg-slate-100 my-4 p-3 rounded-md" key={index}>
                  <p>
                    Q {index + 1}: {item?.question}
                  </p>
                  <p className="my-4">Choose the correct answer</p>
                  <div className="flex gap-4">
                    <label>
                      <input
                        name={`question-${index}`}
                        type="radio"
                        value="True"
                        onChange={() => handleResponseChange(index, "True")}
                      />
                      True
                    </label>
                    <label>
                      <input
                        name={`question-${index}`}
                        type="radio"
                        value="False"
                        onChange={() => handleResponseChange(index, "False")}
                      />
                      False
                    </label>
                  </div>
                </div>
              );

            case "Text":
              return (
                <div className="bg-slate-100 my-4 p-3 rounded-md" key={index}>
                  <p>
                    Q {index + 1}: {item?.question}
                  </p>
                  <p className="my-4">Enter the answer below</p>
                  <InputField
                    input={{
                      title: " ",
                      placeholder: "Enter an answer here...",
                      type: "textarea",
                      setValue: (name, value) =>
                        handleResponseChange(index, value),
                    }}
                  />
                </div>
              );

            case "Multiple Choice":
              return (
                <div className="bg-slate-100 my-4 p-3 rounded-md" key={index}>
                  <p>
                    Q {index + 1}: {item?.question}
                  </p>
                  <p className="my-4">Choose the correct answers</p>
                  {item.options.map((option, optIndex) => (
                    <label key={optIndex} className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        value={option}
                        onChange={() =>
                          handleResponseChange(index, option, true)
                        }
                      />
                      {option}
                    </label>
                  ))}
                </div>
              );

            case "Single Choice":
              return (
                <div className="bg-slate-100 my-4 p-3 rounded-md" key={index}>
                  <p>
                    Q {index + 1}: {item?.question}
                  </p>
                  <p className="my-4">Choose the correct option</p>
                  <ul>
                    {item.options.map((option, optIndex) => (
                      <li key={optIndex}>
                        <label className="flex items-center gap-4">
                          <input
                            name={`question-${index}`}
                            type="radio"
                            value={option}
                            onChange={() => handleResponseChange(index, option)}
                          />
                          {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              );

            default:
              return <p key={index}>No identified question type</p>;
          }
        })}
      </div>}
 
      {isAttempted ? "":<div className="flex justify-end">
        <button
          className="py-4 px-8 bg-main text-white rounded-3xl"
          onClick={handleSubmitTest}
        >
          Submit
        </button>
      </div>}

      {
        isAttempted ? (<div>
            
            {
                score == 0 ? "Your score has not been updated" : `You have scored : ${score} / ${testDetails?.totalMarks}.`
            }
        </div>) :""
      } 

      <MarksModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <h2 className="text-lg font-bold">Modal Marks</h2>
        <p>You have scored  : {marks || 0} out of {testDetails?.totalMarks}</p>
      </MarksModal>
    </OuterContainer>
  );
};

export default SingleTestPage;
