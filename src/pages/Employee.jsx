import {
  Button,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Select,
  Table,
  Tabs,
  Tag,
} from "antd";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import SuspendEmployeeModal from "../components/SuspendEmployeeModal";

const { Search } = Input;
const { TabPane } = Tabs;

export default function Employee() {
  const [selectedFilterRole, setSelectedFilterRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenSuspendModal, setIsOpenSuspendModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [deletedEmployees, setDeletedEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [form] = Form.useForm();

  const fetchEmployees = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://backend-vlxd-production.onrender.com/api/auth"
      );
      setEmployees(data.filter((d) => !d.deleted));
      setDeletedEmployees(data.filter((d) => d.deleted));
    } catch (error) {
      console.error("Lỗi server!", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const column = (type = "active") => [
    { title: "ID người dùng", dataIndex: "id", key: "id" },
    { title: "Tên người dùng", dataIndex: "name", key: "name" },
    { title: "Chức vụ", dataIndex: "role", key: "role" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    { title: "Địa chỉ email", dataIndex: "email", key: "email" },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "suspended_permanently",
      key: "suspended_permanently",
      render: (_, record) => {
        let status = "Đang hoạt động";
        let colorText = "green";
        if (record.suspended_permanently === 1) {
          status = "Đình chỉ vĩnh viễn";
          colorText = "red";
        } else if (record.suspended_until) {
          if (
            dayjs(record.suspended_until)
              .locale("vi")
              .isBefore(dayjs().locale("vi"))
          ) {
            status = "Đang hoạt động";
            colorText = "green";
          } else {
            status = `Tài khoản đình chỉ đến ngày ${dayjs(
              record.suspended_until
            )
              .locale("vi")
              .format("DD/MM/YYYY")}`;
            colorText = "orange";
          }
        }
        return <Tag color={colorText}>{status}</Tag>;
      },
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => {
        if (type === "active") {
          return (
            <Flex gap={8}>
              <Button
                type="primary"
                onClick={() => handleUpdateEmployee(record)}
              >
                Cập nhật
              </Button>
              <Button
                type="default"
                danger
                style={{ color: "#faad14", borderColor: "#faad14" }}
                onClick={() => handleSuspendEmployee(record)}
              >
                Đình chỉ
              </Button>
              <Button
                type="primary"
                onClick={() => handleDeleteEmployee(record.id)}
                danger
              >
                Xóa
              </Button>
            </Flex>
          );
        } else if (type === "deleted") {
          return (
            <Button
              type="dashed"
              onClick={() => handleRestoreEmployee(record.id)}
            >
              Khôi phục
            </Button>
          );
        }
      },
    },
  ];

  const handleAddEmployee = () => {
    setIsOpenModal(true);
    form.resetFields();
    setSelectedEmployee(null);
  };

  const handleUpdateEmployee = (values) => {
    setIsOpenModal(true);
    form.setFieldsValue(values);
    setSelectedEmployee(values);
  };

  const handleSuspendEmployee = (values) => {
    setIsOpenSuspendModal(true);
    setSelectedEmployee(values);
  };

  const handleRestoreEmployee = (id) => {
    Modal.confirm({
      title: "Xác nhận khôi phục?",
      content: "Bạn có chắc chắn muốn khôi phục người dùng này không?",
      okText: "Xác nhận",
      cancelText: "Huỷ",
      async onOk() {
        try {
          const response = await axios.post(
            `https://backend-vlxd-production.onrender.com/api/auth/restore/${id}`,
            {}
          );
          if (response.status === 200) {
            message.success("Đã khôi phục thành công");
            fetchEmployees();
          } else {
            message.error("Có lỗi xảy ra!");
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    });
  };

  const handleDeleteEmployee = async (id) => {
    try {
      const response = await axios.post(
        `https://backend-vlxd-production.onrender.com/api/auth/delete/${id}`,
        {},
        { withCredentials: true }
      );
      if (response.status == 200) {
        message.success("Xóa thành công nhân viên");
        fetchEmployees();
      } else {
        message.error("Có lỗi xảy ra!");
      }
    } catch (error) {
      message.error(error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (selectedEmployee) {
        await axios.post(
          `https://backend-vlxd-production.onrender.com/api/auth/update/${selectedEmployee.id}`,
          values
        );
        message.success("Cập nhật thông tin nhân viên thành công!");
      } else {
        await axios.post(
          `https://backend-vlxd-production.onrender.com/api/auth/register`,
          values
        );
        message.success("Tạo tài khoản thành công!");
      }
      fetchEmployees();
      setIsOpenModal(false);
    } catch (error) {
      if (error.response) {
        console.log(error);

        message.error(error.response.data.message || "Đã xảy ra lỗi!");
      } else {
        message.error("Lỗi kết nối đến server!");
      }
    }
  };

  return (
    <div style={{ padding: 20, background: "#fff", borderRadius: 8 }}>
      <h2 style={{ marginBottom: 16 }}>Quản lý người dùng/nhân viên</h2>
      <Flex align="center" justify="space-between" style={{ marginBottom: 16 }}>
        <Flex gap={12}>
          <Button type="primary" onClick={() => handleAddEmployee()}>
            Thêm nhân viên
          </Button>
          <Button type="default">Xuất danh sách</Button>
        </Flex>
        <Flex gap={12}>
          <Search
            style={{ width: 250 }}
            placeholder="Tìm kiếm nhân viên..."
            enterButton
          />
          <Select
            style={{ width: 180 }}
            showSearch
            placeholder="Lọc danh sách"
            onChange={setSelectedFilterRole}
            options={[
              { value: "manager", label: "Cửa hàng trưởng" },
              { value: "staff", label: "Nhân viên" },
            ]}
          />
        </Flex>
      </Flex>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Danh sách nhân viên" key="1">
          <Table
            columns={column("active")}
            dataSource={employees}
            loading={isLoading}
            pagination={{ pageSize: 5 }}
          />
        </TabPane>
        <TabPane tab="Danh sách nhân viên đã xóa" key="2">
          <Table
            columns={column("deleted")}
            dataSource={deletedEmployees}
            loading={isLoading}
            pagination={{ pageSize: 5 }}
          />
        </TabPane>
      </Tabs>
      <Modal
        title={
          selectedEmployee
            ? "Chỉnh sửa thông tin nhân viên"
            : "Thêm nhân viên mới"
        }
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Tên nhân viên"
            rules={[{ required: true, message: "Vui lòng nhập tên nhân viên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Chức vụ">
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Địa chỉ email"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ email" }]}
          >
            <Input />
          </Form.Item>
          {!selectedEmployee && (
            <Form.Item
              name="password"
              label="Mật khẩu đăng nhập"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input.Password />
            </Form.Item>
          )}
          <Button type="primary" htmlType="submit">
            {selectedEmployee ? "Cập nhật thông tin" : "Thêm nhân viên"}
          </Button>
        </Form>
      </Modal>
      <SuspendEmployeeModal
        open={isOpenSuspendModal}
        onClose={(updated) => {
          setIsOpenSuspendModal(false);
          if (updated) fetchEmployees();
        }}
        employee={selectedEmployee}
      />
    </div>
  );
}
