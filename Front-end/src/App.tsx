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
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1">
              <Header />
              <main className="flex-1 p-4">
                <Message />
                <Outlet />
              </main>
            </div>
          </div>
        </MessageProvider>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
