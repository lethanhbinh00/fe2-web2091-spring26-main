import { useMemo } from "react";
import {
    Button,
    Card,
    Checkbox,
    Form,
    Input,
    Select,
    Spin,
    Typography,
    message,
} from "antd";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const api = axios.create({
    baseURL: "http://localhost:3000",
});

interface Category {
    id: number | string;
    title: string;
    description?: string;
    active?: boolean;
}

interface CreateCategoryValues {
    title: string;
    description?: string;
    active: boolean;
}

interface Story {
    id?: number | string;
    title: string;
    content: string;
    categoryId: number | string;
}

interface CreateStoryValues {
    title: string;
    content: string;
    categoryId: number | string;
}

function Lab4() {
    const { data: categories = [], isLoading: isLoadingCategories } = useQuery<
        Category[]
    >({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await api.get("/categories");
            return response.data;
        },
    });

    const categoryOptions = useMemo(() => {
        return categories.map((category) => ({
            value: category.id,
            label: category.title,
        }));
    }, [categories]);
    const createCategoryMutation = useMutation({
        mutationFn: async (values: CreateCategoryValues) => {
            const response = await api.post("/categories", values);
            return response.data;
        },
        onSuccess: () => {
            message.success("Thêm danh mục truyện thành công");
        },
        onError: () => {
            message.error("Thêm danh mục thất bại");
        },
    });

    const onFinishCategory = (values: CreateCategoryValues) => {
        createCategoryMutation.mutate(values);
    };
    const createStoryMutation = useMutation({
        mutationFn: async (values: CreateStoryValues): Promise<Story> => {
            const response = await api.post("/stories", values);
            return response.data;
        },
        onSuccess: () => {
            message.success("Thêm truyện mới thành công");
        },
        onError: () => {
            message.error("Thêm truyện mới thất bại");
        },
    });

    const onFinishStory = (values: CreateStoryValues) => {
        createStoryMutation.mutate(values);
    };

    return (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
            <Title level={2}>Lab 4 - Form + Axios + React Query + TypeScript</Title>
            <Card
                title="Bài 1 - Form thêm danh mục truyện"
                style={{ marginBottom: 24 }}
            >
                <Paragraph>
                    Yêu cầu:
                    <br />
                    - Title (required)
                    <br />
                    - Description (Input.TextArea)
                    <br />
                    - Active (Checkbox)
                    <br />- Submit gọi Axios POST API: <b>POST /categories</b>
                </Paragraph>

                <Form
                    layout="vertical"
                    onFinish={onFinishCategory}
                    initialValues={{ active: false }}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: "Title là bắt buộc" }]}
                    >
                        <Input placeholder="Nhập tiêu đề danh mục" />
                    </Form.Item>

                    <Form.Item label="Description" name="description">
                        <TextArea rows={4} placeholder="Nhập mô tả danh mục" />
                    </Form.Item>

                    <Form.Item name="active" valuePropName="checked">
                        <Checkbox>Active</Checkbox>
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={createCategoryMutation.isPending}
                    >
                        {createCategoryMutation.isPending ? "Đang submit..." : "Submit"}
                    </Button>
                </Form>
            </Card>

            <Card
                title="Bài 2 - Thay any bằng type/interface tương ứng Story"
                style={{ marginBottom: 24 }}
            >
                <Paragraph>
                    Trong bài này, thay:
                    <br />- <code>data: any</code> → bằng <code>Story</code>
                    <br />- <code>values: any</code> → bằng <code>CreateStoryValues</code>
                </Paragraph>

                <div
                    style={{
                        background: "#fafafa",
                        padding: 12,
                        borderRadius: 8,
                        whiteSpace: "pre-wrap",
                    }}
                >
                    {`interface Story {
                        id?: number | string;
                        title: string;
                        content: string;
                        categoryId: number | string;
                        }

                        interface CreateStoryValues {
                        title: string;
                        content: string;
                        categoryId: number | string;
                        }`}
                </div>
            </Card>

            <Card
                title="Bài 3 + Bài 4 - Form thêm truyện mới"
                style={{ marginBottom: 24 }}
            >
                <Paragraph>
                    Yêu cầu:
                    <br />- Hiển thị loading khi submit bằng{" "}
                    <code>mutation.isPending</code>
                    <br />- Call API <code>GET /categories</code> để lấy danh sách danh
                    mục
                    <br />- Đưa dữ liệu categories vào <code>Select options</code>
                </Paragraph>

                {isLoadingCategories ? (
                    <Spin />
                ) : (
                    <Form layout="vertical" onFinish={onFinishStory}>
                        <Form.Item
                            label="Story Title"
                            name="title"
                            rules={[{ required: true, message: "Title là bắt buộc" }]}
                        >
                            <Input placeholder="Nhập tên truyện" />
                        </Form.Item>

                        <Form.Item
                            label="Content"
                            name="content"
                            rules={[{ required: true, message: "Content là bắt buộc" }]}
                        >
                            <TextArea rows={5} placeholder="Nhập nội dung truyện" />
                        </Form.Item>

                        <Form.Item
                            label="Category"
                            name="categoryId"
                            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
                        >
                            <Select placeholder="Chọn danh mục" options={categoryOptions} />
                        </Form.Item>

                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={createStoryMutation.isPending}
                        >
                            {createStoryMutation.isPending ? "Đang submit..." : "Submit"}
                        </Button>
                    </Form>
                )}
            </Card>
        </div>
    );
}

export default Lab4;
