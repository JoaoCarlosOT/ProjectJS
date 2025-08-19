import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Message from "./components/Message";
import { AppProvider, AppContext } from "./context/AppContext";
import { MessageProvider } from "./context/FlashMessageContext";
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from "./components/Sidebar";
import { useContext } from "react";

function AppLayoutContent() {
  const { authenticated } = useContext(AppContext);

  return (
    <>
      <div className={`${authenticated ? 'lg:pl-[260px]' : ''} min-h-screen overflow-y-auto h-[calc(100vh-64px)]`}>
        {authenticated && <Header />}
        <Message />
        <Outlet />
      </div>
      {authenticated && <Sidebar />}
    </>
  );
}

function AppLayout() {
  return (
    <AppProvider>
      <ThemeProvider>
        <MessageProvider>
          <AppLayoutContent />
        </MessageProvider>
      </ThemeProvider>
    </AppProvider>
  );
}

export default AppLayout;
