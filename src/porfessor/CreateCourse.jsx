import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useUserContext } from '../../context/userContext';
import styles from './professor.module.css';

const CreateCourse = () => {
    const [courseName, setCourseName] = useState('');
    const [description, setDescription] = useState('');
    const [courseDepartment, setCourseDepartment] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const navigate = useNavigate();
    const { user } = useUserContext();

    const handleSubmit = async () => {
        try {
            const res = await axios.post('/professor/create', {
                title: courseName,
                description,
                courseDepartment,
                courseCode,
                instructor: user?._id
            });

            if (res.data.success) {
                toast.success(`Professor ${user?.name}, course created successfully.`);
                clearForm();
                navigate('/dashboard-faculty');
            } else {
                toast.error("Failed to create course.");
            }
        } catch (error) {
            console.error("error", error);
            toast.error("Course creation failed. ERROR 404.");
        }
    };

    const clearForm = () => {
        setCourseName('');
        setDescription('');
        setCourseDepartment('');
        setCourseCode('');
    };

    return (
        <div className={styles.professorCreateCourse}>
        <div className={styles.createCourseForm}>
            <h1>Create a Course</h1>
            <div className={styles.formGroup}>
                <label>Course Name:</label>
                <input type='text' value={courseName} onChange={(e) => setCourseName(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
                <label>Description:</label>
                <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
                <label>Course Code:</label>
                <input type='text' value={courseCode} onChange={(e) => setCourseCode(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
                <label>Department:</label>
                <input type='text' value={courseDepartment} onChange={(e) => setCourseDepartment(e.target.value)} />
            </div>
            <button className={styles.createButton} onClick={handleSubmit}>Create</button>
        </div></div>
    );
}

export default CreateCourse;
