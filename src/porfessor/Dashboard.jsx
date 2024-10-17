/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserContext } from "../../context/userContext";
import styles from './professor.module.css';

const Dashboard = () => {
    const [courseList, setCourseList] = useState([]);
    const { user } = useUserContext();

    useEffect(() => {
        const getAllCourses = async () => {
            try {
                const res = await axios.post('/professor/courses', { instructor: user?._id });
                if (res.data.success) {
                    // toast.success("Courses fetched successfully!");
                    setCourseList(res.data.courses);
                } else {
                    toast.error("Failed to fetch courses. Please try again.");
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error("Failed to fetch courses. Please try again.");
            }
        };

        // Fetch courses only once when component mounts
        if (courseList?.length === 0) {
            getAllCourses();
        }
    }, [courseList?.length, user?._id]);

    return (
        <div className={styles.professorMyCourse}> 
                <h1 className="text-2xl italic font-bold">My Courses</h1> 
                <div > 
                <AllCourses courseList={courseList} />

                </div>
                {courseList?.length === 0 && <p>No course available</p>}
                <h1>Visit List of All Students</h1>
                <Link to='/admin/students'>List of Students</Link>
            
        </div>
    );
};

const AllCourses = ({ courseList }) => {
    return (<>
            {courseList.map((course) => (
                <div key={course?._id} className="bg-main hover:bg-opacity-90 text-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-xl font-semibold text-white">{course?.courseCode}: {course?.title}</h3>
    <Link to={`/faculty/courses/${course?._id}`} className="text-white border-2 border-white py-2 px-6 rounded-md hover:bg-white  ">
      <span className="text-white hover:text-main">Visit</span>
    </Link>
  </div>
  <p className=" mb-2">
    <span className="font-medium ">Department:</span> {course?.courseDepartment}
  </p>
  <p className=" mb-2">
    <span className="font-medium ">Description:</span> {course?.description}
  </p>
  <p className="">
    <span className="font-medium ">No. of students enrolled:</span> {course?.students.length}
  </p>
</div>

            ))}
            </>
    );
};

export default Dashboard;
