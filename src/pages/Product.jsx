import { Button, Flex, Input, Select, Table, Tabs } from "antd";
import { useEffect, useState } from "react";
import AddProductFormModal from "../components/AddProductFormModal";
import useUser from "../hooks/api/useUser";
import useProduct from "../hooks/api/useProduct";
import useProductColumns from "../hooks/ui/useProductColumns";
import { useProductHandler } from "../hooks/handler/useProductHandler";
import SearchFilterInput from "../components/SearchFilterInput";

const { TabPane } = Tabs;

export default function Product() {
  const { user } = useUser();
  const [tabKey, setTabKey] = useState("active");
  const { products, isLoading, refetch } = useProduct(tabKey);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {
    handleUpdate,
    handleHideProduct,
    handleDeleteProduct,
    fetchCategories,
  } = useProductHandler({
    user,
    refetch,
    setOpenAddModal,
    setSelectedProduct,
  });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleAddModal = () => {
    setOpenAddModal(true);
  };

  const handleChangeTabKey = (key) => {
    setTabKey(key);
  };

  const tabTitles = {
    active: "Danh sách sản phẩm",
    hidden: "Danh sách sản phẩm đã ẩn",
    deleted: "Danh sách sản phẩm đã xoá",
  };

  const getTitleTabs = (key) => tabTitles[key] || "Danh sách sản phẩm";

  const columns = useProductColumns(
    tabKey,
    handleUpdate,
    handleHideProduct,
    handleDeleteProduct
  );

  return (
    <div style={{ padding: 20, background: "#fff", borderRadius: 8 }}>
      <h2>Quản lý sản phẩm</h2>
      <Flex
        align="center"
        justify="space-between"
        gap={10}
        style={{ margin: "10px 0" }}
      >
        <Button type="primary" onClick={() => handleAddModal()}>
          Thêm sản phẩm
        </Button>
        {openAddModal && (
          <AddProductFormModal
            open={openAddModal}
            title={selectedProduct ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
            onClose={() => {
              setOpenAddModal(false);
              setSelectedProduct(null);
              refetch();
            }}
            selectedProduct={selectedProduct}
          />
        )}
      </Flex>
      <Tabs activeKey={tabKey} onChange={handleChangeTabKey}>
        {["active", "hidden", "deleted"].map((key) => (
          <TabPane key={key} tab={getTitleTabs(key)}>
            <Table
              size="small"
              columns={columns}
              dataSource={products}
              loading={isLoading}
              rowKey="id"
            />
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}
