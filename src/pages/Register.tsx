import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

import { Card, Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function Register() {
  const setUser = useAuthStore((state) => state.setUser);

  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(
        "http://localhost:3000/register",

        data,
      );

      return res.data;
    },

    onSuccess: (data) => {
      setUser({
        email: data.user.email,

        accessToken: data.accessToken,
      });

      message.success("Đăng ký thành công");

      navigate("/");
    },

    onError: () => {
      message.error("Email đã tồn tại hoặc lỗi server");
    },
  });

  const onFinish = (values: any) => {
    registerMutation.mutate(values);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <Title level={3} className="text-center">
          Tạo tài khoản
        </Title>

        <Text type="secondary" className="block text-center mb-6">
          Đăng ký để sử dụng hệ thống
        </Text>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,

                message: "Không được để trống",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Nhập username"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,

                message: "Không được để trống",
              },

              {
                type: "email",

                message: "Email không hợp lệ",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="example@gmail.com"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,

                message: "Không được để trống",
              },

              {
                min: 6,

                message: "Tối thiểu 6 ký tự",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập password"
              size="large"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={registerMutation.isPending}
            block
          >
            Đăng ký
          </Button>
        </Form>

        <div className="text-center mt-4">
          <Text>Đã có tài khoản?</Text>

          <Link to="/login" className="ml-2 text-blue-600">
            Đăng nhập
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default Register;
