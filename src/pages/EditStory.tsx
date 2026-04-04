import { Button, Card, Input, Form } from 'antd';
import { useUpdateStory } from '../hooks/useUpdateStory';

function EditStory() {
    const { update } = useUpdateStory();

    const [form] = Form.useForm();

    const onSubmit = (values: any) => {
        update({ id: 3, ...values });
    }

  return (
    <Card title="Edit Story" style={{ maxWidth: 400 }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true }]}
        >
          <Input placeholder="Nhập tên truyện" />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
        >
          Update
        </Button>

      </Form>

    </Card>
  );
}

export default EditStory