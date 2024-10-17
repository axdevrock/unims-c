/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Material from "./POST/Material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import style from './POST/course.module.css';

const MaterialList = ({ materialList, courseId, is }) => {
    const handleDeleteMaterial = async (id) => {
        try {
            const res = await axios.post('/professor/delete-material', { id });
            if (res.data.success) {
                toast("Material deleted successfully!");
                // Update materialList state to reflect deletion
            } else {
                toast.error("Failed to delete material. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to delete material. Please try again.", error.message);
        }
    };

    return (
        <div className={style.materialDisplay}>
            {materialList?.map((material, index) => (
                <div className={style.materials} key={index}>
                    <div className={style.materialsLeft}>
                        <h5>Title: {material.title}</h5>
                        <p><b>Description:</b> {material.description}</p>
                    </div>
                    <div className={style.materialsRight}>
                       {is &&  <p onClick={() => handleDeleteMaterial(material._id)}>Delete material</p>}
                        <Link key={courseId}
                            to={`/material/${material?._id}`}
                        >
                            View material
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

const MaterialPage = ({is}) => {
    const [open, setOpen] = useState(false);
    const { id } = useParams();
    const [materialList, setMaterialList] = useState([]);

    const getAllMaterials = async () => {
        try {
            const res = await axios.post('/professor/get-material', { courseId: id });
            if (res.data.success) {
                setMaterialList(res.data.materials);
            } else {
                toast.error("Failed to fetch materials. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to fetch materials. Please try again.");
        }
    };

    useEffect(() => {
        getAllMaterials();
    }, []);

    return (
        <div className={style.materialPage}>
            <div className={style.materialTop}>
                <h1>Class Materials</h1>
                {is && <h1 onClick={() => setOpen(true)}>Post Materials</h1>}
            </div>
            <div className={style.announcementBody}>
                {materialList?.length === 0 && <p>Currently there are no materials posted</p>}
                <Material open={open} id={id} setopen={setOpen} />
                <MaterialList materialList={materialList} is={is} courseId={id} />
            </div>
        </div>
    );
};

export default MaterialPage;
