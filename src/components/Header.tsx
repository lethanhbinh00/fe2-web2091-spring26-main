import { Avatar, Button, Space, Switch, Tag } from "antd";
import { Link } from "react-router-dom";
import { useThemeContext } from "../contexts/ThemeContext";
import { useAuthStore } from "../stores/useAuthStore";

function Header() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { darkMode, toggleTheme } = useThemeContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">
          WEB2091 App
        </Link>

        <div className="hidden md:flex space-x-8">
          <Link to="/">Trang chủ</Link>

          <Link to="/list">Danh sách</Link>

          <Link to="/add">Thêm mới</Link>
        </div>

        <div className="flex items-center space-x-4">
          <Switch
            checked={darkMode}
            onChange={toggleTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
          {user ? (
            <Space>
              <Avatar>{user.email?.charAt(0).toUpperCase()}</Avatar>

              <div>
                <div>{user.email}</div>
                <Tag color="green">Đã đăng nhập</Tag>
              </div>
              <Button danger size="small" onClick={handleLogout}>
                Logout
              </Button>
            </Space>
          ) : (
            <Space>
              <Tag color="red">Chưa đăng nhập</Tag>
              <Link to="/login">Đăng nhập</Link>
              <Link to="/register">Đăng ký</Link>
            </Space>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
