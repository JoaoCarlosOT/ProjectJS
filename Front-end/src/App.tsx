import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Message from "./components/Message";
import { AppProvider } from "./context/AppContext";
import { MessageProvider } from "./context/FlashMessageContext";
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <AppProvider>
      <ThemeProvider>
        <MessageProvider>
          <div className="lg:pl-[260px] min-h-screen overflow-y-auto h-[calc(100vh-64px)]"> {/* espaço da sidebar */}
            <Header />
            <Message />
            <Outlet />
          </div>
          <Sidebar /> {/* fora do container principal */}
        </MessageProvider>
      </ThemeProvider>
    </AppProvider>
  );
}


export default App;
