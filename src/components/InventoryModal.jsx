import { Form, Input, InputNumber, Modal, Select } from "antd";

const InventoryModal = ({
  editingItem,
  setEditingItem,
  onUpdate,
  form,
  products,
}) => {
  return (
    <Modal
      title={editingItem ? "Cập nhật kho hàng" : "Thêm vào kho"}
      open={!!editingItem || editingItem === null}
      onCancel={() => setEditingItem(undefined)}
      onOk={onUpdate}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="product_id"
          label="Sản phẩm"
          rules={[{ required: true, message: "Vui lòng chọn sản phẩm" }]}
        >
          <Select
            placeholder="Chọn sản phẩm"
            options={products.map((p) => ({
              label: p.name,
              value: p.id,
            }))}
            disabled={!!editingItem?.id}
          />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Số lượng"
          rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="warehouse_location" label="Vị trí kho">
          <Input placeholder="Nhập vị trí kho" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InventoryModal;
