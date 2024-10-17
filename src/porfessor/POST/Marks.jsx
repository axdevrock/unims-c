import axios from "axios";
import { useEffect, useState } from "react";
// import './Marks.css'
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Marks = () => {
    const { id } = useParams();
    const [studentList, setStudentList] = useState([]);
    const [mark, setMark] = useState();
    const [studentId, setstudentId] = useState()
    const [num, setnum] = useState()

    const getCourseStudentList = async () => {
        try {
            const res = await axios.post('http://localhost:8000/api/v1/professor/course-students', { id });
            if (res.data.success) {
                setStudentList(res.data.students);
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to fetch student list. Please try again.");
        }
    };

    const handleStuMarks = async (sId) => {
        setstudentId(sId)
        try {
            const res = await axios.post('http://localhost:8000/api/v1/professor/students-course-mark', { sId, id });
            if (res.data.success) { 
                setMark(res.data.marks);
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to fetch mark. Please try again.");
        }
    };

    const updateMarks=async()=>{
        try {
            const res = await axios.post('http://localhost:8000/api/v1/professor/students-update-mark', {marks : num, studentId, courseId :id });
            if (res.data.success) { 
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to update mark. Please try again.");
        }
    };

    

    useEffect(() => {
        getCourseStudentList();
    }, []);

    return (
        <div className="marks">
            <h1>Marks</h1>
            <h2>Student Names</h2>
            <div className="studentlist">
                {studentList.length === 0 && <p>No students enrolled</p>}
                {studentList.map((student) => (
                    <div key={student._id} className="student" onClick={() => handleStuMarks(student._id)}>
                        <p>{student.name}</p>
                    </div>
                ))}
            </div>
            <div className="attendance-details">
                <h2><b>Marks of the student</b></h2>
                {!mark && <p>Select the student to check markes</p>}
              <p > {mark}</p>
              <div className="inmarks"><input type="text" value={num} onChange={(e)=>setnum(e.target.value)}/> <button onClick={updateMarks}> UPDATE MARKS</button></div>
              </div>
        </div>
    );
};

export default Marks;
