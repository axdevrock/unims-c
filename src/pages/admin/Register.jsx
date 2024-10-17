import img1 from '../../assets/homeimg.svg'
import styles from '../../styles/home.module.css'
import RegisterComponent from '../../component/RegisterComponent'
const RegisterAdmin = () => {
    return (
        <div className={styles.homeContainer} >
        <div className={styles.homeImage} >
            <img src={img1} alt="banner"/>
        </div>
        <div className={styles.homeContent} >
        <h1>Welcome to the CMS</h1>
        <RegisterComponent/>
            
        </div>
       
    </div>
    )
    
}
export default RegisterAdmin