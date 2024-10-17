/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserContext } from "../../context/userContext"; 
import { Link } from "react-router-dom";
import OuterContainer from "../Refactor/refactorComponents";


const Dashboard = () => {
    const [courseList, setCourseList] = useState([]);
    const { user } = useUserContext();

    useEffect(() => {
        const getAllCourses = async () => {
            try {
                const res = await axios.post('/student/get-my-course', { studentId : user?._id });
                if (res.data.success) {
                    // toast("My courses fetched successfully!");
                    setCourseList(res.data.courses);
                } else {
                    toast.error("Failed to fetch my courses. Please try again.");
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error("Failed to fetch my courses. Please try again.");
            }
        };
        if (courseList.length === 0) {
            getAllCourses();
        }
    }, [user]);

    return (
        <OuterContainer title={'My Enrolled courses'}>
        {courseList.length === 0 && <p>No course available</p>} 
          {courseList.map((course) => <Course course={course} key={course._id} />)}
               
        </OuterContainer>
    );
}

const Course = ({ course }) => {
    return (
        <div className="bg-main p-4 rounded-lg my-6 shadow-md text-white">
        <h2 className="text-xl font-bold mb-3">{course?.title}</h2>
        <div className="space-y-2 text-gray-100">
          <p>
            <span className="font-medium">Course Code:</span> {course?.courseCode}
          </p>
          <p>
            <span className="font-medium">Department:</span> {course?.courseDepartment}
          </p>
          <p>
            <span className="font-medium">Description:</span> {course?.description}
          </p>
          <p>
            <span className="font-medium">Instructor:</span> {course?.instructor["name"]}
          </p>
          <p>
            <span className="font-medium">Enrolled Students:</span> {course?.students.length}
          </p>
        </div>
        <Link
          to={`/student/course/${course?._id}`}
          className="mt-4 inline-block text-sm font-medium text-blue-200 hover:text-blue-100 underline transition-colors duration-200"
        >
          Visit the course
        </Link>
      </div>
      
    );
}

export default Dashboard;
