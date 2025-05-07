import { Layout } from "antd";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const { Content } = Layout;

const MainLayout = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <NavigationBar />
        <Content
          style={{
            padding: "24px",
            background: theme === "dark" ? "#1f1f1f" : "#f0f2f5",
            color: theme === "dark" ? "#f0f2f5" : "black",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
