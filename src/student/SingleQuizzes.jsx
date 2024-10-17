import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import { toast } from 'react-toastify';

const SingleQuizzes = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]); 
  const { user } = useUserContext();
  const studentId = user?._id;
  const nav = useNavigate()

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`/student/quiz/${id}`);

        if (response.data.success) {
          setQuiz(response.data.quiz);
          // Initialize answers state with empty strings for each question
          setAnswers(new Array(response.data.quiz.questions.length).fill(''));
        } else {
          console.error('Failed to fetch quiz:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching quiz:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleAnswerChange = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = quiz.questions[questionIndex].options[optionIndex].optionText;
    setAnswers(newAnswers);
  };

  const handleSubmitQuiz = async () => {
    try {
      // Calculate score based on correct answers
      let score = 0;
      let outof = quiz.questions.length;
      quiz.questions.forEach((question, index) => {
        const selectedOptionText = answers[index];
        const correctOption = question.options.find(option => option.isCorrect);
        if (selectedOptionText === correctOption.optionText) {
          score++;
        }
      });

      console.log(score);

    //   Send score and student ID to server
      const response = await axios.post(`/student/quiz/${id}`, {
        studentId: studentId,  
        score: score,
        outof:outof
      });

      if (response.data.success) {
        console.log('Quiz score submitted successfully:', response.data.message);
        toast('Quiz score submitted successfully:', response.data.message)
        nav(`/student/course/${id}`)
       
      } else {
        console.error('Failed to submit quiz score:', response.data.message);
    
      }
    } catch (error) {
      console.error('Error submitting quiz score:', error);
  
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 py-10">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <h1 className="text-3xl font-semibold mb-4">Quiz Details</h1>
            <p>Title: {quiz.title}</p>
            <p>Description: {quiz.description}</p>
            <p>Course ID: {quiz.courseId}</p> 
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Questions:</h2>
              <ul>
                {quiz.questions.map((question, questionIndex) => (
                  <li key={question._id} className="mb-4">
                    <p className="mb-2">Question: {question.questionText}</p>
                    <ul>
                      {question.options.map((option, optionIndex) => (
                        <li key={option._id} className="flex items-center mb-2">
                          <input
                            required
                            type="radio"
                            id={`q${questionIndex}-opt${optionIndex}`}
                            name={`q${questionIndex}`}
                            value={option.optionText}
                            onChange={() => handleAnswerChange(questionIndex, optionIndex)}
                            checked={answers[questionIndex] === option.optionText}
                          />
                          <label htmlFor={`q${questionIndex}-opt${optionIndex}`} className="ml-2">
                            {option.optionText} 
                          </label>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSubmitQuiz}
              >
                Submit Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleQuizzes;
