import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import BarChart from "../utils/ChartComponents";
import CustomBarChart from "../utils/ChartAssignment";
import { PieChart } from "../utils/PieChart";

/* eslint-disable react/prop-types */
const StudentReportsSection = ({ studentId, courseId }) => {
    return (
      <section className="grid grid-cols-3 gap-4  rounded-sm  ">
      <StudentsAttendanceReport studentId={studentId} courseId={courseId}  />
      <StudentsAssignmentReport studentId={studentId} courseId={courseId}  />
      <StudentsTestsReport studentId={studentId} courseId={courseId}  /> 
      </section>
    )
  }
  
  export const StudentsAttendanceReport = ({ studentId, courseId }) => {
    const [attendanceReport, setAttendanceReport] = useState({
      present: 0,
      absent: 0,
    });
  
    useEffect(() => {
      const fetchAttendanceReport = async () => {
        try {
          const { data } = await axios.post("/report/s/attendance", {
            studentId,
            courseId,
          });
  
          if (data.success) {
            const { totalAttendance, absences } = data.data;
            setAttendanceReport({
              present: totalAttendance,
              absent: absences,
            });
          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error("Failed to fetch the attendance report.", error);
        }
      };
  
      if (studentId && courseId) {
        fetchAttendanceReport();
      }
    }, [studentId, courseId]);
  
    return (
      <>
        <div className="flex flex-col aspect-square p-3 rounded-sm hover:shadow-xl bg-slate-300">
          <div className="mt-4">
            {attendanceReport.present === 0 && attendanceReport.absent === 0 ? (
              <p>No attendance data available.</p>
            ) : (
              <div className="flex flex-col items-center w-full justify-center gap-12">
                <PieChart chartData={attendanceReport} />
                <h3 className="font-medium text-lg">Student Attendance Report</h3>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };



export const StudentsTestsReport = ({ studentId, courseId }) => { 
  const [testReport, setTestReport] = useState([]);
 
  useEffect(() => {
    const fetchTestReport = async () => {
      try {
        const { data } = await axios.post("/report/s/test", {
          studentId,
          courseId,
        });

        if (data.success) {
          setTestReport(data.data);
        } else {
        //   toast.error(data.message);
        }
      } catch (error) {
        toast.error("Failed to fetch the test report.");
      }
    };

    if (studentId && courseId) {
      fetchTestReport();  
    }
  }, [studentId, courseId]);

  return (
    <>
      <div className="flex flex-col aspect-square p-3 rounded-sm hover:shadow-xl bg-slate-300">
          
        <div className="mt-4 ">
          {testReport.length === 0 ? (
            <p>No test reports available.</p>
          ) : ( 
             <div className="flex  flex-col items-center w-full justify-center gap-12">
             <BarChart chartData={testReport} />
             <h3 className="font-medium   text-lg">Student Test Report</h3>
             </div>
            
          )}
        </div>
        

      </div>
    </>
  );
};



export const StudentsAssignmentReport = ({ studentId, courseId }) => {
    const [assignmentReport, setAssignmentReport] = useState([]);
  
    useEffect(() => {
      const fetchAssignmentReport = async () => {
        try {
          const { data } = await axios.post("/report/s/assignment", {
            studentId,
            courseId,
          });
  
          if (data.success) {
            setAssignmentReport(data.data); // Assuming the response data contains the assignment data
          } else {
            // toast.error(data.message); (if using a toast notification system)
            console.error(data.message);
          }
        } catch (error) {
          console.error("Failed to fetch the assignment report.", error);
          // toast.error("Failed to fetch the assignment report.");
        }
      };
  
      if (studentId && courseId) {
        fetchAssignmentReport();
      }
    }, [studentId, courseId]);
  
    return (
      <>
        <div className="flex flex-col aspect-square p-3 rounded-sm hover:shadow-xl bg-slate-300">
          <div className="mt-4">
            {assignmentReport.length === 0 ? (
              <p>No assignment reports available.</p>
            ) : (
              <div className="flex flex-col items-center w-full justify-center gap-12">
                <CustomBarChart chartData={assignmentReport} />
                <h3 className="font-medium text-lg">Student Assignment Report</h3>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

 

export default StudentReportsSection