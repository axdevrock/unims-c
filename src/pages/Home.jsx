import img1 from '../assets/homeimg.svg'
import styles from '../styles/home.module.css'
import LoginComponent from "../component/LoginComponent"
const Home = () => {
    return (
        <div className={styles.homeContainer} >
        <div className={styles.homeImage} >
            <img src={img1} alt="banner"/>
        </div>
        <div className={styles.homeContent} >
        <h1>Welcome to the CMS</h1>
        <LoginComponent/>
            
        </div>
       
    </div>
    )
    
}

export default Home
