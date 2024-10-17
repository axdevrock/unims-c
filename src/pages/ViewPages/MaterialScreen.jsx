import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import style from './viewpages.module.css'
const MaterialScreen = () => {
  const {id} = useParams()

  const [materialSingle, setmaterialSingle] = useState(null)
  const getSingleMaterial = async () => {
      try {
          const res = await axios.post('/professor/get-single-material', { id : id });
          if (res.data.success) {
              toast("Materialal single fetched successfully!");
              setmaterialSingle(res.data.material);
          } else {
              toast.error("Failed to fetch Materialal. Please try again.");
          }
      } catch (error) {
          console.error("Error:", error);
          toast.error("Failed to fetch Materialal. Please try again.");
      }
  };
  
  
    useEffect(() => {
    
          getSingleMaterial()
  }, [])
  
  ; 
  const URL = import.meta.env.VITE_URL;
 const srx = `${URL}/${materialSingle?.fileUrl}`


  

    
  return (
    <div className={style.materialContainer}>
    <h1>Material Details</h1>
    {/* <p>{JSON.stringify(materialSingle)}</p> */}
    <div className={style.top}>
        <p>Title : {materialSingle?.title}</p>
        <p><b>Description : </b> {materialSingle?.description}</p>
        
  <iframe src={srx} height='600px' width='100%'></iframe>

    </div>
    
     </div>
  )
}

export default MaterialScreen