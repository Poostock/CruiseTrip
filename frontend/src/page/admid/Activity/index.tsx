import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import SideBar from "../../../component/employee/cruiseTrip/SideBar";
import { Table, Button, Modal } from "antd";
import { DeleteActivitysByID, GetActivitys, UpdateActivity } from "../../../service/https/activity";
import { ActivityInterface } from "../../../interfaces/IActivity";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import NavbarAdmin from "../../../component/employee/admin_navbar";

const Activity: React.FC = () => {
    const [activitys, setActivitys] = useState<ActivityInterface[]>([]);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [activityToDelete, setActivityToDelete] = useState<ActivityInterface | null>(null);

    // Fetch activities
    const fetchActivitys = async () => {
        try {
            const res = await GetActivitys();
            if (res) setActivitys(res);
        } catch (error) {
            console.error("Failed to fetch activities", error);
        }
    };

    // Delete activity
    const handleDelete = async () => {
        if (activityToDelete) {
            try {
                await DeleteActivitysByID(activityToDelete.ID!);
                toast.success(`Activity "${activityToDelete.Name}" has been deleted.`);
                fetchActivitys();
            } catch (error) {
                toast.error("Failed to delete activity.");
            } finally {
                setDeleteModalVisible(false);
            }
        }
    };

    // Open delete modal
    const openDeleteModal = (activity: ActivityInterface) => {
        setActivityToDelete(activity);
        setDeleteModalVisible(true);
    };

    // Columns for Ant Design Table
    const columns = [
        {
            title: "ID",
            dataIndex: "ID",
            key: "ID",
            align: "center" as "center", // ใช้ "as" เพื่อบอก TypeScript ว่าค่านี้ถูกต้อง
        },
        {
            title: "Picture",
            dataIndex: "ActivityImg",
            key: "ActivityImg",
            align: "center" as "center",
            render: (image: string) =>
                image ? (
                    <img
                        src={image}
                        alt="Activity"
                        className="w-16 h-16 object-cover rounded-md"
                    />
                ) : (
                    <span className="text-gray-500">No Image</span>
                ),
        },
        {
            title: "Name",
            dataIndex: "Name",
            key: "Name",
            align: "left" as "left",
        },
        {
            title: "Actions",
            key: "actions",
            align: "center" as "center",
            render: (record: ActivityInterface) => (
                <div className="flex justify-center space-x-4">
                    <Button
                        type="link"
                        onClick={() => console.log("Edit activity", record)}
                    >
                        Edit
                    </Button>
                    <Button
                        type="link"
                        danger
                        onClick={() => openDeleteModal(record)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];
    

    useEffect(() => {
        fetchActivitys();
    }, []);

    return (
        <div className="flex flex-col md:flex-row">
            <div className="bg-white w-full">
                <NavbarAdmin />
                <div className="navbar bg-forth h-[76px] flex items-center">
                    <div className="ml-auto mr-4 md:mr-14 mt-2">
                        <Link to="/activity/create">
                            <button className="activity-button bg-highblue">
                                <FontAwesomeIcon icon={faPlus} className="icon "/>
                                <label>เพิ่มการจองกิจกรรม</label>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="p-6">
                    <Table
                        dataSource={activitys}
                        columns={columns}
                        rowKey="ID"
                        pagination={{ pageSize: 5 }}
                    />
                </div>
                <Modal
                    title="Confirm Delete"
                    visible={deleteModalVisible}
                    onOk={handleDelete}
                    onCancel={() => setDeleteModalVisible(false)}
                >
                    <p>
                        Are you sure you want to delete "{activityToDelete?.Name}"?
                    </p>
                </Modal>
                <Toaster />
            </div>
        </div>
    );
};

export default Activity;
