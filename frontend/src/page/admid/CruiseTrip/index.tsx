import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../../../component/employee/cruiseTrip/SideBar";
import Navbar from "../../../component/employee/cruiseTrip/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { Table, Button, Modal, Image } from "antd";
import { DeleteCruiseTripByID, GetCruiseTrips } from "../../../service/https/cruiseTrip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import NavbarAdmin from "../../../component/employee/admin_navbar";

const CruiseTrip: React.FC = () => {
    const [cruiseTrips, setCruiseTrips] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCruiseTrip, setSelectedCruiseTrip] = useState<any>(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCruiseTrips();
    }, []);

    const fetchCruiseTrips = async () => {
        try {
            const res = await GetCruiseTrips();
            setCruiseTrips(res);
        } catch (error) {
            console.error("Failed to fetch cruise trips", error);
        }
    };

    const handleEditClick = (id: number) => {
        navigate(`/cruiseTrip/edit/${id}`);
    };

    const handleDeleteClick = (cruiseTrip: any) => {
        setSelectedCruiseTrip(cruiseTrip);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await DeleteCruiseTripByID(selectedCruiseTrip.ID);
            toast.success(`Cruise trip "${selectedCruiseTrip.CruiseTripName}" has been deleted.`);
            setCruiseTrips(cruiseTrips.filter((item: any) => item.ID !== selectedCruiseTrip.ID));
        } catch (error) {
            toast.error("Failed to delete cruise trip.");
        }
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "ID",
            key: "ID",
        },
        {
            title: "Picture",
            dataIndex: "PlanImg",
            key: "PlanImg",
            render: (image: string) => (
                <Image
                    src={
                        image.startsWith("data:image/")
                            ? image
                            : `data:image/jpeg;base64,${image}`
                    }
                    alt="Cruise Trip"
                    width={100}
                    height={100}
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                />
            ),
        },
        {
            title: "Name",
            dataIndex: "CruiseTripName",
            key: "CruiseTripName",
        },
        {
            title: "Description",
            dataIndex: "Deets",
            key: "Deets",
        },
        {
            title: "StartDate-EndDate",
            render: (record: any) =>
                `${new Date(record.StartDate).toLocaleDateString()} - ${new Date(record.EndDate).toLocaleDateString()}`,
        },
        {
            title: "Route",
            dataIndex: ["Routes", "RouteName"],
            key: "Route",
        },
        {
            title: "Price",
            dataIndex: "PlanPrice",
            key: "PlanPrice",
            render: (price: number) => `${price.toLocaleString()} บาท`,
        },
        {
            title: "ParticNum",
            dataIndex: "ParticNum",
            key: "ParticNum",
        },
        {
            title: "Ship",
            dataIndex: ["Ship", "Name"],
            key: "Ship",
        },
        {
            title: "EmployeeID",
            dataIndex: "Employees",
            key: "Employees",
            render: (employees: any) => employees?.ID || 'ไม่มีข้อมูล',
        },        
        
        {
            title: "Action",
            key: "action",
            render: (record: any) => (
                <>
                    <Button type="link" onClick={() => handleEditClick(record.ID)}>
                        แก้ไข
                    </Button>
                    <Button type="link" danger onClick={() => handleDeleteClick(record)}>
                        ลบ
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div className="flex">
            <div className="bg-white w-full h-screen flex flex-col">
                <NavbarAdmin />
                <div className="navbar bg-white h-[76px] flex items-center">
                    <div className="ml-auto mr-14">
                        <Link to="/cruiseTrip/create">
                            <button className="activity-button bg-highblue">
                                <FontAwesomeIcon icon={faPlus} className="icon"/>
                                <label>เพิ่มการจองกิจกรรม</label>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex-grow p-6">
                    <Table
                        columns={columns}
                        dataSource={cruiseTrips}
                        rowKey="ID"
                        pagination={{ pageSize: 5 }}
                    />
                </div>
                <Modal
                    title="ยืนยันการลบ"
                    visible={isModalOpen}
                    onOk={confirmDelete}
                    onCancel={() => setIsModalOpen(false)}
                >
                    <p>
                        คุณต้องการลบทริปเรือ "
                        {selectedCruiseTrip?.CruiseTripName}" ใช่หรือไม่?
                    </p>
                </Modal>
                <Toaster />
            </div>
        </div>
    );
};

export default CruiseTrip;
