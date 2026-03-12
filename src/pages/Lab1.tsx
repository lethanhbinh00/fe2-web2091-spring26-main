import { Form, Input, Button, Layout, Table, Modal } from 'antd'
import { useState } from 'react'

const { Header, Sider, Content } = Layout
function lab1() {
    const onFinish = (values: any) => {
        console.log(values);
    }
    const columns = [
        { title: "Name", dataIndex: "name", },
        { title: "Email", dataIndex: "email", },
        { title: "Role", dataIndex: "role", },
    ];
    const data = [
        { key: "1", name: "Nguyen Van A", email: "a@gmail.com", role: "Admin", },
        { key: "2", name: "Tran Van B", email: "b@gmail.com", role: "User", },
    ];
    const [open, setOpen] = useState(false)
    return (
        <div>
            <Layout>
                <Header style={{ color: 'blue',padding: 20 }}> header </Header>
            </Layout>
            <Layout>
                <Sider style={{ color: "red", padding: 20 }}> sidebar </Sider>
            </Layout>
            <Layout>
                <Content style={{ color: "orange", padding: 20 }}> content </Content>
            </Layout>

            <Form onFinish={onFinish}>
                <Form.Item label="name" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="email" name="email">
                    <Input />
                </Form.Item>
                <Form.Item label="password" name="password">
                    <Input.Password />
                </Form.Item>
                <Button htmlType="submit" type="primary">
                    submit
                </Button>
            </Form>
            <Table columns={columns} dataSource={data}> </Table>

            <Button onClick={() => setOpen(true)}>Open</Button>
            <Modal
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
            >Thêm user
                <Form.Item label="name" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="email" name="email">
                    <Input />
                </Form.Item>
                <Form.Item label="password" name="password">
                    <Input.Password />
                </Form.Item>
                <Button htmlType="submit" type="primary">
                    submit
                </Button>

            </Modal>
        </div>

    )
}

export default lab1