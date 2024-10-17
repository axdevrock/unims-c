/* eslint-disable react/prop-types */
import{ useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import style from './post.module.css';

const Material = ({ open, setopen,id }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission

    if (!title || !description || !file) {
      toast.error('Please fill in all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('courseId', id);
    formData.append('file', file);

    try {
      const res = await axios.post('/professor/post-material', formData);

      if (res.data.success) {
        toast.success('Material posted successfully!');
        setTitle('');
        setDescription('');
        setFile(null); // Clear form fields
        setopen(false)
      } else {
        toast.error('Failed to post Material. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Failed to post Material. Please try again.'
      ); // Display more specific error messages
    }
  };

  return (
    <>
      {open && (
        <div className={style.announcementPost}>
          <div className={style.body}>
            <div className={style.top}>
              <h1>Material</h1>
              <h1 onClick={() => setopen(false)}>close</h1>
            </div>
            <form>
              <label htmlFor="title">Title :</label>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <br />
              <label htmlFor="description">Description:</label>
              <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
              <br />
              <label htmlFor="file">File:</label>
              <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
              <br />
              <p>A single file allowed per post</p>
              <button onClick={handleSubmit}>Create</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Material;
