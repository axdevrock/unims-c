import { Link } from 'react-router-dom'
// import { useUserContext } from '../../../context/userContext'
import styles from '../admin/admin.module.css'
const Dashboard = () => {
    // const {user} = useUserContext()/
  return (
    <div className={styles.dashboardContianer}>
    <h1>Visit List of All Students</h1>
    <Link to='/admin/students'>List of Students</Link>
    <h1>Visit List of All faculty</h1>
    <Link to='/admin/facultys'>List of faculty</Link>
    </div>
  )
}

export default Dashboard