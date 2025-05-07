import { Table, Tabs } from "antd";
import StockCheckForm from "./StockCheckForm";
import InventoryStockCheckHistory from "./InventoryStockCheckHistory";
const { TabPane } = Tabs;

const TabsInventory = ({
  ColumnInventory,
  handleEditModal,
  inventory,
  isLoading,
  ColumnInventoryLogs,
  inventoryLogs,
}) => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Tất cả sản phẩm" key="1">
        <Table
          columns={ColumnInventory(handleEditModal)}
          dataSource={inventory}
          rowKey="id"
          loading={isLoading}
        />
      </TabPane>
      <TabPane tab="Sản phẩm sắp hết hàng" key="2">
        <Table
          columns={ColumnInventory(handleEditModal)}
          dataSource={inventory.filter((i) => i.quantity < 10)}
          rowKey="id"
          loading={isLoading}
        />
      </TabPane>
      <TabPane tab="Lịch sử kho hàng" key="3">
        <Table
          columns={ColumnInventoryLogs()}
          dataSource={inventoryLogs}
          rowKey="id"
          loading={isLoading}
        />
      </TabPane>
      <TabPane tab="Lập báo cáo kiểm kho" key="4">
        <StockCheckForm data={inventory} loading={isLoading} />
      </TabPane>
      <TabPane tab="Lịch sử kiểm kho" key="5">
        <InventoryStockCheckHistory />
      </TabPane>
    </Tabs>
  );
};

export default TabsInventory;
