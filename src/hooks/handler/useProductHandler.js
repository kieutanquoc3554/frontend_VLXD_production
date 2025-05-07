import { message, Modal } from "antd";
import axios from "axios";
import * as productServices from "../../services/productServices";

export const useProductHandler = ({
  user,
  setOpenAddModal,
  setSelectedProduct,
  refetch,
  setCategories,
}) => {
  const handleUpdate = (product) => {
    setOpenAddModal(true);
    setSelectedProduct(product);
  };

  const handleHideProduct = (id) => {
    Modal.confirm({
      title: "Xác nhận ẩn sản phẩm",
      content:
        "Khi bạn thực hiện thao tác này, sản phẩm sẽ bị ẩn, không thể thực hiện các thao tác liên quan đến sản phẩm.",
      okText: "Xác nhận",
      cancelText: "Huỷ",
      async onOk() {
        try {
          const response = await axios.put(
            `https://backend-vlxd-production.onrender.com/api/products/hide/${id}`,
            {}
          );
          message.success(response.data.message);
          refetch();
        } catch (error) {
          message.error(error);
        }
      },
    });
  };

  const handleDeleteProduct = async (id) => {
    try {
      if (user.role === "Admin") {
        const response = await axios.put(
          `https://backend-vlxd-production.onrender.com/api/products/delete/${id}`,
          {}
        );
        message.success(response.data.message);
        refetch();
      } else {
        message.error("Bạn chưa được cấp quyền để xoá sản phẩm!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = productServices.fetchCategories();
      if (response.status === 200) {
        setCategories(response.data);
      } else {
        message.error("Tải danh mục sản phẩm thất bại!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    handleUpdate,
    handleHideProduct,
    handleDeleteProduct,
    fetchCategories,
  };
};
