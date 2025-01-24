import React, { useEffect, useState } from "react";
import { Dropdown, Layout, Menu } from "antd";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom"; // เพิ่ม Outlet
import { UserOutlined } from "@ant-design/icons";
import "./index.css";
import NoPermission from "../../../unauthorized_access/NoPermission";
import cruise_ship_logo from "../../../assets/cruise_ship_logo.jpg";



const NavbarAdmin: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(
    localStorage.getItem("isAdminLogin") === "true"
  );
  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem("isAdminLogin") === "true";
      setIsAdminLoggedIn(loginStatus);
    };
    window.addEventListener("storage", checkLoginStatus);
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case "profile":
        console.log("Profile clicked");
        break;
      case "review":
        navigate("/customer/review");
        break;
      case "logout":
        setIsAdminLoggedIn(false);
        localStorage.setItem("isAdminLogin", "false");
        localStorage.removeItem("role");
        navigate("/home");
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" danger>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      {isAdminLoggedIn ? (
        <>
          <Layout.Header className="navbaradmin">
            <div className="navbaradmin-container">
              <div className="navbaradmin-logo">
                <img src={cruise_ship_logo} alt="Cruise Ship Logo" />
                <h1 className="navbaradmin-title">Cruise Ship Admin</h1>
              </div>
              <nav className="navbaradmin-menu">
                <Link to="/admin/promotion">
                  <button
                    className={`navbaradmin-button ${location.pathname.startsWith("/admin/promotion") ? "active" : ""
                      }`}
                  >
                    Promotion
                  </button>
                </Link>
                <Link to="/admin/employee">
                  <button
                    className={`navbaradmin-button ${location.pathname.startsWith("/admin/employee") ? "active" : ""
                      }`}
                  >
                    Employee
                  </button>
                </Link>
                <Link to="/admin/routeship">
                  <button
                    className={`navbaradmin-button ${location.pathname.startsWith("/admin/routeship") ? "active" : ""
                      }`}
                  >
                    Routeship
                  </button>
                </Link>
                <Link to="/admin/cruiseTrip">
                  <button
                    className={`navbaradmin-button ${location.pathname.startsWith("cruiseTrip") ? "active" : ""
                      }`}
                  >
                    Cruise Trip
                  </button>
                </Link>
                <Link to="/admin/activity">
                  <button
                    className={`navbaradmin-button ${location.pathname.startsWith("activity") ? "active" : ""
                      }`}
                  >
                    Activity
                  </button>
                </Link>
                <Link to="/admin/ship">
                  <button
                    className={`navbaradmin-button ${location.pathname.startsWith("ship") ? "active" : ""
                      }`}
                  >
                    Ship
                  </button>
                </Link>
              </nav>
              <div className="navbaradmin-actions">
                <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
                  <UserOutlined
                    className="navbaradmin-icon"
                    onClick={(e) => e.preventDefault()}
                    style={{ fontSize: "20px", cursor: "pointer" }}
                  />
                </Dropdown>
              </div>
            </div>
          </Layout.Header>
          {/* เพิ่ม Outlet สำหรับแสดง children */}
          <Layout.Content className="navbaradmin-content">
            <Outlet />
          </Layout.Content>
        </>
      ) : (
        <NoPermission />
      )}
    </div>
  );
};

export default NavbarAdmin;
