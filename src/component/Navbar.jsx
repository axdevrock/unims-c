import { useUserContext } from '../../context/userContext';
import style from './component.module.css';
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
    const { user } = useUserContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        location.reload()
        navigate('/');
    };

    const navigationLinks = {
        admin: [
            { title: 'Dashboard', path: '/dashboard-admin' },
            { title: 'Register', path: '/admin/register' },
            { title: 'Logout', path: '/', onClick: handleLogout }
        ],
        student: [
            { title: 'Dashboard', path: '/dashboard-student' },
            { title: 'All course', path: '/student/course' }, 
            { title: 'Chat/group discussion', path: '/discussion' },
            { title: 'Logout', path: '/', onClick: handleLogout }
        ],
        faculty: [
            { title: 'Dashboard', path: '/dashboard-faculty' },
            { title: 'Create Course', path: '/create-course' },
            { title: 'Discussion', path: '/discussion' },
            { title: 'Register', path: '/register-student' }, 
            { title: 'Logout', path: '/', onClick: handleLogout }
        ]
    };

    const userRole = user?.role || ''; // Ensure user role is defined
    

    return (
        <>
        {userRole ? (<nav className={style.navbar}>
            <h1>Hello  {user?.role}  {user?.name}</h1>
            <ul>
                {navigationLinks[userRole]?.map((link, index) => (
                    <li key={index}>
                        <NavLink to={link.path} activeClassName="active" onClick={link.onClick}>
                            {link.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>) :(<></>)}
   </> );
};

export default Navbar;
