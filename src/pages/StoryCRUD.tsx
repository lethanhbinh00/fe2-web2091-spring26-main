import { Table, Button, Space, Form, Input, Card } from "antd";
import { useCRUDStory } from "../hooks/useCRUDStory";

function StoryCRUD() {
  const { list, add, remove, update } = useCRUDStory();

  const [form] = Form.useForm();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },

    {
      title: "Title",
      dataIndex: "title",
    },

    {
      title: "Action",

      render: (_: any, record: any) => (
        <Space>
          <Button
            onClick={() => {
              const title = prompt("Nhập title mới");

              update({
                ...record,
                title,
              });
            }}
          >
            Edit
          </Button>

          <Button danger onClick={() => remove(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const onAdd = (values: any) => {
    add(values);

    form.resetFields();
  };

  return (
    <Card title="Story Manager">
      <Form
        form={form}
        layout="inline"
        onFinish={onAdd}
        style={{ marginBottom: 20 }}
      >
        <Form.Item name="title" rules={[{ required: true }]}>
          <Input placeholder="Nhập tên truyện" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form>

      <Table rowKey="id" dataSource={list} columns={columns} />
    </Card>
  );
}

export default StoryCRUD;
