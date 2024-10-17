import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Chat = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const isStudent = localStorage.getItem('student');
    const [discussionList, setdiscussionList] = useState([])
    
    const [student, setStudent] = useState(null);
    useEffect(() => {
        const storedStudent = isStudent ? localStorage.getItem('student') :localStorage.getItem('professor')  ;
        if (storedStudent) {
            const parsedStudent = JSON.parse(storedStudent);
            setStudent(parsedStudent);
        }
    }, []);

    useEffect(() => {
        const fetchDiscussions = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/v1/student/discussions');
                if (res.data.success) {
                    toast.success(res.data.message);
                    setdiscussionList(res.data.discussions);
                } else {
                    toast.error("Failed to fetch discussions. Please try again.");
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error("Failed to fetch discussions. Please try again.");
            }
        };

        fetchDiscussions();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const author = student?.user?._id;
        if(!title || !body){
            toast("Enter all the fields !");
            return
        }

        try {
            const res = await axios.post('http://localhost:8000/api/v1/student/discussions', {
                title,
                text:body,
                author
            });
            if (res.data.success) {
                toast("Discussion created successfully!");
                console.log(res.data.discussion);
                // Update the discussion list or perform any other action as needed
            } else {
                toast.error("Failed to create discussion. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to create discussion. Please try again.");
        }
    }

    return (
        <>
        <div className="discussion" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h3>Create a Group discussion </h3>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <input
                    type='text'
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
                />
                <textarea
                    placeholder='Body'
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    style={{ width: '100%', minHeight: '100px', marginBottom: '10px', padding: '5px' }}
                />
                <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>Submit</button>
            </form>
            <div className='discussion-body' style={{ padding: '20px' }}>
            <h1 style={{ marginBottom: '20px' }}>All Discussions</h1>
            <div>
                {discussionList.map((topic) => (
                    <Link to={`/chat/${topic._id}`} key={topic._id} style={{ display: 'block', marginBottom: '10px', textDecoration: 'none', color: '#000', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
                        <h3>{topic.title}</h3>
                    </Link>
                ))}
            </div>
        </div>
        </div>
    </>);
}

export default Chat;
