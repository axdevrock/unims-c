/* eslint-disable react/prop-types */
import{ useState } from 'react';
import style from './post.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Announcement = ({ open, setopen,id }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!title || !description ) {
      toast.error('Please fill in all fields.');
      return;
    }

    
    try {
      const res = await axios.post('/professor/post-announcement', {
        title, description,courseId:id
      });

      if (res.data.success) {
        toast.success('Announcement posted successfully!');
        setTitle('');
        setDescription('');setopen(false)
      } else {
        toast.error('Failed to post announcement. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Failed to post announcement. Please try again.'
      ); // Display more specific error messages
    }
  };

  return (
    <>
      {open && (
        <div className={style.announcementPost}>
          <div className={style.body}>
            <div className={style.top}>
              <h1>Announcement</h1>
              <h1 onClick={() => setopen(false)}>close</h1>
            </div>
            <form>
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <br />
              <label htmlFor="description">Description:</label>
              <textarea type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
              <br />
              <button onClick={handleSubmit}>Create Announcement</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Announcement;
