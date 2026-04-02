import Header from "./components/Header";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";

function Login() {
  return <h2>Trang đăng nhập</h2>;
}

function Home() {
  return <h2>Trang chủ</h2>;
}

function App() {
  return (
    <ThemeProvider>
      <Header />

      <div style={{ padding: 24 }}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </div>

      <Toaster />
    </ThemeProvider>
  );
}

export default App;
