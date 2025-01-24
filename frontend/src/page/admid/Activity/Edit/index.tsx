import React, { useState, useEffect } from "react";
import SideBar from "../../../../component/employee/cruiseTrip/SideBar";
import { FaRegSave } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import imageCompression from "browser-image-compression";
import { ActivityInterface } from "../../../../interfaces/IActivity";
import { GetActivitys, UpdateActivity } from "../../../../service/https/activity";
import ActivityForm from "../../../../component/employee/activity/CreateActivity/ActivityForm";
import Dropzone from "../../../../component/employee/activity/Dropzone";
import Navbar from "../../../../component/employee/cruiseTrip/Navbar";
import ConfirmModal from "../../../../component/employee/activity/CreateActivity/ConfirmModal";
import NavbarAdmin from "../../../../component/employee/admin_navbar";

const ActivityUpdate: React.FC = () => {
    const [activityName, setActivityName] = useState<string>("");
    const [ActivityImg, setActivityImg] = useState<File | null>(null);
    const [activityImgURL, setActivityImgURL] = useState<string>("");
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // ดึง ID จาก URL

    // โหลดข้อมูลกิจกรรมเดิม
    const fetchActivity = async () => {
        try {
            const res = await GetActivitys();
            if (res) {
                setActivityName(res.Name || "");
                setActivityImgURL(res.ActivityImg || "");
            }
        } catch (error) {
            console.error("Failed to fetch activity:", error);
            toast.error("Failed to load activity data.");
        }
    };

    useEffect(() => {
        if (id) {
            fetchActivity();
        }
    }, [id]);

    const handleSave = async () => {
        setConfirmLoading(true);
        const errors: string[] = [];

        if (!activityName) errors.push("Please enter the activity name.");
        if (!ActivityImg && !activityImgURL) errors.push("Please upload a activity picture.");

        if (errors.length > 0) {
            errors.forEach((error, index) => {
                setTimeout(() => {
                    toast.error(error);
                }, index * 1000);
            });
            setConfirmLoading(false);
            return;
        }

        try {
            const updatedActivity: ActivityInterface = {
                ID: Number(id), // ใช้ ID เดิม
                Name: activityName,
                ActivityImg: ActivityImg ? await getBase64(ActivityImg) : activityImgURL,
            };

            const res = await UpdateActivity(updatedActivity);
            if (res) {
                setTimeout(() => {
                    toast.success("Activity updated successfully!");
                }, 1000);
                navigate("/activity");
            } else {
                toast.error("Failed to update activity.");
            }
        } catch (error) {
            console.error("Error updating activity:", error);
            toast.error("Failed to update activity.");
        } finally {
            setConfirmLoading(false);
            setModalVisible(false);
        }
    };

    const showConfirmModal = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleDrop = async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const options = {
                maxSizeMB: 0.9,
                maxWidthOrHeight: 1024,
                useWebWorker: true,
            };
            try {
                const compressedFile = await imageCompression(file, options);
                setActivityImg(compressedFile);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setActivityImgURL(reader.result as string);
                };
                reader.readAsDataURL(compressedFile);
            } catch (error) {
                console.error("Error compressing file:", error);
            }
        }
    };

    const getBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    return (
        <div className="flex">
            <div className="bg-white w-full">
                <NavbarAdmin />
                <div>
                    <div className="navbar bg-white h-[76px] flex items-center">
                        <h1 className="text-3xl text-black ml-14 mt-2">แก้ไขกิจกรรม</h1>
                        <button
                            className="text-white font-sans font-medium text-m px-5 py-3 flex items-center bg-gray rounded-full hover:bg-green ml-auto mr-14 shadow-md hover:shadow-lg"
                            onClick={showConfirmModal}
                        >
                            <FaRegSave className="w-[24px] h-auto cursor-pointer text-green mr-2" />
                            <span>Save</span>
                        </button>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center">
                    <div className="bg-gray mt-5 w-[1000px] h-[480px] rounded-3xl overflow-auto scrollable-div flex justify-center">
                        <div className="flex flex-row items-start m-8">
                            <Dropzone onDrop={handleDrop} activityPicURL={activityImgURL} />
                            <ActivityForm
                                activityName={activityName}
                                setActivityName={setActivityName}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmModal visible={modalVisible} onOk={handleSave} onCancel={handleCancel} confirmLoading={confirmLoading} />
            <Toaster />
        </div>
    );
};

export default ActivityUpdate;
