import { useParams } from "react-router-dom"; 
import OuterContainer from "../Refactor/refactorComponents";
import LeaderBoardAttendance, { LeaderBoardAssignment, LeaderBoardScore } from "../Refactor/refactorLeaderBoard";
import { handleDownloadStudentList,handleDownloadAttendance, handleDownloadTestScore, handleDownloadAssignmentScore } from "../utils/serverReports";

const CourseDashbaordProfessor = () => {
    const { id } = useParams();
 
  return (
    <OuterContainer back title={'Course Overview'}> 
       <h1 className=" my-8 font-medium text-3xl">Get Course reports</h1>
       <div className="grid grid-cols-4 gap-4">
            <p onClick={() => handleDownloadStudentList(id)} className="bg-main p-4 text-white text-center font-medium hover:shadow-xl cursor-pointer rounded-sm">Generate student report</p>
            <p onClick={() => handleDownloadAttendance(id)} className="bg-main p-4 text-white text-center font-medium hover:shadow-xl cursor-pointer rounded-sm">Generate Attendance report</p>
            <p  onClick={() => handleDownloadAssignmentScore(id)} className="bg-main p-4 text-white text-center font-medium hover:shadow-xl cursor-pointer rounded-sm">Generate Assignment report</p>
            <p onClick={() => handleDownloadTestScore(id)} className="bg-main p-4 text-white text-center font-medium hover:shadow-xl cursor-pointer rounded-sm">Generate Test/Quizzes report</p>
       </div>


    <hr className="my-12"/>
   <h1 className="  my-8 font-medium text-3xl">Leader Board Section</h1>

<div className="attendence bg-slate-100 rounded-md mt-12  py-2 px-0"> 
            <h2 className="text-2xl p-4 text-center">Class masters - Assignment Score</h2>
            <div className="studentlist">
            <LeaderBoardScore courseId={id} />
                
            </div> 
        </div>
        {/* class masters Test */}
      <div className="attendence bg-slate-100 rounded-md my-4 py-2 px-0"> 
            <h2 className="text-2xl p-4 text-center">Class masters - Test Score</h2>
            <div className="studentlist">
            <LeaderBoardAssignment courseId={id} />
                
            </div> 
        </div>
        {/* class masters attendance */}
      <div className="attendence bg-slate-100 my-4 rounded-md  py-2 px-0"> 
            <h2 className="text-2xl p-4 text-center">Class masters - Attendance</h2>
            <div className="studentlist">
            <LeaderBoardAttendance courseId={id}  />
                
            </div> 
        </div>
      
          {/* <div className="attendence py-2 px-0"> 
            <h2 className="text-2xl p-4 underline">Student enrolled in the course</h2>
            <div className="studentlist">
                {studentList.length === 0 && <p>No students enrolled</p>}
                <div className="flex flex-col">
               {studentList.map((student) => <StudentItem cid={id} item={student} key={student._id} /> )}
               </div>
                
            </div> 
        </div> */}

   </OuterContainer>
  )
}

export default CourseDashbaordProfessor