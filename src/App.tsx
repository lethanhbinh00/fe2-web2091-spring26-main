import { Toaster } from "react-hot-toast";
import { Link, Route, Routes } from "react-router-dom";

import Lab6 from "./pages/Lab6/Lab6";
import Edit from "./pages/Lab6/Edit";
// nếu có trang Add thì import thêm
// import Add from "./pages/Lab6/Add";

function App() {

  return (
    <>
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          
          <Link to="/" className="text-xl font-semibold">
            <strong>WEB2091 App</strong>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gray-200">
              Trang chủ
            </Link>

            <Link to="/stories" className="hover:text-gray-200">
              Danh sách
            </Link>

            <Link to="/stories/add" className="hover:text-gray-200">
              Thêm mới
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="#" className="hover:text-gray-200">
              Đăng nhập
            </Link>

            <Link to="#" className="hover:text-gray-200">
              Đăng ký
            </Link>
          </div>

        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Lab6 />} />
        <Route path="/stories" element={<Lab6 />} />
        <Route path="/stories/edit/:id" element={<Edit />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;