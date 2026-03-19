import { useMemo, useState } from "react";
import { Table, Image, Spin, Input, Button, Popconfirm, message } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Story {
  id: number;
  image?: string;
  title?: string;
  author?: string;
  description?: string;
  createdAt?: string;
}

function Lab5() {
  const [keyword, setKeyword] = useState("");
  const queryClient = useQueryClient();

  const { data = [], isLoading, isError } = useQuery<Story[]>({
    queryKey: ["stories"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/stories");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`http://localhost:3000/stories/${id}`);
    },
    onSuccess: () => {
      message.success("Xóa truyện thành công");
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
    onError: () => {
      message.error("Xóa truyện thất bại");
    },
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      (item.title || "").toLowerCase().includes(keyword.toLowerCase())
    );
  }, [data, keyword]);

  const columns = [
    { title: "ID", dataIndex: "id"},
    { title: "Ảnh", dataIndex: "image",
      render: (url: string) =>
        url ? <Image src={url} width={60} /> : <span>Không có ảnh</span>
    },
    { title: "Tên truyện", dataIndex: "title"},
    { title: "Tác giả", dataIndex: "author"},
    { title: "Mô tả", dataIndex: "description"},
    { title: "Ngày tạo", dataIndex: "createdAt",
      render: (date: string) =>
        date ? new Date(date).toLocaleDateString("vi-VN") : "Không có ngày",
    },
    { title: "Hành động",
      render: (_: unknown, record: Story) => (
        <Popconfirm
          title="Bạn có chắc chắc muốn xóa truyện này không?"
          onConfirm={() => handleDelete(record.id)}
          okText="Xóa"
          cancelText="Hủy"
        >
          <Button danger loading={deleteMutation.isPending}>
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
  ];

  if (isLoading) return <Spin />;
  if (isError) return <p>Lỗi khi tải dữ liệu</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2 className="text-2xl">DANH SÁCH TRUYỆN</h2>

      <Input
        placeholder="Tìm kiếm theo tên truyện..."
        style={{ width: 300, marginBottom: 16 }}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default Lab5;