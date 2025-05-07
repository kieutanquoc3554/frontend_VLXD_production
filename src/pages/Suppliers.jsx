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
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const { TabPane } = Tabs;
export default function Suppliers() {
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [deletedSuppliers, setDeletedSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://backend-vlxd-production.onrender.com/api/supplier/"
      );
      console.log("Dữ liệu từ API:", data);
      setSuppliers(data.filter((supplier) => !supplier.deleted));
      setDeletedSuppliers(data.filter((supplier) => supplier.deleted));
    } catch (error) {
      message.error("Lỗi khi tải danh sách nhà cung cấp", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSupplier = () => {
    setSelectedSupplier(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEditSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    form.setFieldsValue(supplier);
    setIsModalOpen(true);
  };

  const handleSubmit = async (values) => {
    try {
      if (selectedSupplier) {
        await axios.put(
          `https://backend-vlxd-production.onrender.com/api/supplier/${selectedSupplier.id}`,
          values
        );
        message.success("Cập nhật danh mục thành công!");
      } else {
        await axios.post(
          "https://backend-vlxd-production.onrender.com/api/supplier",
          values
        );
        message.success("Thêm cung cấp thành công!");
      }
      fetchSuppliers();
      setIsModalOpen(false);
    } catch (error) {
      message.error("Lỗi khi lưu nhà cung cấp!" + error);
    }
  };

  const handleDeleteSupplier = (id) => {
    try {
      Modal.confirm({
        title: "Xác nhận xoá nhà cung cấp",
        content:
          "Khi xoá nhà cung cấp, các sản phẩm thuộc nhà cung cấp đó sẽ bị gán lại giá trị, có thể ảnh hưởng đến việc kiểm tra, tham khảo trong tương lai. Nếu bạn có nhu cầu khôi phục, vui lòng di chuyển đến thẻ Danh sách nhà cung cấp đã xoá",
        okText: "Xoá",
        okType: "danger",
        cancelText: "Huỷ",
        async onOk() {
          try {
            await axios.post(
              `https://backend-vlxd-production.onrender.com/api/supplier/${id}`,
              {}
            );
            message.success("Đã xoá nhà cung cấp");
            fetchSuppliers();
          } catch (error) {
            message.error("Đã có lỗi xảy ra!" + error);
          }
        },
      });
    } catch (error) {
      message.error("Có lỗi xảy ra!" + error);
    }
  };

  const handleRestore = async (id) => {
    try {
      await axios.post(
        `https://backend-vlxd-production.onrender.com/api/supplier/restore/${id}`,
        {}
      );
      message.success("Đã khôi phục thành công");
      fetchSuppliers();
    } catch (error) {
      message.error("Đã có lỗi xảy ra" + error);
    }
  };

  const columns = [
    { title: "ID nhà cung cấp", dataIndex: "id", key: "id" },
    { title: "Tên nhà cung cấp", dataIndex: "name", key: "name" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    { title: "Địa chỉ email", dataIndex: "email", key: "email" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Flex gap={10}>
          <Button type="primary" onClick={() => handleEditSupplier(record)}>
            Cập nhật
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDeleteSupplier(record.id)}
          >
            Xoá
          </Button>
        </Flex>
      ),
    },
  ];

  const columnsDeleted = [
    { title: "ID nhà cung cấp", dataIndex: "id", key: "id" },
    { title: "Tên nhà cung cấp", dataIndex: "name", key: "name" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    { title: "Địa chỉ email", dataIndex: "email", key: "email" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Flex gap={10}>
          <Button type="primary" onClick={() => handleRestore(record.id)}>
            Khôi phục
          </Button>
        </Flex>
      ),
    },
  ];
  return (
    <div>
      <h2>Quản lý nhà cung cấp</h2>
      <Flex justify="space-between" align="center" gap={10}>
        <Button type="primary" onClick={handleAddSupplier}>
          Thêm nhà cung cấp
        </Button>
        <Flex gap={10}>
          <Input placeholder="Tìm kiếm nhà cung cấp..." />
        </Flex>
      </Flex>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Danh sách nhà cung cấp" key="1">
          <Table
            columns={columns}
            dataSource={suppliers}
            loading={loading}
            rowKey="id"
          ></Table>
        </TabPane>
        <TabPane tab="Danh sách nhà cung cấp đã xoá" key="2">
          <Table
            columns={columnsDeleted}
            dataSource={deletedSuppliers}
            loading={loading}
            rowKey="id"
          ></Table>
        </TabPane>
      </Tabs>
      <Modal
        title={
          selectedSupplier ? "Chỉnh sửa nhà cung cấp" : "Thêm nhà cung cấp"
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Tên nhà cung cấp"
            rules={[
              { required: true, message: "Vui lòng nhập tên nhà cung cấp" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại nhà cung cấp",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Địa chỉ email">
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Địa chỉ liên hệ">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            {selectedSupplier ? "Lưu thay đổi" : "Thêm"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
