/* eslint-disable react/prop-types */
import {Link, useParams} from 'react-router-dom'
import OuterContainer from '../Refactor/refactorComponents'
import {MdLibraryAdd} from "react-icons/md";
import {useEffect, useState} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import { GiClick } from "react-icons/gi";

const QuizHomeScreen = () => {
    const {id} = useParams() // course id
    const [allQuizes,
        setallQuizes] = useState([])

    useEffect(() => {
        const fetchQuizes = async() => {
            try {
                const {data} = await axios.post('/quiz/get-all-quiz', {courseId: id});

                if (data.success === true) {
                    setallQuizes(data.data);
                } else {
                    console.error('Failed to fetch quizzes');
                }
            } catch (error) {
                console.error('Error fetching quizzes:', error);
                toast.error(error.message);
            }
        };

        fetchQuizes();

    }, [id])
    return (
        <OuterContainer back title={'Manage Tests'}>

            <div className='flex justify-end'>
                <p className='flex items-center gap-4'>
                    Add a Test
                    <Link to={`/faculty/course/add-quiz/${id}`}><MdLibraryAdd color='#6C63FF' size={36}/></Link>
                </p>
            </div>
            {/* Display all quizes */}
            <div>
                <p className='text-2xl font-light'>All tests list</p>
                <div className='my-4'>
                    {allQuizes.length == 0
                        ? <p>No Tests to show.</p>
                        : <DisplayTests data={allQuizes}/>
} 
                </div>
            </div>
        </OuterContainer>
    )
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
                                        <Link to={`/faculty/course/quizpage/${item._id}`} className='flex text-white items-center gap-4'>Visit <GiClick size={18}/></Link>
                                    </p> 
                            </div>
                        </div>
                    )
                })
}
        </div>
    )
}
export default QuizHomeScreen