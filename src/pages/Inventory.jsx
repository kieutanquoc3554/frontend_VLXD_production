import { Button, Flex, Form, Input, InputNumber, Modal, Select } from "antd";
import useInventory from "../hooks/api/useInventory";
import useProduct from "../hooks/api/useProduct";
import ColumnInventory from "../components/ColumnInventory";
import ColumnInventoryLogs from "../components/ColumnInventoryLogs";
import TabsInventory from "../components/TabsInventory";
import InventoryModal from "../components/InventoryModal";
const { Search } = Input;

export default function Inventory() {
  const { products } = useProduct("active");
  const {
    form,
    inventory,
    inventoryLogs,
    isLoading,
    editingItem,
    setEditingItem,
    handleEditModal,
    handleSearch,
    handleUpdate,
  } = useInventory();

  return (
    <>
      <h2>Quản lý kho hàng</h2>
      <Flex align="center" justify="space-between">
        <Button
          type="primary"
          onClick={() => handleEditModal(null)}
          style={{ marginBottom: 12 }}
        >
          Thêm vào kho
        </Button>
        <Search
          placeholder="Tìm sản phẩm..."
          allowClear
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
      </Flex>
      <TabsInventory
        ColumnInventory={ColumnInventory}
        handleEditModal={handleEditModal}
        inventory={inventory}
        isLoading={isLoading}
        ColumnInventoryLogs={ColumnInventoryLogs}
        inventoryLogs={inventoryLogs}
      />
      <InventoryModal
        editingItem={editingItem}
        setEditingItem={setEditingItem}
        onUpdate={handleUpdate}
        form={form}
        products={products}
      />
    </>
  );
}
