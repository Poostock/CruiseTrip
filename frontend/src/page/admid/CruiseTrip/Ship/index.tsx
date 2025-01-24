import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { GrAddCircle } from "react-icons/gr";
import toast, { Toaster } from "react-hot-toast";
import SideBar from "../../../../component/employee/cruiseTrip/SideBar";
import Navbar from "../../../../component/employee/cruiseTrip/Navbar";
import { ShipInterface } from "../../../../interfaces/IShip";
import { DeleteShipsByID, GetShips, UpdateShip, CreateShip } from "../../../../service/https/cruiseTrip/ship";
import NavbarAdmin from "../../../../component/employee/admin_navbar";

const Ship: React.FC = () => {
    const [ships, setShips] = useState<ShipInterface[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"create" | "edit" | null>(null); // รองรับ null
    const [selectedShip, setSelectedShip] = useState<ShipInterface | null>(null);
    const [form] = Form.useForm();

    const fetchShips = async () => {
        try {
            const res = await GetShips();
            setShips(res);
        } catch (error) {
            console.error("Failed to fetch ships", error);
        }
    };

    const handleCreate = () => {
        setModalType("create"); // เปลี่ยนสถานะเป็น create
        setSelectedShip(null);
        setIsModalOpen(true);
        form.resetFields(); // ล้างข้อมูลในฟอร์ม
    };

    const handleEdit = (ship: ShipInterface) => {
        setModalType("edit"); // เปลี่ยนสถานะเป็น edit
        setSelectedShip(ship);
        setIsModalOpen(true);
        form.setFieldsValue({
            Name: ship.Name,
        });
    };

    const handleDelete = async (ship: ShipInterface) => {
        try {
            await DeleteShipsByID(ship.ID);
            toast.success(`Ship "${ship.Name}" has been deleted.`);
            fetchShips();
        } catch (error) {
            toast.error("Failed to delete ship.");
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setModalType(null); // ตั้งค่า modalType กลับเป็น null
        setSelectedShip(null);
    };

    // ฟังก์ชันสำหรับ handleSubmit จะเหมือนเดิม
    const handleSubmit = async (values: any) => {
        try {
            if (modalType === "create") {
                await CreateShip({ Name: values.Name });
                toast.success("เรือถูกสร้างเรียบร้อยแล้ว");
            } else if (modalType === "edit" && selectedShip) {
                await UpdateShip({ ...selectedShip, Name: values.Name });
                toast.success("เรือถูกแก้ไขเรียบร้อยแล้ว");
            }
            fetchShips();
            handleModalClose();
        } catch (error) {
            console.error(error);
            toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        }
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "ID",
            key: "ID",
        },
        {
            title: "ชื่อเรือ",
            dataIndex: "Name",
            key: "Name",
        },
        {
            title: "การจัดการ",
            key: "actions",
            render: (text: string, record: ShipInterface) => (
                <>
                    <Button type="link" onClick={() => handleEdit(record)}>
                        แก้ไข
                    </Button>
                    <Button type="link" danger onClick={() => handleDelete(record)}>
                        ลบ
                    </Button>
                </>
            ),
        },
    ];

    useEffect(() => {
        fetchShips();
    }, []);

    return (
        <div className="flex flex-col md:flex-row">
            <div className="bg-white w-full">
                <NavbarAdmin />
                <div className="navbar bg-forth h-[76px] flex items-center">
                    <div className="ml-auto mr-4 md:mr-14 mt-2">
                        <Button
                            className="text-white font-sans font-medium text-m px-5 py-3 flex items-center bg-gray rounded-full hover:bg-green shadow-md hover:shadow-lg"
                            icon={<GrAddCircle />}
                            onClick={handleCreate}
                        >
                            สร้างเรือใหม่
                        </Button>
                    </div>
                </div>
                <div className="p-6">
                    <Table
                        columns={columns}
                        dataSource={ships}
                        rowKey="ID"
                        pagination={{ pageSize: 5 }}
                    />
                </div>
                <Modal
                    title={modalType === "create" ? "สร้างชื่อเรือใหม่" : `แก้ไขชื่อเรือ: ${selectedShip?.Name}`}
                    visible={isModalOpen}
                    onCancel={handleModalClose}
                    footer={null}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            label="ชื่อเรือ"
                            name="Name"
                            rules={[{ required: true, message: "กรุณากรอกชื่อเรือ" }]}
                        >
                            <Input placeholder="กรอกชื่อเรือ" />
                        </Form.Item>
                        <div className="flex justify-end">
                            <Button onClick={handleModalClose} style={{ marginRight: 8 }}>
                                ยกเลิก
                            </Button>
                            <Button type="primary" htmlType="submit">
                                {modalType === "create" ? "สร้าง" : "บันทึกการแก้ไข"}
                            </Button>
                        </div>
                    </Form>
                </Modal>
                <Toaster />
            </div>
        </div>
    );
};

export default Ship;
