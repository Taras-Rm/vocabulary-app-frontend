import { Layout as AntdLayout } from "antd";
import {
  HomeOutlined,
  PlusCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import MyButton from "./MyButton/MyButton";

const Layout = ({ children }) => {
  const handleLogoutClick = () => {
    localStorage.removeItem("authToken");
  };

  return (
    <AntdLayout>
      <AntdLayout.Header style={{ backgroundColor: "purple" }}>
        <div
          style={{
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            padding: "0 150px",
          }}
        >
          <div style={{ fontSize: 25, fontFamily: "'Andika', sans-serif" }}>
            Vocabulary
          </div>
          <div style={{ display: "flex" }}>
            <MyButton
              to="/"
              icon={<HomeOutlined />}
              style={{ fontSize: "15px" }}
            >
              Home
            </MyButton>
            <MyButton
              to="/createCollection"
              icon={<PlusCircleOutlined />}
              style={{ marginLeft: 20, fontSize: "15px" }}
            >
              New Collection
            </MyButton>
            <MyButton
              to="/login"
              icon={<LogoutOutlined />}
              style={{ marginLeft: 20, fontSize: "15px" }}
              onClick={handleLogoutClick}
            >
              Logout
            </MyButton>
          </div>
        </div>
      </AntdLayout.Header>
      <div style={{ padding: "0 150px" }}>{children}</div>
    </AntdLayout>
  );
};

export default Layout;
