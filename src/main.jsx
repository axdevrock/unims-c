import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {UserProvider} from '../context/userContext.jsx'
import {AttendanceProvider} from '../context/attendanceContext.jsx'

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
        <AttendanceProvider>
            <UserProvider>
                <App/>
            </UserProvider>
        </AttendanceProvider>
    )
