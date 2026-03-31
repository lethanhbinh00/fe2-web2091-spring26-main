import { Avatar, Button, Space, Switch } from "antd";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useThemeContext } from "../contexts/ThemeContext";

function Header() {
  const { user, setUser } = useUser();
  const { darkMode, toggleTheme } = useThemeContext();

  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">
          <strong>WEB2091 App</strong>
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-gray-200">
            Trang chủ
          </Link>

          <Link to="/list" className="hover:text-gray-200">
            Danh sách
          </Link>

          <Link to="/add" className="hover:text-gray-200">
            Thêm mới
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Switch
            style={{ marginRight: 10 }}
            checked={darkMode}
            onChange={toggleTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />

          {user ? (
            <Space>
              <Avatar src={user.avatar} />

              <span>{user.name}</span>

              <Button danger size="small" onClick={() => setUser(null)}>
                Logout
              </Button>
            </Space>
          ) : (
            <Space>
              <Link to="#" className="hover:text-gray-200">
                Đăng nhập
              </Link>

              <Link to="#" className="hover:text-gray-200">
                Đăng ký
              </Link>
            </Space>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
