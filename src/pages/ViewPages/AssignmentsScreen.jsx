/* eslint-disable react/prop-types */
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import style from './viewpages.module.css'


const AssignmentsScreen = () => {
    const { id } = useParams();

    const [assignmentSingle, setAssignmentSingle] = useState(null);
    const [isSubOpen, setIsSubOpen] = useState(false);
    const [newMarks, setNewMarks] = useState('');
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    useEffect(() => {
        const getAllAssignment = async () => {
            try {
                const res = await axios.post('/professor/get-single-assignment', { id });
                if (res.data.success) {
                    setAssignmentSingle(res.data.assignment);
                } else {
                    toast.error("Failed to fetch Assignment. Please try again.");
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error("Failed to fetch Assignment. Please try again.");
            }
        };
        getAllAssignment();
    }, [id]);

    const handleUpdateMarks = async (studentId) => {
        try {
            const res = await axios.post('/professor/students-update-mark', { studentId, assignmentId: assignmentSingle?._id, mark: newMarks });
            if (res.data.success) {
                toast.success("Marks updated successfully!");
              setIsSubOpen(false);   
            } else {
                toast.error("Failed to update marks. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to update marks. Please try again.");
        }
    };

    const handleViewSubmission = (submission) => {
        setSelectedSubmission(submission);
        setIsSubOpen(true);
    };
    const URL = import.meta.env.VITE_URL;
    const source = `${URL}/${assignmentSingle?.fileUrl}`
   
    return (
        <div className={style.assigmnmentContainer}>
            <h1>Assignment Details</h1>
            <div className={style.top}>
                <p>Title: {assignmentSingle?.title}</p>
                <p><b>Description:</b> {assignmentSingle?.description}</p>
                <iframe src={source} width="100%" height="600px"></iframe>
            </div>
            <h1>Assignment Submission Details</h1>
            <div className={style.bottom}>
                {assignmentSingle?.SubmittedBy?.length === 0 ? (
                    <p>No one has submitted the assignment yet</p>
                ) : (
                    <table className={style.assignmentTable}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Student Name</th>
                                <th>Submission Date</th>
                                <th>Assignment Title</th>
                                <th>Marks</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignmentSingle?.SubmittedBy.map((item, index) => (
                                <tr key={index} className={style.submitted}>
                                    <td>{index + 1}</td>
                                    <td>{item?.user?.name}</td>
                                    <td>{item?.submittedAt}</td>
                                    <td>{assignmentSingle?.title}</td>
                                    <td>{item?.marks}</td>
                                    <td>
                                        <button onClick={() => handleViewSubmission(item)}>View submission and update marks</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <ViewSubmissionModal
                isOpen={isSubOpen}
                onClose={() => setIsSubOpen(false)}
                submission={selectedSubmission}
                onUpdateMarks={handleUpdateMarks}
                newMarks={newMarks}
                setNewMarks={setNewMarks}
            />
        </div>
    );
};

const ViewSubmissionModal = ({ isOpen, onClose, submission, onUpdateMarks, newMarks, setNewMarks }) => {
    const handleUpdateMarks = () => {
        onUpdateMarks(submission?.user._id);
    };
     const URL = import.meta.env.VITE_URL;
    const source = `${URL}/${submission?.fileUrl}`

    return (
        <div className={`${style.modal} ${isOpen ? style.open : ''}`}>
            {isOpen && (
                <div className={style.modalContent}>
                    <span className={style.closeBtn} onClick={onClose}>&times;</span>
                    <iframe src={source} height='100%' width='100%'></iframe>
                    <div>
                        <label htmlFor="marks">New Marks:</label>
                        <input type="number" id="marks" name="marks" value={newMarks} onChange={(e) => setNewMarks(e.target.value)} />
                        <button onClick={handleUpdateMarks}>Update Marks</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignmentsScreen;
