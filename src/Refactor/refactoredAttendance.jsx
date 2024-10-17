/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"; 
import axios from "axios";
import { toast } from "react-toastify";

const RefactoredAttendance = ({ userId, courseId }) => {

    const [attendance, setAttendance] = useState(false);   
    const [loading, setLoading] = useState(true);  
    const [submitting, setSubmitting] = useState(false);   
 

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                setLoading(true);   
                const { data } = await axios.post(`/attendance/get-today`, {
                    courseId,
                    studentId: userId
                }); 
                if (data.success) {
                    setAttendance(data.data);  
                } else { 
                    console.log('Error in getting attendance');
                }
            } catch (error) {
                console.error("Error getting attendance:", error); 
            } finally {
                setLoading(false);  
            }
        };
        fetchAttendance();
    }, [courseId,userId]);

    async function handleAddAttendance() {
        try {
            setSubmitting(true);  
            const { data } = await axios.post(`/attendance/add`, {
                courseId,
                studentId: userId
            });

            if (data.success) { 
                toast.success(data.message);
                setAttendance(true);   
            } else { 
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error adding attendance:", error); 
            toast.error(error.message);
        } finally {
            setSubmitting(false);  
        }
    }

    return (
        <div> 
            {loading ? (
                <p>Loading attendance...</p>
            ) : (
                !attendance ? (
                    <div className="flex justify-center items-center w-full h-[20vh] bg-slate-100 my-4 rounded-sm">
                        <button
                            onClick={handleAddAttendance}
                            className="bg-main px-4 py-2 rounded-md text-white hover:opacity-90"
                            disabled={submitting}  // Disable button when submitting
                        >
                            {submitting ? "Submitting..." : "Submit Attendance"}
                        </button>
                    </div>
                ) : <p className="text-gray-500 my-4">Attendance Submitted for the day !</p>
            )}
        </div>
    );
}

export default RefactoredAttendance;

