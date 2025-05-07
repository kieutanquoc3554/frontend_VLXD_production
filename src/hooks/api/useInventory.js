import { Form, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useInventory() {
  const [inventory, setInventory] = useState([]);
  const [inventoryLogs, setInventoryLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const [form] = Form.useForm();

  const fetchInventory = async (keyword) => {
    try {
      setIsLoading(true);
      const url = keyword
        ? `http://localhost:5000/api/inventory/search/keyword?q=${keyword}`
        : "http://localhost:5000/api/inventory";
      const response = await axios.get(url);
      setInventory(response.data);
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu kho hàng", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInventoryLogs = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/inventory/history/logs"
      );
      setInventoryLogs(response.data);
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu lịch sử kho hàng", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
    fetchInventoryLogs();
  }, []);

  const handleEditModal = (item) => {
    setEditingItem(item);
    form.setFieldsValue(item);
  };

  const handleSearch = (value) => {
    setSearchKey(value);
    fetchInventory(value);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      if (editingItem?.id) {
        await axios.put(
          `http://localhost:5000/api/inventory/${editingItem.id}`,
          values,
          { withCredentials: true }
        );
        message.success("Cập nhật thành công!");
      } else {
        await axios.post("http://localhost:5000/api/inventory", values, {
          withCredentials: true,
        });
        message.success("Thêm vào kho thành công!");
      }
      setEditingItem(undefined);
      form.resetFields();
      fetchInventory();
      fetchInventoryLogs();
    } catch (err) {
      console.log(err);
      message.error("Lỗi khi lưu kho hàng");
    }
  };

  return {
    form,
    inventory,
    inventoryLogs,
    isLoading,
    editingItem,
    setEditingItem,
    fetchInventory,
    fetchInventoryLogs,
    handleEditModal,
    handleSearch,
    handleUpdate,
  };
}
