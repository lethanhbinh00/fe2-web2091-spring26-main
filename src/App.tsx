
import { UserProvider } from "./contexts/UserContext";
import Header from "./components/Header";
import { ThemeProvider } from "./contexts/ThemeContext";
import ContextPage from "./contexts/ContextPage";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";


function App() {

  return (
    
    <ThemeProvider>
      <UserProvider>
        <Header />
        <div style={{ padding: 24 }}>
          <ContextPage />
        </div>
      </UserProvider>
    </ThemeProvider>

  );

}

export default App;