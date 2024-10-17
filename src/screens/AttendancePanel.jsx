/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import OuterContainer from "../Refactor/refactorComponents";
import RefactoredAttendance from "../Refactor/refactoredAttendance";
import { useEffect, useState } from "react";
import axios from "axios";  
import CustomCalendar from "../utils/CustomCalendar";

const AttendancePanel = () => {
    const { state } = useLocation();
    const { courseId, studentId, sDetails } = state;

    return (
        <OuterContainer back title={'Student Attendance Panel'}>
            <div>
                <RefactoredAttendance userId={studentId} courseId={courseId} />
            </div>
            <div className="flex flex-col gap-8 hover:bg-slate-200 bg-slate-300 p-4 my-2">
                <p className="font-medium">Student ID: {sDetails?._id}</p>
                <div className="flex justify-between">
                    <p>Student Name: {sDetails?.name}</p>
                    <p>Student Email: {sDetails?.email}</p>
                </div>
            </div> 
            <div>
                <DisplayAttendance data={{ courseId, studentId }} />
            </div>
        </OuterContainer>
    );
};

export default AttendancePanel;

// Helper function to extract only dates from the data
function getOnlyDates(data) {
    let res = [];
    data.forEach((item) => { 
        res.push(item?.date);
    });
    return res;
}

const DisplayAttendance = ({ data }) => {
    const [attendanceDetails, setAttendanceDetails] = useState([]);
    const [startDate, setStartDate] = useState('');
    const { courseId, studentId } = data;

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await axios.post(`/attendance/get`, {
                    courseId,
                    studentId
                }); 
                if (response.data?.success) { 
                    setAttendanceDetails(getOnlyDates(response.data?.data?.attendanceDetails || []));
                    setStartDate(response.data?.data?.startDate || '');
                } else {
                    console.error("Error in getting attendance");
                }
            } catch (error) {
                console.error("Error fetching attendance:", error);
            }
        };
        fetchAttendance();
    }, [courseId, studentId]);

    return (
        <div className="my-8 flex flex-col justify-center items-center">  
            <div className="flex flex-col"> 
                <h1 className="text-2xl text-center font-medium my-4">Attendance Details</h1> 
                <CustomCalendar startDate={startDate} attendanceDetails={attendanceDetails} />  
            </div>
        </div>
    );
};
