/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useParams, useLocation, Link } from "react-router-dom";
// import './professor.css';
import { useState , useEffect} from "react";
import Announcement from "./POST/Announcement";
import { toast } from "react-toastify";
import axios from "axios";
import Material from "./POST/Material";
import Assignment from "./POST/Assignment";
import style from './POST/course.module.css'
import { useUserContext } from "../../context/userContext";
import  { OuterContainerNarrow } from "../Refactor/refactorComponents";
import RefactoredAttendance from "../Refactor/refactoredAttendance";

const AnnouncementList = ({ announcementList, is,courseId }) => {

    const handleDeleteAnnouncement =async(index)=>{ 
        try {
            const res = await axios.post('/professor/delete-announcement', { courseId , index });
            if (res.data.success) {
                toast("Announcement Deleted successfully!");
            } else {
                toast.error("Failed to delete Announcement. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to Delete Announcement. Please try again.", error.message);
        }

    }

  
   
    return ( <div className={style.announcementDisplay}>
    {
        announcementList?.map((announcement, index)=>{


            return( 
                <div key={index} className={style.announcements}>
                    <div className={style.announcementLeft}>
                    <h3> Title : {announcement.title}</h3>
                    <p> <b>Description</b>: {announcement.description}</p>
                    </div>
                    {is && <div onClick={()=>handleDeleteAnnouncement(index)} className={style.announcementRight}>
                        Delete
                    </div>}

                </div>
            )
        })
    }
        
    </div>)
};

//  material list
const MaterialList = ({ materialList, courseId }) => {

    const handleDeleteMaterial =async(index)=>{
        console.log(index, courseId);
        try {
            const res = await axios.post('/professor/delete-material', { courseId , index });
            if (res.data.success) {
                toast("material Deleted successfully!");
            } else {
                toast.error("Failed to delete material. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to Delete material. Please try again.", error.message);
        }

    }

  
   
    return ( <div className="Announcement-display">
    {
        materialList?.map((material, index)=>{
 
            const URL = import.meta.env.VITE_URL;
  const source = `${URL}/${material?.fileUrl}`


            return(<>
                <div className="Announcement-list">
                   <div className="top">
                    <div className="left">
                    <h1> Title : {material.title}</h1>
                    <p> <b>Description</b>: {material.description}</p>
                    </div>
                    <div onClick={()=>handleDeleteMaterial(index)} className="del">
                        Delete material
                    </div>
                   </div>
                    <iframe src={source} width="100%" height="600px"></iframe>


                    
                </div>
            </>)
        })
    }
        
    </div>)
};

// Assignmetn list
const AssignmentList = ({ assignmentList, courseId }) => {

    const handleDeleteMaterial =async(index)=>{
        try {
            const res = await axios.post('/professor/delete-Assignment', { courseId , index });
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

  
   
    return ( <div className="Announcement-display">
    {
        assignmentList?.map((material, index)=>{
            const URL = import.meta.env.VITE_URL;
  const source = `${URL}/${material?.fileUrl}`


            
            return(<>
                <div className="Announcement-list">
                   <div className="top">
                    <div className="left">
                    <h1> Title : {material.title}</h1>
                    <p> <b>Description</b>: {material.description}</p>
                    </div>
                    <div onClick={()=>handleDeleteMaterial(index)} className="del">
                        Delete Assignment
                    </div>
                   </div>
                    <iframe src={source} width="100%" height="600px"></iframe>
                    
                   


                    
                </div>
            </>)
        })
    }
        
    </div>)
};


const Course = ({is}) => {
    const { id } = useParams();
    const location = useLocation();
    const [announcementList, setannouncementList] = useState([])
    const [materialList, setmaterialList] = useState([])
    const [assignmentList, setassignmentList] = useState([])
    const [open, setopen] = useState(false);
    const { user } = useUserContext();


  const currentPath = location.pathname;
  const getAllMaterials = async () => {
    try {
        const res = await axios.post('/professor/get-material', { courseId : id });
        if (res.data.success) {
            // toast("materials fetched successfully!");
            setmaterialList(res.data.materials);
        } else {
            toast.error("Failed to fetch materials. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to fetch materials. Please try again.");
    }
};
const getAllAnnouncement = async () => {
    try {
        const res = await axios.post('/professor/get-announcement', { courseId : id });
        if (res.data.success) {
            // toast("announcement fetched successfully!");
            setannouncementList(res.data.Announcement);
        } else {
            toast.error("Failed to fetch announcement. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to fetch announcement. Please try again.");
    }
};
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
 
    // if (announcementList?.length ===0) {
        getAllMaterials();
        getAllAnnouncement()
        getAllAssignment()
        // console.log(announcementList);
    // }
}, []);



    return (
       <OuterContainerNarrow back title={'course details'}>
         <div className={style.courseSingle}>
            <p className={style.path}>{currentPath}</p>
            {/* Old attedance path */}
            {/* {
                !is && <Attendance userId={user._id} courseId={id} />
            }  */}
            {/* New attendance controller
             */}
             {
                !is && <RefactoredAttendance userId={user._id} courseId={id} />
            }
            
            <div className={style.links}>
            {is && <Link to={`/courses/attendence/${id}`}>Attendence section</Link>}
            {
                is ? <Link to={`/faculty/c-d/${id}`}>Course Dashboard</Link> : <Link to={`/student/c-d/${id}`}>Course Dashboard</Link>
            }
           { is ?  <Link to={`/faculty/course/material/${id}`}>material section</Link> : <Link to={`/student/course/material/${id}`}>material section</Link>}
           {!is ?<Link to={`/student/course/assignment/${id}`}>assignment </Link> : <Link to={`/faculty/course/assignment/${id}`}>assignment section</Link>}
            {
                is ? <Link to={`/faculty/course/quiz/${id}`}>Test / Assignment section</Link> : <Link to={`/student/test/${id}`}>Test /Assignment section</Link>
            }
            
            {/* test */}
            {/* <Link to={`/student/quizzes/${id}`}>Test section</Link> */}

            </div>

            
            {/* <div className="materialInput">
            <div className="top"><h1>Cousre material</h1> <p onClick={() => setopen1(true)}>Post class materials</p></div>
            <div className="body">
                {
                    materialList?.length === 0 && <p>Currently there are no Material posted</p>
                }
                <Material open={open1} id={id} setopen={setopen1} />
                <MaterialList materialList={materialList} courseId={id}/>


            </div>
            
            </div> */}
            <div className={style.announcement}>
            <div className={style.announcementTop}>
            <h1>Announcement</h1> 
            {is && <h1 onClick={() => setopen(true)}>Post Announcement</h1>}
            </div>
            <div className={style.announcementBody}>
                {
                    announcementList?.length === 0 && <p>Currently there are no announcement</p>
                }
                <Announcement open={open} id={id} setopen={setopen} />
                <AnnouncementList announcementList={announcementList} is={is} courseId={id}/>


            </div>
            
            </div>
           {/* <div className="AssignmenttInput">
            <div className="top"><h1>Assignment</h1> <p onClick={() => setopen2(true)}>Post Assignment</p></div>
            <div className="body">
                {
                    assignmentList?.length === 0 && <p>Currently there are no Assignment</p>
                }
               
                 {
        assignmentList &&
        assignmentList.map((assignment) => (
            <> 
                <p>Assignment Title: {assignment?.title}</p>
                <div>
                    {assignment?.submittedBy?.map((submission, index) => (
                        <div key={index}>
                        <p >Submission by: {submission?.name}</p>
                        <iframe src={`http://localhost:8000/uploads/${submission?.file}`} width="100%" height="600px"></iframe>
                        

                   </div> ))}
                </div>
            </>
    ))
}
                <Assignment open={open2} id={id} setopen={setopen2} />
                <AssignmentList assignmentList={assignmentList} courseId={id}/>


            </div>
            
            </div> */}

        </div>
       </OuterContainerNarrow>
    );
}

// Assignment
const Attendance = ({userId, courseId}) => {
    const currentDate = new Date().toISOString();
    const [attended, setAttended] = useState(false); // State to track attendance submission
  
    const handleAttendanceSubmit = async () => {

        if (!attended) {
            toast.error("Please first mark the checkbox");
            return;
        }
      try {
        const {data} = await axios.post('/student/attendance', {
          userId,
          courseId,
          date: currentDate,
          attended,
        });
  
        if (data.success) {
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to update attendance. Please try again.");
    }
    };
  
    return (
        <div>
        <p className="text-lg font-semibold">Submit your attendance for {currentDate}</p>
        <p>
          <input
            className="mr-2"
            type="checkbox"
            checked={attended}
            onChange={(e) => setAttended(e.target.checked)}
          />
          <button
            className="border-2 border-gray-200 bg-gray-300 px-4 py-2 rounded-sm"
            onClick={handleAttendanceSubmit}
          >
            Submit Attendance
          </button>
        </p>
      </div>
    );
  };
export default Course;
