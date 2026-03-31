import { Button, Card } from "antd";
import { useUser } from "./UserContext";

function ContextPage() {
  const { setUser } = useUser();

  const fakeLogin = () => {
    setUser({
      name: "Thanh Bình",
      avatar: "https://i.pravatar.cc/150?img=5"
    });
  };

  return (
    <Card title="Login giả lập" style={{ maxWidth: 450, margin: "20px auto", textAlign: "center" }} className="shadow-lg">
      <Button type="primary" onClick={fakeLogin} size="large" >
        Login
      </Button>
    </Card>
  );
}

export default ContextPage;