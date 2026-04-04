import Header from "./components/Header";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import StoryCRUD from "./pages/StoryCRUD";
import EditStory from "./pages/EditStory";

function Login() {
  return <h2>Trang đăng nhập</h2>;
}

function Home() {
  return <h2></h2>;
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
          <Route path="/edit-story" element={<EditStory />} />
          <Route path="/stories" element={<StoryCRUD />} />
        </Routes>
      </div>
      <Toaster />

    </ThemeProvider>
  );
}

export default App;
