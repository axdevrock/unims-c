/* eslint-disable react/prop-types */
import style from '../../porfessor/POST/course.module.css'
import { toast } from "react-toastify";
import axios from "axios"; 
import { useState , useEffect} from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { useUserContext } from '../../../context/userContext';

const AssignmentList = ({ assignmentList }) => {
  const URL = 'https://localhost:8000/uploads' 
  // import.meta.env.VITE_URL;
  const source = `${URL}/${assignmentList?.fileUrl}`
  console.log('-----------------');
  console.log(source);
  
  

    
    return (
        <div className={style.materialDisplay}>  
                    <div className={style.materialsLeft}>
                        <h1>Title: {assignmentList?.title}</h1>
                        <p><b>Description:</b> {assignmentList?.description}</p>
                    </div>
                    <div className={style.materialsRight}> 
                    <iframe src={source} height='600px' width='100%'></iframe>
                    </div>
                </div>  
    )
            };
    

const AssignmentStudentScreen = () => {
    const { id } = useParams();

    const nav = useNavigate()


    const {user} = useUserContext()
    const [assignmentList, setassignmentList] = useState(null)
    const getAllAssignment = async () => {
        try {
            const res = await axios.post('/student/get-an-Assignment', { courseId : id, studentId:user?._id });
            if (res.data.success) {
                console.log(res.data); 
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

    const [file, setFile] = useState(null);
    const [text, setText] = useState('')

    const handleSubmit=async ()=>{

      if(!text){
        toast('Description field is empty!');
        return;
      }
    const formData = new FormData(); 
    formData.append('id', assignmentList?._id);
    formData.append('file', file);
    formData.append('sId', user?._id);
    formData.append('text', text);

    try {
        const res = await axios.post('/student/submit-assignment', formData);
  
        if (res.data.success) {
          toast.success('ASsignment submitted successfully!'); 
          setFile(null); 
          nav('/dashboard-student')
          
        } else {
          toast.error('Failed to post ASsignment. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error(
          error.response?.data?.message ||
            error.message ||
            'Failed to post ASsignment. Please try again.'
        ); // Display more specific error messages
      }
        
    }
  return (
    <div className={style.materialPage}>
            <div className={style.materialTop}>
                <h1>Assignment </h1>
            </div>
            <div className={style.announcementBody}>
                {assignmentList === null && <p>Currently there are no new Assignmetns posted</p>}
                {assignmentList && <AssignmentList assignmentList={assignmentList}/>}
                {assignmentList !== null && 
                <div  className={style.submitt}>
                <h2>Submit Assignment</h2>
                <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} /> 
                <br/>
                <textarea  placeholder='Enter the description/Ansewr' type='text' onChange={(e) => setText(e.target.value)} value={text}  />
                <button onClick={handleSubmit} >Submit</button>
                </div>}
                
            </div>
        </div>
  )
}

export default AssignmentStudentScreen 