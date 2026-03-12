import { Button, Space, Table, Tag } from 'antd'
function Lab2() {
    const columns = [
        {title: "ID", dataIndex: "key"},
        {title: "Name", dataIndex: "Name"},
        {title: "Age", dataIndex: "Age"},
        {title: "Major", dataIndex: "Major"},
    ]

    const data = [
        {key: "1", Name: "Nguyen Van A", Age: 20, Major: "Computer Science"},
        {key: "2", Name: "Tran Van B", Age: 21, Major: "Information Technology"},
        {key: "3", Name: "Le Thi C", Age: 19, Major: "Software Engineering"},
    ]

    const columns1 = [
        {title: "ID", dataIndex: "key"},
        {title: "Name", dataIndex: "Name"},
        {title: "Email", dataIndex: "Email"},
        {title: "Status", dataIndex: "Status", render: (status: string) =>(
            <Tag color={ status === "active" ? "green" : "red"}>{status.toUpperCase()}</Tag>
        )},
        {title: "Action", render: () =>(
            <Space>
                <Button type="primary">Edit</Button>
                <Button danger>Delete</Button>
            </Space>
        )}
    ]

    const data1 = [
        {key: "1", Name: "Nguyen Van A", Email: "nguyenvana@example.com", Status: "Active"},
        {key: "2", Name: "Tran Van B", Email: "tranvanb@example.com", Status: "Inactive"},
        {key: "3", Name: "Le Thi C", Email: "lethic@example.com", Status: "Active"},
    ]

    const columns2 = [
        {title: "ID", dataIndex: "key"},
        {title: "Product Name", dataIndex: "Product Name"},
        {title: "Price", dataIndex: "Price"},
        {title: "Category", dataIndex: "Category"},
    ]

    const data2 = [
        {key: "1", "Product Name": "Laptop", Price: 1000, Category: "Electronics"},
        {key: "2", "Product Name": "Book", Price: 20, Category: "Education"},
        {key: "3", "Product Name": "Phone", Price: 500, Category: "Electronics"},
        {key: "4", "Product Name": "Table", Price: 150, Category: "Furniture"},
        {key: "5", "Product Name": "Chair", Price: 80, Category: "Furniture"},
    ]



  return (
    <div>
        <h2>Danh sách sinh viên</h2>
        <Table columns={columns} dataSource={data}></Table>

        <h2>Danh sách sản phẩm</h2>
        <Table columns={columns2} dataSource={data2} pagination={{ pageSize: 3 }}></Table>

        <h2>User Management</h2>
        <Table columns={columns1} dataSource={data1}></Table>

    </div>
  )
}

export default Lab2