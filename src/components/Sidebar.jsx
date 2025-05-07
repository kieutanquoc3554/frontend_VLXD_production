import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  SettingOutlined,
  DropboxOutlined,
  ProductOutlined,
  LinkOutlined,
  UserOutlined,
  InboxOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme } = useContext(ThemeContext);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      width={260}
      style={{
        height: "100vh",
        background: theme === "dark" ? "#121212" : "white",
        transition: "width 0.3s ease-in-out",
      }}
    >
      <Menu
        theme={theme === "dark" ? "dark" : "light"}
        mode="inline"
        defaultOpenKeys={["category", "orders", "reports"]}
        style={{
          borderRight: "none",
          background: theme === "dark" ? "#121212" : "white",
        }}
      >
        <Menu.SubMenu
          key="category"
          icon={<AppstoreOutlined />}
          title="Danh mục"
        >
          <Menu.Item key="1" icon={<ProductOutlined />}>
            <Link to="/products">Sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DropboxOutlined />}>
            <Link to="/categories">Danh mục sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<LinkOutlined />}>
            <Link to="/suppliers">Nhà cung cấp</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            <Link to="/customer">Khách hàng</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<InboxOutlined />}>
            <Link to="/inventory">Kho hàng</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<UserOutlined />}>
            <Link to="/employee">Nhân viên</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="orders"
          icon={<ShoppingCartOutlined />}
          title="Giao dịch"
        >
          <Menu.Item key="7" icon={<FormOutlined />}>
            Đơn hàng
          </Menu.Item>
          <Menu.Item key="8">Hóa đơn & Thanh toán</Menu.Item>
          <Menu.Item key="9">Nhập hàng (Mua)</Menu.Item>
          <Menu.Item key="10">Xuất kho (Bán)</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="reports"
          icon={<BarChartOutlined />}
          title="Báo cáo & Thống kê"
        >
          <Menu.Item key="11">Doanh thu</Menu.Item>
          <Menu.Item key="12">Hàng tồn kho</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="13" icon={<SettingOutlined />}>
          Cấu hình hệ thống
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
