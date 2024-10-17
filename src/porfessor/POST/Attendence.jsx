/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {OuterContainerNarrow} from "../../Refactor/refactorComponents";
import LeaderBoardAttendance, { LeaderBoardAssignment, LeaderBoardScore } from "../../Refactor/refactorLeaderBoard";

const Attendence = () => {
    const { id } = useParams();
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
      <OuterContainerNarrow back title={'Student Attendance panel'}>
      {/* class masters Assignment */}
      {/* <div className="attendence bg-slate-100 rounded-md mt-12  py-2 px-0"> 
            <h2 className="text-2xl p-4 text-center">Class masters - Assignment Score</h2>
            <div className="studentlist">
            <LeaderBoardScore courseId={id} />
                
            </div> 
        </div> */}
        {/* class masters Test */}
      {/* <div className="attendence bg-slate-100 rounded-md my-4 py-2 px-0"> 
            <h2 className="text-2xl p-4 text-center">Class masters - Test Score</h2>
            <div className="studentlist">
            <LeaderBoardAssignment courseId={id} />
                
            </div> 
        </div> */}
        {/* class masters attendance */}
      {/* <div className="attendence bg-slate-100 my-4 rounded-md  py-2 px-0"> 
            <h2 className="text-2xl p-4 text-center">Class masters - Attendance</h2>
            <div className="studentlist">
            <LeaderBoardAttendance courseId={id}  />
                
            </div> 
        </div> */}
      
          <div className="attendence py-2 px-0"> 
            <h2 className="text-2xl p-4 underline">Student enrolled in the course</h2>
            <div className="studentlist">
                {studentList.length === 0 && <p>No students enrolled</p>}
                <div className="flex flex-col">
               {studentList.map((student) => <StudentItem cid={id} item={student} key={student._id} /> )}
               </div>
                
            </div> 
        </div>
      </OuterContainerNarrow>
    );
};

export default Attendence; 


function StudentItem({item,cid}){

    return(
        <div className=" flex flex-col gap-8 hover:bg-slate-200 bg-slate-300 p-4 my-2"> 
            <div className="flex justify-between">
            <p>Student Name : {item?.name}</p>
            <p>Student email : {item?.email}</p>
            </div>
            <div className="flex justify-between">
               <p> student id : {item?._id}</p>
               <Link to={'/courses/student-attendence'} state={{
                studentId:item?._id,
                courseId:cid,
                sDetails:item
               }} className="underline text-2xl">Enter</Link>
            </div>
        </div>
    )
}