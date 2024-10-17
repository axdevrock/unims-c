import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import style from '../styles/discussion.module.css';
import { useUserContext } from '../../context/userContext';

const Discussion = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [discussionList, setDiscussionList] = useState([]);
    const { user } = useUserContext();

    useEffect(() => {
        const fetchDiscussions = async () => {
            try {
                const res = await axios.get('/student/discussions');
                if (res.data.success) {
                    toast.success(res.data.message);
                    setDiscussionList(res.data.discussions);
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
        if (!title || !body) {
            toast("Enter all the fields!");
            return;
        }

        try {
            const res = await axios.post('/student/discussions', {
                title,
                text: body,
                author: user?.name
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
    };

    return (
        <div className={style.discussionContainer}>
            <div className={style.discussionForm}>
                <h3>Create a Discussion</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={style.inputField}
                    />
                    <textarea
                        placeholder='Body'
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className={style.textArea}
                    />
                    <button type="submit" className={style.submitButton}>Submit</button>
                </form>
            </div>
            <div className={style.discussionList}>
                <h1>All Discussions</h1>
                {discussionList.map((topic) => (
                    <Link to={`/Discussion/${topic._id}`} key={topic._id} className={style.discussionLink}>
                        <h3>{topic.title}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Discussion;
