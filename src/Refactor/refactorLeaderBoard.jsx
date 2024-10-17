/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import {useEffect, useState} from "react";

const LeaderBoardAttendance = ({courseId}) => {
    const [leaderBoard,
        setLeaderBoard] = useState([]);

    useEffect(() => {
        const fetchAttendance = async() => {
            try {
                const {data} = await axios.get(`/attendance/lb/${courseId}`);
                if (data.success) {
                    setLeaderBoard(data.data);
                } else {
                    console.log('Failed to load leaderboard');
                }
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
            }
        };
        fetchAttendance();
    }, [courseId]);

    return (
        <div className="leaderboard-container p-4 bg-slate-100 rounded-md">
            {leaderBoard.length
                ? (
                    <div className="grid grid-cols-3 justify-center items-center gap-8 text-center">
                        {leaderBoard.map((student, index) => (<LabelLeader key={index} index={index} data={student}/>))}
                    </div>

                )
                : (
                    <p>No attendance data available.</p>
                )}
        </div>
    );
}
 
function LabelLeader({ data, index }) { 
  const backgroundColor =
    index === 0 ? 'bg-[gold]' : index === 1 ? 'bg-[silver]' : index === 2 ? 'bg-slate-400' : 'bg-slate-400';

  return (
    <div className={`flex rounded-md hover:shadow-lg p-3 flex-col gap-8 ${backgroundColor}`}>
      <p className="text-6xl font-light">{index + 1}</p>
      <div className="flex flex-col gap-4">
        <p><strong>{data.name}</strong></p>
        <p>{data.attendanceCount} attendances</p>
      </div>
    </div>
  );
}


export const LeaderBoardAssignment=({courseId})=>{

  const [leaderBoard,
    setLeaderBoard] = useState([]);

useEffect(() => {
    const fetchAttendance = async() => {
        try {
            const {data} = await axios.get(`/attendance/lbt/${courseId}`);
            if (data.success) {
                setLeaderBoard(data.data);
            } else {
                console.log('Failed to load test score');
            }
        } catch (error) {
            console.error("Error fetching  test score:", error);
        }
    };
    fetchAttendance();
}, [courseId]);
  return(
    <div className="leaderboard-container p-4 bg-slate-100 rounded-md">
 {leaderBoard.length
                ? (
                    <div className="grid grid-cols-3 justify-center items-center gap-8 text-center">
                        {leaderBoard.map((student, index) => (<LabelLeaderTestScore key={index} index={index} data={student}/>))}
                    </div>

                )
                : (
                    <p>No attendance data available.</p>
                )}
    </div>
  )
}

function LabelLeaderTestScore({ data, index }) { 
  const backgroundColor =
    index === 0 ? 'bg-[gold]' : index === 1 ? 'bg-[silver]' : index === 2 ? 'bg-slate-400' : 'bg-slate-400';

  return (
    <div className={`flex rounded-md hover:shadow-lg p-3 flex-col gap-8 ${backgroundColor}`}>
      <p className="text-6xl font-light">{index + 1}</p>
      <div className="flex flex-col">
        <p><strong>{data.name}</strong></p>
        <p><>{data.email}</></p>
        <p>Total Score : {data.totalScore} </p>
      </div>
    </div>
  );
}

export const LeaderBoardScore=({courseId})=>{

  const [leaderBoard,
    setLeaderBoard] = useState([]);

useEffect(() => {
    const fetchAttendance = async() => {
        try {
            const {data} = await axios.get(`/attendance/lba/${courseId}`);
            if (data.success) {
                setLeaderBoard(data.data);
            } else {
                console.log('Failed to load test score');
            }
        } catch (error) {
            console.error("Error fetching  test score:", error);
        }
    };
    fetchAttendance();
}, [courseId]);
  return(
    <div className="leaderboard-container p-4 bg-slate-100 rounded-md">
 {leaderBoard.length
                ? (
                    <div className="grid grid-cols-3 justify-center items-center gap-8 text-center">
                        {leaderBoard.map((student, index) => (<LabelLeaderAssignmetnScore key={index} index={index} data={student}/>))}
                    </div>

                )
                : (
                    <p>No Assignment Score data available.</p>
                )}
    </div>
  )
}

function LabelLeaderAssignmetnScore({ data, index }) { 
  const backgroundColor =
    index === 0 ? 'bg-[gold]' : index === 1 ? 'bg-[silver]' : index === 2 ? 'bg-slate-400' : 'bg-slate-400';

  return (
    <div className={`flex rounded-md hover:shadow-lg p-3 flex-col gap-8 ${backgroundColor}`}>
      <p className="text-6xl font-extralight">{index + 1}</p>
      <div className="flex flex-col">
        <p><strong>{data.name}</strong></p>
        <p><>{data.email}</></p>
        <p>Total Marks : {data.totalMarks} </p>
      </div>
    </div>
  );
}
export default LeaderBoardAttendance;
 

 