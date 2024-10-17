import RegisterComponent from '../component/RegisterComponent'
import styles from '../styles/page.module.css'
import img1 from '../assets/homeimg.svg'
const RegisterPage = () => {
  return (
    <div className={styles.registerContainer} >
    <div className={styles.homeImage} >
        <img src={img1} alt="banner"/>
    </div>
    <div className={styles.registerContent} >
    <h1>Welcome to the CMS</h1>
    <RegisterComponent/>
        
    </div>
   
</div>
  )
}

export default RegisterPage