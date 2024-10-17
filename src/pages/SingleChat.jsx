import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../student/Discussion.css';

const SingleChat = () => {
    const { id } = useParams();
    const [discussion, setDiscussion] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const storedStudent = localStorage.getItem('student');
        if (storedStudent) {
            const parsedStudent = JSON.parse(storedStudent);
            setStudent(parsedStudent);
        }
    }, []);

    useEffect(() => {
        const fetchDiscussion = async () => {
            try {
                const res = await axios.post('http://localhost:8000/api/v1/student/discussions/single', { id });
                if (res.data.success) {
                    setDiscussion(res.data.discussion);
                    toast(res.data.message);
                } else {
                    console.error('Failed to fetch discussion:', res.data.message);
                    toast.error('Failed to fetch discussion. Please try again.');
                }
            } catch (error) {
                console.error('Error fetching discussion:', error);
                toast.error('Error fetching discussion. Please try again.');
            }
        };
        fetchDiscussion();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const author = student?.user?._id;
        if (!replyText.trim()) {
            toast.error('Reply text is required.');
            return;
        }

        try {
            const res = await axios.post('http://localhost:8000/api/v1/student/reply', {
                id: discussion._id,
                text: replyText,
                author
            });
            if (res.data.success) {
                toast.success(res.data.message);
                setReplyText(''); // Clear reply text after successful submission
                setDiscussion(res.data.discussion); // Update discussion with the new reply
            } else {
                toast.error('Failed to post reply. Please try again.');
            }
        } catch (error) {
            console.error('Error posting reply:', error);
            toast.error('Failed to post reply. Please try again.');
        }
    };

    return (
        <div className="discussion-container">
            <div className="discussion-output">
                <h2>{discussion?.title}</h2>
                <p>{discussion?.text}</p>
                <p>Author: {discussion?.author?.name}</p>
                <p>Created at: {discussion?.createdAt}</p>
            </div>
            <div className="reply-container">
                <h2>Replies</h2>
                {discussion?.replies?.length === 0 && <p>No replies yet.</p>}
                {discussion?.replies?.map((reply) => (
                    <div key={reply._id} className="reply-item">
                        <p>{reply.text}</p>
                        <p>Author: {reply.author?.name}</p>
                        <p>Created at: {reply.createdAt}</p>
                    </div>
                ))}
            </div>
            <div className="reply-form">
                <h2>Post a Reply</h2>
                <form onSubmit={handleSubmit}>
                    <textarea
                        placeholder="Type your reply here..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        required
                    ></textarea>
                    <button type="submit">Reply</button>
                </form>
            </div>
        </div>
    );
};

export default SingleChat;



