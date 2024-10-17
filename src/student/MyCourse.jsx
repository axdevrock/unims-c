/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserContext } from "../../context/userContext";
import style from "./student.module.css";
import OuterContainer from "../Refactor/refactorComponents";

const MyCourse = () => {
    const [courseList, setCourseList] = useState([]);
    const { user } = useUserContext();

    useEffect(() => {
        const getAllCourses = async () => {
            try {
                const res = await axios.get("/student/all-courses");
                if (res.data.success) {
                    // toast("Courses fetched successfully!");
                    setCourseList(res.data.courses);
                } else {
                    toast.error("Failed to fetch courses. Please try again.");
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error("Failed to fetch courses. Please try again.");
            }
        };
        if (courseList.length === 0) {
            getAllCourses();
        }
    }, [user]);

    

    return (
       <OuterContainer title={'Available courses'}> 
            <div  className=""> 
                {courseList.length === 0 ? (
                    <p>No course available</p>
                ) : (
                    <div className='flex flex-col gap-4  '>
                        {courseList.map((course) => (
                            <Course key={course._id} course={course} userId={user?._id} />
                        ))}
                    </div>
                )}
            </div> 
       </OuterContainer>
    );
};

const Course = ({ course, userId }) => {
    const courseEnroll = async (id) => {
        try {
            const res = await axios.post("/student/enroll-course", { courseId: id, studentId: userId });
            if (res.data.success) {
                toast(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to fetch courses. Please try again.");
        }
    };

    return (
        <div className="bg-white shadow-lg p-6 rounded-lg my-6 border border-gray-200">
  <h2 className="text-lg font-semibold text-gray-800 mb-2">{course?.title}</h2>
  <div className="text-gray-600 space-y-1">
    <p>
      <span className="font-medium text-gray-700">Course Code:</span> {course?.courseCode}
    </p>
    <p>
      <span className="font-medium text-gray-700">Department:</span> {course?.courseDepartment}
    </p>
    <p>
      <span className="font-medium text-gray-700">Description:</span> {course?.description}
    </p>
    <p>
      <span className="font-medium text-gray-700">Instructor:</span> {course?.instructor.name}
    </p>
    <p>
      <span className="font-medium text-gray-700">Enrolled Students:</span>{" "}
      {course?.students.length}
    </p>
  </div>
  <button
    onClick={() => courseEnroll(course?._id)}
    className="mt-4 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  >
    Enroll
  </button>
</div>

    );
};

const Attandence = ({ userId }) => {
    const [formattedDate, setFormattedDate] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        setFormattedDate(`${year}-${month}-${day}`);
    }, []);

    const handleAttendance = async () => {
        if (!isChecked) {
            toast.success("Please first mark the checkbox");
            return;
        }

        try {
            const res = await axios.post('/student/attendance', {
                formattedDate, userId
            });
            if (res.data.success) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to update attendance. Please try again.");
        }
    };

    return (
        <div className="attendance-container">
            <h3 className="attendance-heading">Mark your attendance for today</h3>
            <div>
                <p className="attendance-date">{formattedDate}</p>
                <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
            </div>
            <button onClick={handleAttendance} className="attendance-button">Submit</button>
        </div>
    );
};



export default MyCourse;
