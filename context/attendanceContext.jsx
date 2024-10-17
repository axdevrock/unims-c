/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useContext, useState } from 'react';

const AttendanceContext = createContext();

const AttendanceProvider = ({ children }) => {
    const [attendance, setAttendance] = useState(false);

    return (
        <AttendanceContext.Provider value={{ attendance, setAttendance }}>
            {children}
        </AttendanceContext.Provider>
    );
};

const useAttendanceContext = () => {
    return useContext(AttendanceContext);
};

export { AttendanceProvider, useAttendanceContext };
