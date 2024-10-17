import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../../context/userContext';

const Quizzes = () => {
  const { id } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const { user } = useUserContext();
  const studentId = user?._id;

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`/student/quizzes/${id}`);
        if (response.data.success) {
          setQuizzes(response.data.quizzes);
        } else {
          console.error('Failed to fetch quizzes:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, [id, studentId]); // Dependency array to run effect when id or studentId changes

  // Filter quizzes into attempted and not attempted based on student attendance
  const quizzesAttempted = quizzes.filter(quiz =>
    quiz.studentsAttended.some(student => student.studentId === studentId)
  );

  const quizzesNotAttempted = quizzes.filter(
    quiz => !quiz.studentsAttended.some(student => student.studentId === studentId)
  );

  return (
    <div className='p-4 py-10'>
      <h1 className='text-3xl font-semibold'>
        Course Quizzes for Course ID: {id}
      </h1>
      <div className='mt-4'>
        <h2 className='my-8 font-black text-xl'>Quizzes Not Attempted:</h2>
        {quizzesNotAttempted.length > 0 ? (
          <ul >
            {quizzesNotAttempted.map(quiz => (
              <li className='flex justify-between p-4 hover:bg-neutral-500 bg-neutral-300 mb-4 rounded-md'  key={quiz._id}>
                <p>Title: {quiz.title}</p>
                <p>Description: {quiz.description}</p>
                <Link to={`/student/single-quiz/${quiz._id}`}>Attemp</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>All quizzes have been attempted by the student.</p>
        )}
      </div>
      <div className='mt-4'>
        <h2 className='my-8 font-black text-xl'>Quizzes Attempted:</h2>
        {quizzesAttempted.length > 0 ? (
          <ul>
            {quizzesAttempted.map(quiz => (
                <li className='flex justify-between p-4 hover:bg-neutral-500 bg-neutral-300 mb-4 rounded-md'  key={quiz._id}>
                <p>Title: {quiz.title}</p>
                <p>Description: {quiz.description}</p>
                <div>
            {quiz.studentsAttended.map((student) => (
                student.studentId === studentId ? (
                    <div key={student.studentId}>
                        Score: {student.score} / {student.outof}
                    </div>
                ) : null
            ))}
        </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No quizzes attempted by the student.</p>
        )}
      </div>
      
    </div>
  );
};

export default Quizzes;
