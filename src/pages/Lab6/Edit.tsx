import { Form, Input, Button, Spin, Card, message } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Edit = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["story", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/stories/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        createdAt: data.createdAt
          ? new Date(data.createdAt).toISOString().split("T")[0]
          : "",
      });
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      return axios.patch(`http://localhost:3000/stories/${id}`, values);
    },

    onSuccess: () => {
      message.success("Cập nhật thành công");

      queryClient.invalidateQueries({
        queryKey: ["stories"],
      });

      navigate("/");
    },

    onError: () => {
      message.error("Cập nhật thất bại");
    },
  });

  const onFinish = (values: any) => {
    mutation.mutate(values);
  };

  if (isLoading) return <Spin />;

  return (
    <div className="flex justify-center mt-10">
      <Card title="Cập nhật truyện" style={{ width: 800 }} className="shadow-lg">

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          disabled={mutation.isPending}
        >

          <Form.Item
            name="title"
            label="Tên truyện"
            rules={[{ required: true, message: "Không được để trống" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="author"
            label="Tác giả"
            rules={[{ required: true, message: "Không được để trống" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="image" label="Link ảnh">
            <Input placeholder="https://..." />
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item name="createdAt" label="Ngày tạo">
            <Input type="date" />
          </Form.Item>

          <div className="flex justify-end gap-3">
            <Button onClick={() => navigate("/")}>
              Hủy
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              loading={mutation.isPending}
            >
              Cập nhật
            </Button>
          </div>

        </Form>

      </Card>
    </div>
  );
};

export default Edit;