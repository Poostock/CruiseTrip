import React, { useState, useEffect } from "react";
import Navbar from "../../../../component/admin/class/Navbar";
import SideBar from "../../../../component/admin/class/SideBar";
import Dropzone from "../../../../component/admin/class/Dropzone";
import ConfirmModal from "../../../../component/admin/class/CreateCruiseTrip/ConfirmModal";
import { FaRegSave } from "react-icons/fa";
import { RouteInterface } from "../../../../interfaces/IRoute";
import { ShipInterface } from "../../../../interfaces/IShip";
import { CruiseTripInterface } from "../../../../interfaces/ICruiseTrip";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { CreateCruiseTrip } from "../../../../service/https/cruiseTrip";
import { GetShips } from "../../../../service/https/cruiseTrip/ship";
import { GetTrainers } from "../../../../service/https/cruiseTrip/trainer";
import imageCompression from "browser-image-compression";
import CruiseTripForm from "../../../../component/admin/class/CreateCruiseTrip/CruiseTripForm";

const ClassCreate: React.FC = () => {
    const [className, setClassName] = useState<string>("");
    const [selectedTrainer, setSelectedTrainer] = useState<number | undefined>(1);
    const [selectedType, setSelectedType] = useState<number | undefined>(1);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [description, setDescription] = useState<string>("");
    const [classPic, setClassPic] = useState<File | null>(null);
    const [classPicURL, setClassPicURL] = useState<string>("");
    const [particNum, setParticNum] = useState<number | undefined>(undefined);
    const [trainers, setTrainers] = useState<RouteInterface[]>([]);
    const [classTypes, setClassTypes] = useState<ShipInterface[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const fetchShips = async () => {
        try {
            const res = await GetShips();
            if (res) {
                setClassTypes(res);
            } else {
                console.error("Failed to fetch class types");
            }
        } catch (error) {
            console.error("Failed to fetch ClassTypes", error);
        }
    };

    const fetchTrainers = async () => {
        try {
            const res = await GetTrainers();
            if (res) {
                setTrainers(res);
            } else {
                console.error("Failed to fetch trainers");
            }
        } catch (error) {
            console.error("Failed to fetch Trainers", error);
        }
    };

    const handleSave = async () => {
        setConfirmLoading(true);
        const errors: string[] = [];

        if (!className) errors.push("Please enter the class name.");
        if (!classPic) errors.push("Please upload a class picture.");
        if (!selectedType) errors.push("Please select a class type.");
        if (!description) errors.push("Please enter a description.");
        if (!selectedTrainer) errors.push("Please select a trainer.");
        if (!startDate) errors.push("Please select a start date.");
        if (!endDate) errors.push("Please select an end date.");
        if (particNum === undefined) errors.push("Please enter the number of attendees.");

        if (startDate && endDate) {
            const startDay = startDate.getDate();
            const startMonth = startDate.getMonth();
            const startYear = startDate.getFullYear();

            const endDay = endDate.getDate();
            const endMonth = endDate.getMonth();
            const endYear = endDate.getFullYear();

            if (startDay !== endDay || startMonth !== endMonth || startYear !== endYear) {
                errors.push("Start date and end date must be on the same day.");
            } else {
                const startTime = startDate.getTime();
                const endTime = endDate.getTime();

                if (startTime >= endTime) {
                    errors.push("Start time must be earlier than end time.");
                }
            }
        }

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
            const adminID = localStorage.getItem("id");
            const adminIDNumber = adminID ? Number(adminID) : 1;
            const newClass: CruiseTripInterface = {
                CruiseTripName: className,
                Deets: description,
                TrainerID: selectedTrainer,
                ClassPic: classPic ? await getBase64(classPic) : classPicURL,
                ParticNum: particNum,
                StartDate: startDate ? new Date(startDate) : undefined,
                EndDate: endDate ? new Date(endDate) : undefined,
                ClassTypeID: selectedType,
                AdminID: adminIDNumber,
            };

            console.log("Creating class with data:", newClass);

            const res = await CreateCruiseTrip(newClass);
            if (res) {
                setTimeout(() => {
                    toast.success("Class created successfully!");
                }, 1000);
                navigate("/class");
            } else {
                toast.error("Failed to create class.");
            }
        } catch (error) {
            console.error("Error creating class:", error);
            toast.error("Failed to create class.");
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
                setClassPic(compressedFile);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setClassPicURL(reader.result as string);
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

    useEffect(() => {
        fetchShips();
        fetchTrainers();
    }, []);

    useEffect(() => {
        if (trainers.length > 0) {
            if (selectedTrainer === undefined) {
                setSelectedTrainer(trainers[0].ID);
            }
        }
    }, [trainers, selectedTrainer]);

    useEffect(() => {
        if (classTypes.length > 0) {
            if (selectedType === undefined) {
                setSelectedType(classTypes[0].ID);
            }
        }
    }, [classTypes, selectedType]);

    return (
        <div className="flex">
            <SideBar />
            <div className="bg-white w-full">
                <Navbar title="Class" />
                <div>
                    <div className="navbar bg-white h-[76px] flex items-center">
                        <h1 className="text-3xl text-black ml-14 mt-2">สร้างทริป</h1>
                        <button
                            className="text-white font-sans font-medium text-m px-5 py-3 flex items-center bg-gray rounded-full hover:bg-green5 ml-auto mr-14 shadow-md hover:shadow-lg"
                            onClick={showConfirmModal}
                        >
                            <FaRegSave className="w-[24px] h-auto cursor-pointer text-green1 mr-2" />
                            <span>Save</span>
                        </button>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center">
                    <div className="bg-gray4 mt-5 w-[1000px] h-[480px] rounded-3xl overflow-auto scrollable-div flex justify-center">
                        <div className="flex flex-row items-start m-8">
                            <Dropzone onDrop={handleDrop} classPicURL={classPicURL} />
                            <CruiseTripForm
                                cruiseTripName={className}
                                setCruiseTripName={setClassName}
                                selectedShip={selectedType}
                                setSelectedShip={setSelectedType}
                                description={description}
                                setDescription={setDescription}
                                selectedRoute={selectedTrainer}
                                setSelectedRoute={setSelectedTrainer}
                                startDate={startDate}
                                setStartDate={setStartDate}
                                endDate={endDate}
                                setEndDate={setEndDate}
                                particNum={particNum}
                                setParticNum={setParticNum}
                                routes={trainers}
                                ships={classTypes}
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

export default ClassCreate;
