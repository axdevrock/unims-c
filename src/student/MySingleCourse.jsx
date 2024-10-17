/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
// import './student.css';
import { useParams, useLocation } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';


const AnnouncementList = ({ announcementList}) => {

    

  
   
    return ( <div className="Announcement-display">
    {
        announcementList?.map((announcement)=>{

            {/* const srx = `http://localhost:8000/uploads/${announcement?.fileUrl}` */}

            return(<>
                <div className="Announcement-list">
                   <div className="top">
                    <div className="left">
                    <h1> Title : {announcement.title}</h1>
                    <p> <b>Description</b>: {announcement.description}</p>
                    </div>
                   </div>


                    
                </div>
            </>)
        })
    }
        
    </div>)
};

//  material list
const MaterialList = ({ materialList }) => {

  
   
    return ( <div className="Announcement-display">
    {
        materialList?.map((material)=>{

            {/* const srx = `` */}

            return(<>
                {material && <div className="Announcement-list">
                   <div className="top">
                    <div className="left">
                    <h1> Title : {material.title}</h1>
                    <p> <b>Description</b>: {material.description}</p>
                    </div>
                   </div>
                    <iframe src={`http://localhost:8000/uploads/${material?.fileUrl}`} width="100%" height="600px"></iframe>


                    
                </div>}
            </>)
        })
    }
        
    </div>)
};

// Assignmetn list
// const AssignmentList = ({ assignmentList }) => {

    
  
   
//     return ( <div className="Announcement-display">
//     {/* { */}
//         {/* assignmentList.map((material)=>{ */}

//             const srx = `http://localhost:8000/uploads/${assignmentList?.fileUrl}`

//             return(<>
//                 <div className="Announcement-list">
//                    <div className="top">
//                     <div className="left">
//                     <h1> Title : {assignmentList?.title}</h1>
//                     <p> <b>Description</b>: {assignmentList?.description}</p>
//                     </div>
//                    </div>
//                     <iframe src={srx} width="100%" height="600px"></iframe>


                    
//                 </div>
//             </>)
//         {/* } */}
//         )
//     {/* } */}
        
//     </div>)
// };
const AssignmentList = ({ assignmentList }) => {
    return (
        <div className="Announcement-display">
            {/* {assignmentList.map((assignment, index) => ( */}
                <div className="Announcement-list">
                    <div className="top">
                        <div className="left">
                            <h1>Title: {assignmentList.title}</h1>
                            <p><b>Description:</b> {assignmentList.description}</p>
                        </div>
                    </div>
                    <iframe src={`http://localhost:8000/uploads/${assignmentList.fileUrl}`} width="100%" height="600px"></iframe>
                </div>
            {/* )) */}
            {/* } */}
        </div>
    );
};


const MySingleCourse = () => {
    const { id } = useParams();
    const courseId = id;
    const location = useLocation();
    const currentPath = location.pathname;
    const [courseDetails, setcourseDetails] = useState()
    const [materialList, setmaterialList] = useState([])
    const [assignmentList, setassignmentList] = useState(null)
    const [announcementList, setannouncementList] = useState([])  
     const [student, setstudent] = useState(null || localStorage.getItem('student'));
     const [file, setfile] = useState()


    const getACourse =async()=>{
        try {
            const res = await axios.post('http://localhost:8000/api/v1/student/get-a-course', { courseId});
            if (res.data.success) {
                toast("my Courses details successfully!"); 
                setcourseDetails(res.data.course);
            } else {
                toast.error("Failed to fetch my courses. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to my fetch courses. Please try again.");
        }
    }

    const getAllMaterials = async () => {
        try {
            const res = await axios.post('http://localhost:8000/api/v1/professor/get-material', { courseId });
            if (res.data.success) {
                toast("materials fetched successfully!");
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
            const res = await axios.post('http://localhost:8000/api/v1/professor/get-announcement', { courseId  });
            if (res.data.success) {
                toast("Assignment fetched successfully!");
                setannouncementList(res.data.Announcement);
            } else {
                toast.error("Failed to fetch Assignment. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to fetch Assignment. Please try again.");
        }
    };
    const getAnAssignment = async (student) => {
        console.log("studet");
        console.log(student);
        try {
            const res = await axios.post('http://localhost:8000/api/v1/student/get-an-Assignment', { courseId, studentId: student?._id,sName: student?.name  });
            if (res.data.success) {
                toast("Assignment fetched successfully!");
                setassignmentList(res.data.assignmentPending);
            } else {
                toast.error("Failed to fetch Assignment. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to fetch Assignment. Please try again.");
        }
    };



    useEffect(() => {
        const storedstudent = localStorage.getItem('student');
        if (storedstudent) {
            const parsedstudent = JSON.parse(storedstudent);
            setstudent(parsedstudent);
        }
        getACourse()
    }, []);
    

    useEffect(()=>{
      
        getAllMaterials();
        getAllAnnouncement();
        getAnAssignment(student?.user);
    },[student])
 
    const submitAssignment=async ()=>{
        const studentId = student.user._id;
        const name = student?.user?.name;
        const formData = new FormData(); 
        formData.append('courseId', courseDetails?._id);
        formData.append('title',assignmentList?.title)
        formData.append('studentId', studentId)
        formData.append('name', name)
        formData.append('file', file);
        try {
            const res = await axios.post('http://localhost:8000/api/v1/student/submit-assignment', formData);
            console.log(res);
             if(res.data.success) {
                toast(res.data.message);
            }else{
                 toast(res.data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to submit the assignment courses. Please try again.");
        }

    }
  return (
    <div className="single-course">
            <p className="path">{currentPath}  {courseId}</p>
            <div className="CourseDetails">
            <div className="body">
                 <h1>{courseDetails?.title}</h1>
                 <p><b>Description :</b> {courseDetails?.description}</p>
                 <p><b>Teacher :</b> {courseDetails?.instructor['name']}</p>
                 <p>Student :{student?.user?._id}</p>

            </div>
            
            </div>
            <div className="materialInput">
            <div className="top"><h1>Cousre material </h1></div>
            <div className="body">
                {
                    materialList?.length === 0 && <p>Currently there are no Material posted</p>
                }
                <MaterialList materialList={materialList}/>


            </div>
            
            </div>
            <div className="announcementInput">
            <div className="top"><h1>Announcement</h1></div>
            <div className="body">
                {
                    announcementList?.length === 0 && <p>Currently there are no announcement</p>
                }
                <AnnouncementList announcementList={announcementList} />


            </div>
            
            </div>
            <div className="AssignmenttInput">
             
            <div className="top"><h1>Assignment</h1> </div>
            
           
            <div className="body">
                
                    {assignmentList  == null  && <p>You have submitted all the Assignment</p>
                }
                { assignmentList !=null && <AssignmentList assignmentList={assignmentList}/>}
                { assignmentList !=null  &&  <div className='submitAssignment'>
                    <h2>submit you Assignment</h2>
                    <label htmlFor="file">File:</label>
                     <input type="file" id="file" onChange={(e) => setfile(e.target.files[0])} /> <br/> <button onClick={submitAssignment}>submit</button>
                    <p>only in pdf mode</p>
                    <p>{JSON.stringify(assignmentList)}</p>
                </div>}


            </div> 
           
            </div>

        </div>
  )
}

export default MySingleCourse