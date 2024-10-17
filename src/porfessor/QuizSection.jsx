/* eslint-disable react/prop-types */
import axios from 'axios';
import   { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const QuizSection = () => {

    const [allQuizes, setAllQuizes] = useState([]);

    const {id}= useParams()

    useEffect(() => {
      const fetchQuizes = async () => {
        try {
          const {data} = await axios.get(`/professor/get-all-quizes/${id}`);

          if (data.success === true) {
            setAllQuizes(data.quizzes);  
          } else {
            console.error('Failed to fetch quizzes');
          }
        } catch (error) {
          console.error('Error fetching quizzes:', error);
        }
      };
  
      fetchQuizes();
    }, []);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-black">Quizzes {id}</h1>
      <QuizTotal quizzes={allQuizes} />
      <AddQuizzes />
    </div>
  );
};

const QuizTotal = ({ quizzes }) => {
  return (
    <>
      {quizzes.length === 0 ? <p>As of now you have not posted any quizzes</p> : <h2 className="text-2xl font-bold">Quiz Details</h2>}
      <div className="mt-4">
            {quizzes.map((quiz,index) => (
              <div className="block p-4 flex justify-between bg-gray-200 rounded-lg mb-2 hover:bg-gray-300"  key={quiz._id}>
              <p>{index+1}</p>
              <p>{quiz.title}</p>
              <Link  to={`/faculty/course/quizpage/${quiz._id}`}   >
                visit
              </Link>
              </div>
            ))}
          </div>
    </>
  );
};

const AddQuizzes = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', '', '', ''], correctOptionIndex: null },
  ]);
  const nav = useNavigate()
  const { id } = useParams();


  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectOptionChange = (qIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctOptionIndex = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctOptionIndex: null }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quizData = {
      title: quizTitle,
      courseId:id,
      description: quizDescription,
      questions: questions.map(q => ({
        questionText: q.questionText,
        options: q.options.map((optionText, index) => ({
          optionText,
          isCorrect: index === q.correctOptionIndex,
        })),
      })),
    };

    try {
      const response = await axios.post('/professor/quiz', quizData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(response);
      if (response.success === true) {
        // Handle successful submission (e.g., show a success message, clear form)
        setQuizTitle('');
        setQuizDescription('');
        setQuestions([{ questionText: '', options: ['', '', '', ''], correctOptionIndex: null }]);
        toast('quiz created succesfully.')
        nav('/dashboard-faculty')
      } else {
        // Handle errors
        console.error('Failed to submit quiz');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-6">Add Quiz</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium mb-2">Quiz Title:</label>
          <input
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">Quiz Description:</label>
          <textarea
            value={quizDescription}
            onChange={(e) => setQuizDescription(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        {questions.map((question, qIndex) => (
          <div key={qIndex} className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
            <label className="block text-lg font-medium mb-2">Question {qIndex + 1}:</label>
            <input
              type="text"
              value={question.questionText}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              required
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            {question.options.map((option, oIndex) => (
              <div key={oIndex} className="flex items-center mb-2">
                <label className="block text-lg font-medium mr-2">Option {oIndex + 1}:</label>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                  required
                  className="flex-1 p-2 border border-gray-300 rounded-lg"
                />
                <label className="ml-4 flex items-center">
                  <input
                    type="radio"
                    name={`correctOption-${qIndex}`}
                    checked={question.correctOptionIndex === oIndex}
                    onChange={() => handleCorrectOptionChange(qIndex, oIndex)}
                    required
                    className="mr-2"
                  />
                  Correct
                </label>
              </div>
            ))}
          </div>
        ))}
        <button
          type="button"
          onClick={addQuestion}
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
        >
          Add Question
        </button>
        <button
          type="submit"
          className="inline-block bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
        >
          Submit Quiz
        </button>
      </form>
    </div>
  );
};

export default QuizSection;
