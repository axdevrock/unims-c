import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuizPage = () => {
  const [allQuizes, setAllQuizes] = useState([]);
  const [strength, setStrength] = useState([]);
  const [studentsAttended, setStudentsAttended] = useState([]);
  const [studentsNotAttempted, setStudentsNotAttempted] = useState([]);
  const [courseId, setCourseId] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const fetchQuizes = async () => {
      try {
        const { data } = await axios.get(`/student/quiz/${id}`);

        if (data.success === true) {
          setAllQuizes(data.quiz);
          setCourseId(data.quiz.courseId);
          setStudentsAttended(data.quiz.studentsAttended);
        } else {
          console.error('Failed to fetch quizzes');
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizes();
  }, [id]);

  useEffect(() => {
    if (courseId) {
      const fetchCourseStudents = async () => {
        try {
          const { data } = await axios.post('/professor/course-students', { id: courseId });

          if (data.success === true) {
            setStrength(data.students);
            const attendedIds = new Set(studentsAttended.map(student => student.studentId._id));
            const notAttempted = data.students.filter(student => !attendedIds.has(student._id));
            setStudentsNotAttempted(notAttempted);
          } else {
            console.error('Failed to fetch course students');
          }
        } catch (error) {
          console.error('Error fetching course students:', error);
        }
      };

      fetchCourseStudents();
    }
  }, [courseId, studentsAttended]);

  return (
    <div className='py-10 px-4'>
      <h1 className='text-2xl font-bold mb-4'>Quiz Details</h1>
      <div className='mb-6'>
        <p><strong>Title:</strong> {allQuizes.title}</p>
        <p><strong>Description:</strong> {allQuizes.description}</p>
        <p><strong>Course Id:</strong> {allQuizes.courseId}</p>
        <p><strong>Total Students Enrolled in Course:</strong> {strength.length}</p>
      </div>
      <div className='mb-6'>
        <h2 className='text-xl font-bold mb-2'>Students Attempted</h2>
        {studentsAttended.map((student, index) => (
          <div className='flex justify-between bg-slate-500 py-4 my-2 px-2 rounded-2xl text-white' key={index}>
            <p><strong>S.No:</strong> {index + 1}</p>
            <p><strong>Name:</strong> {student.studentId.name}</p>
            <p><strong>Score:</strong> {student.score} / {student.outof}</p>
          </div>
        ))}
      </div>
      <div>
        <h2 className='text-xl font-bold mb-2'>Students Not Attempted Yet</h2>
        {studentsNotAttempted.map((student, index) => (
          <div className='flex justify-between bg-slate-500 py-4 my-2 px-2 rounded-2xl text-white' key={index}>
            <p><strong>S.No:</strong> {index + 1}</p>
            <p><strong>Name:</strong> {student.name}</p>
            <p>Not attempted</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizPage;
