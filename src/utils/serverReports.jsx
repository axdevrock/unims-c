import axios from 'axios';

export const handleDownloadStudentList = async (courseId) => {
  try {
    const response = await axios.get(`/report/f/students/${courseId}`, {
      responseType: 'blob', // important for downloading binary files
    });
 

    // Create a blob URL and trigger the download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${courseId}-student-list.xlsx`); // file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);  
  } catch (error) {
    console.error('Error downloading the file:', error);
  }
};

export const handleDownloadAttendance = async (courseId) => {
    try {
      const response = await axios.get(`/report/f/attendances/${courseId}`, {
        responseType: 'blob',  
      });
  
      console.log(response);
      
  
      // Create a blob URL and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${courseId}-attendances-report.xlsx`);  
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);  
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };
  
  export const handleDownloadTestScore = async (courseId) => {
    try {
      const response = await axios.get(`/report/f/testscore/${courseId}`, {
        responseType: 'blob',  
      });
   
      
  
      // Create a blob URL and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${courseId}-Test and quizzes-report.xlsx`);  
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);  
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };


    
  export const handleDownloadAssignmentScore= async (courseId) => {
    try {
      const response = await axios.get(`/report/f/assignment/${courseId}`, {
        responseType: 'blob',  
      });
   
      
  
      // Create a blob URL and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${courseId}-assignment-report.xlsx`);  
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);  
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };