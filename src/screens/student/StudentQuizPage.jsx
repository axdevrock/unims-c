/* eslint-disable react/prop-types */
  
import { Link, useParams } from 'react-router-dom'
import OuterContainer from '../../Refactor/refactorComponents' 
import { GiClick } from 'react-icons/gi';
import { useEffect, useState } from 'react';
import axios from 'axios'; 
import { toast } from 'react-toastify';
import { useUserContext } from '../../../context/userContext';

const StudentQuizPage = () => {
    const { id } = useParams();
    const [allTests, setAllTests] = useState([]); 
    const [attemptedTests, setAttemptedTests] = useState([]);
    const [newTests, setNewTests] = useState([]);
    const { user } = useUserContext();  
    
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const { data } = await axios.post('/quiz/get-all-quiz', { courseId: id });

                if (data.success) {
                    setAllTests(data.data); 
                } else {
                    toast.error('Failed to fetch quizzes');
                }
            } catch (error) {
                console.error('Error fetching quizzes:', error);
                toast.error('An error occurred while fetching quizzes');
            }
        };

        fetchQuizzes();
    }, [id]);

    useEffect(() => {
        if (allTests.length && user?._id) {
            let sid = user._id;
            let attempted = filterStudents({ sid, data: allTests });
            let unattempted = UnfilterStudents({ sid, data: allTests });
            setAttemptedTests(attempted);
            setNewTests(unattempted);
        }
    }, [allTests, user]);

    return (
        <OuterContainer back title="All Tests Page">
            <OuterTest title="Attempted Tests" data={attemptedTests} />
            <OuterTest title="New Tests" data={newTests} /> 
        </OuterContainer>
    );
};



function OuterTest({title,data}) {
    return (
        <div>
            <h3 className='text-2xl my-3 font-light'>{title}</h3> 
                <div className='my-4'>
                    {data?.length == 0
                        ? <p>No Tests to show.</p>
                        : <DisplayTests data={data}/>
}  
            </div>
        </div>
    )
}


function filterStudents({ sid, data }) {
    let filteredList = data.filter((item) => {
        return item.studentsAttended.some((stu) => stu.studentId == sid);
    });

    return filteredList;
}

function UnfilterStudents({ sid, data }) {
    let filteredList = data.filter((item) => {
        return item.studentsAttended.every((stu) => stu.studentId != sid);
    });
    return filteredList;
}


function DisplayTests({data}) {
    return (
        <div className=''>
            {data
                ?.map((item) => {
                    return (
                        <div
                            className='my-4  p-2 hover:bg-slate-300 rounded-md bg-slate-200'
                            key={item._id}>
                            <div className='flex justify-between'>
                                <div>
                                    <p className='font-semibold capitalize'>{item.title}</p>
                                    <p className='font-light capitalize'>{item.description}</p>
                                </div>
                                <div>
                                    <p className='font-medium'>created At : {item.createdAt
                                            ?.slice(0, 10)}</p>
                                    <p className='font-light'>Course Name : {item.courseId
                                            ?.title}</p>
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                
                                    <p className='font-light capitalize'>Total Marks : {item.totalMarks}</p>
                                    <p className='font-light p-2 rounded-md bg-slate-400 cursor-pointer items-center text-white flex gap-4 capitalize'>
                                        <Link to={`/student/single-test/${item._id}`} className='flex text-white items-center gap-4'>check <GiClick size={18}/></Link>
                                    </p>
                                
                            </div>
                        </div>
                    )
                }) 
}
        </div>
    )
}
export default StudentQuizPage