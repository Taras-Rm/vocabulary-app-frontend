import { Layout as AntdLayout, Spin } from "antd";
import {
  HomeOutlined,
  PlusCircleOutlined,
  LogoutOutlined,
  SettingOutlined,
  InfoOutlined,
} from "@ant-design/icons";
import MyButton from "./MyButton/MyButton";
import { useTranslation } from "react-i18next";
import { getAuthenticatedUser } from "../api/auth";
import { useQuery } from "react-query";

const Layout = ({ children }) => {
  const { t, i18n } = useTranslation();

  const { data, isLoading, error } = useQuery("me", getAuthenticatedUser, {
    onSuccess: (data) => {
      i18n.changeLanguage(data.user.settings.language);
    },
    onError: () => {
      window.location.href ="/login"
    },
    retry: false,
  });

  const handleLogoutClick = () => {
    localStorage.removeItem("authToken");
  };

  if (isLoading) return <Spin spinning />;

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
            {data.user?.isSuper && (
              <MyButton
                to="/statistic"
                icon={<InfoOutlined />}
                style={{ fontSize: "15px" }}
              >
                {t("menu.statistics")}
              </MyButton>
            )}
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
