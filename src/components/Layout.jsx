import { Layout as AntdLayout, Select } from "antd";
import {
  HomeOutlined,
  PlusCircleOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import MyButton from "./MyButton/MyButton";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getAuthenticatedUser } from "../api/auth";
import { useQuery } from "react-query";

const Layout = ({ children }) => {
  const { t, i18n } = useTranslation();

  const { data, isLoading, error } = useQuery("me", getAuthenticatedUser, {
    onSuccess: (data) => {
      i18n.changeLanguage(data.user.settings.language);
    },
    retry: false,
  });

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
              {t("menu.home")}
            </MyButton>
            <MyButton
              to="/createCollection"
              icon={<PlusCircleOutlined />}
              style={{ marginLeft: 20, fontSize: "15px" }}
            >
              {t("menu.newCollection")}
            </MyButton>
            <MyButton
              to="/settings"
              icon={<SettingOutlined />}
              style={{ marginLeft: 20, fontSize: "15px" }}
            >
              {t("menu.settings")}
            </MyButton>
            <MyButton
              to="/login"
              icon={<LogoutOutlined />}
              style={{ marginLeft: 20, fontSize: "15px" }}
              onClick={handleLogoutClick}
            >
              {t("menu.logout")}
            </MyButton>
          </div>
        </div>
      </AntdLayout.Header>
      <div style={{ padding: "0 150px" }}>{children}</div>
    </AntdLayout>
  );
};

export default Layout;
