import { useState } from "react";
import { Button, Card, Form, Input, InputNumber, Select, Typography, Divider } from "antd";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

type PostData = {
  title: string;
  category: string;
  slug: string;
  content: string;
  imageUrl: string;
};

function Lab3() {
  const [postData, setPostData] = useState<PostData | null>(null);

  const onLogin = (values: { email: string; password: string }) => {
    console.log("Bài 1 - Login:", values);
  };

  const onRegister = (values: {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }) => {
    console.log("Bài 2 - Register:", values);
  };

  const onAddProduct = (values: {
    productName: string;
    price: number;
    quantity: number;
    description: string;
  }) => {
    console.log("Bài 3 - Add Product:", values);
  };

  const onAddPost = (values: PostData) => {
    setPostData(values);
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <Title level={2}>Lab 3</Title>
      <Card title="Bài 1 - Form đăng nhập" style={{ marginBottom: 24 }}>
        <Form layout="vertical" onFinish={onLogin}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email là bắt buộc" },
              { type: "email", message: "Email không đúng định dạng" },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password là bắt buộc" }]}
          >
            <Input.Password placeholder="Nhập password" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form>
      </Card>

      <Card title="Bài 2 - Form đăng ký người dùng" style={{ marginBottom: 24 }}>
        <Form layout="vertical" onFinish={onRegister}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Name là bắt buộc" }]}
          >
            <Input placeholder="Nhập họ tên" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email là bắt buộc" },
              { type: "email", message: "Email không đúng định dạng" },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Phone là bắt buộc" }]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Password là bắt buộc" },
              { min: 6, message: "Password tối thiểu 6 ký tự" },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Nhập password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Confirm Password là bắt buộc" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Confirm Password không trùng Password"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại password" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form>
      </Card>

      <Card title="Bài 3 - Form thêm sản phẩm" style={{ marginBottom: 24 }}>
        <Form layout="vertical" onFinish={onAddProduct}>
          <Form.Item
            label="Tên sản phẩm"
            name="productName"
            rules={[{ required: true, message: "Tên sản phẩm là bắt buộc" }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: "Giá là bắt buộc" }]}
          >
            <InputNumber style={{ width: "100%" }} min={0} placeholder="Nhập giá" />
          </Form.Item>

          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[{ required: true, message: "Số lượng là bắt buộc" }]}
          >
            <InputNumber style={{ width: "100%" }} min={0} placeholder="Nhập số lượng" />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Mô tả là bắt buộc" }]}
          >
            <TextArea rows={4} placeholder="Nhập mô tả sản phẩm" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Card>

      <Card title="Bài 4 - Form thêm bài viết" style={{ marginBottom: 24 }}>
        <Form layout="vertical" onFinish={onAddPost}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Title là bắt buộc" }]}
          >
            <Input placeholder="Nhập tiêu đề bài viết" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Category là bắt buộc" }]}
          >
            <Select
              placeholder="Chọn danh mục"
              options={[
                { label: "Technology", value: "Technology" },
                { label: "Education", value: "Education" },
                { label: "News", value: "News" },
                { label: "Lifestyle", value: "Lifestyle" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Slug"
            name="slug"
            rules={[{ required: true, message: "Slug là bắt buộc" }]}
          >
            <Input placeholder="vi-du-bai-viet" />
          </Form.Item>

          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: "Content là bắt buộc" }]}
          >
            <TextArea rows={5} placeholder="Nhập nội dung bài viết" />
          </Form.Item>

          <Form.Item
            label="Image URL"
            name="imageUrl"
            rules={[
              { required: true, message: "Image URL là bắt buộc" },
              { type: "url", message: "Image URL không hợp lệ" },
            ]}
          >
            <Input placeholder="https://example.com/image.jpg" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>

        {postData && (
          <>
            <Divider />
            <Title level={4}>Dữ liệu đã nhập</Title>
            <Paragraph>
              <Text strong>Title:</Text> {postData.title}
            </Paragraph>
            <Paragraph>
              <Text strong>Category:</Text> {postData.category}
            </Paragraph>
            <Paragraph>
              <Text strong>Slug:</Text> {postData.slug}
            </Paragraph>
            <Paragraph>
              <Text strong>Content:</Text> {postData.content}
            </Paragraph>
            <Paragraph>
              <Text strong>Image URL:</Text> {postData.imageUrl}
            </Paragraph>
          </>
        )}
      </Card>
    </div>
  );
}

export default Lab3;