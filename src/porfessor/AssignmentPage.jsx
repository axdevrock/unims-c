/* eslint-disable react/prop-types */
import Assignment from "./POST/Assignment"
import style from './POST/course.module.css'
import { toast } from "react-toastify";
import axios from "axios"; 
import { useState , useEffect} from "react";
import { Link, useParams } from "react-router-dom";

const AssignmentList = ({ assignmentList, courseId }) => {

    const handleDeleteMaterial =async(id)=>{
        try {
            const res = await axios.post('/professor/delete-Assignment', { id :id});
            if (res.data.success) {
                toast("Assignment Deleted successfully!");
            } else {
                toast.error("Failed to delete Assignment. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to Delete Assignment. Please try again.", error.message);
        }

    }

  
   
    return (  <div className={style.materialDisplay}>
    {
        assignmentList?.map((material, index)=>{

            {/* const srx = `http://localhost:8000/uploads/${material?.fileUrl}` */}

            return(<>
                <div className={style.materials} key={index}>
                    <div className={style.materialsLeft}>
                    <h1> Title : {material.title}</h1>
                    <p> <b>Description</b>: {material.description}</p>
                    </div>
                    <div className={style.materialsRight}>
                    <p onClick={() => handleDeleteMaterial(material?._id)}>Delete Assignment</p>
                        <Link key={courseId}
                            to={{
                                pathname: `/assignment/${material?._id}`,
                                state:{courseId}  ,
                                
                            }}
                        >
                            View Assignment
                        </Link>
                   </div>
                   
                    
                   


                    
                </div>
            </>)
        })
    }
        
    </div>)
};

const AssignmentPage = () => {
    const { id } = useParams();

    const [assignmentList, setassignmentList] = useState([])
    const [open, setOpen] = useState(false)
    const getAllAssignment = async () => {
        try {
            const res = await axios.post('/professor/get-Assignment', { courseId : id });
            if (res.data.success) {
                // toast("Assignment fetched successfully!");
                setassignmentList(res.data.Assignments);
            } else {
                toast.error("Failed to fetch Assignment. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to fetch Assignment. Please try again.");
        }
    };
    
    
      useEffect(() => {
      
            getAllAssignment()
    }, []);
  return (
    <div className={style.materialPage}>
            <div className={style.materialTop}>
                <h1>Assignment </h1>
                <h1 onClick={() => setOpen(true)}>Post Assignment</h1>
            </div>
            <div className={style.announcementBody}>
                {assignmentList?.length === 0 && <p>Currently there are no materials posted</p>}
                <Assignment courseId={id} open={open} setopen={setOpen} />
                <AssignmentList assignmentList={assignmentList} />
            </div>
        </div>
  )
}

export default AssignmentPage