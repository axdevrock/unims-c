/* eslint-disable react/no-unknown-property */
import { useParams } from "react-router-dom";
import OuterContainer from "../../Refactor/refactorComponents";
import LeaderBoardAttendance, { LeaderBoardAssignment, LeaderBoardScore } from "../../Refactor/refactorLeaderBoard";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserContext } from "../../../context/userContext";
import StudentReportsSection from "../../Refactor/refactorStudentReports";
 
const CourseDashboard = () => {
    const { id } = useParams();
    const { user } = useUserContext();
    let studentId = user?._id; 

    const [studentList, setStudentList] = useState([]);  

    useEffect(() => {
        const getCourseStudentList = async () => {
            try {
                const res = await axios.post('/professor/course-students', { id });
                if (res.data.success) { 
                    setStudentList(res.data.students);
                    // toast.success(res.data.message);
                } else {
                    toast.error(res.data.message);
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error("Failed to fetch student list. Please try again.");
            }
        };
        getCourseStudentList();
    }, [id]);

    return (
        <OuterContainer back title={'Course Overview'}>
            <h1 className="my-8 font-medium text-3xl">Your Performance</h1> 
            <StudentReportsSection studentId={studentId} courseId={id} />

            <h1 className="my-8 font-medium text-3xl">Students Enrolled</h1>
            <p>Total Students Enrolled in the course: {studentList?.length || 0}</p>
            <div className="grid grid-cols-6 gap-4 my-4">
                {
                    studentList.length === 0 ? (
                        <p>No students enrolled</p>
                    ) : (
                        studentList.map((item, index) => (
                            <div className="bg-slate-100 p-3 rounded-md hover:bg-slate-200" key={item?._id}>
                                <p className="font-medium">{index + 1} : {item.name}</p>
                            </div>
                        ))
                    )
                }
            </div>

            <hr className="my-12" />
            <h1 className="text-center my-8 font-medium text-3xl">Leader Board Section</h1>

            <div className="attendance bg-slate-100 rounded-md mt-12 py-2 px-0"> 
                <h2 className="text-2xl p-4 text-center">Class Masters - Assignment Score</h2>
                <div className="studentlist">
                    <LeaderBoardScore courseId={id} />
                </div> 
            </div>

            <div className="attendance bg-slate-100 rounded-md my-4 py-2 px-0"> 
                <h2 className="text-2xl p-4 text-center">Class Masters - Test Score</h2>
                <div className="studentlist">
                    <LeaderBoardAssignment courseId={id} />
                </div> 
            </div>

            <div className="attendance bg-slate-100 my-4 rounded-md py-2 px-0"> 
                <h2 className="text-2xl p-4 text-center">Class Masters - Attendance</h2>
                <div className="studentlist">
                    <LeaderBoardAttendance courseId={id} />
                </div> 
            </div>
        </OuterContainer>
    );
};



 
export default CourseDashboard;