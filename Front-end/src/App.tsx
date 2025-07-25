// App.tsx
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Message from "./components/Message";
import { AppProvider } from "./context/AppContext";
import { MessageProvider } from "./context/FlashMessageContext";

function App() {
  return (
    <AppProvider>
      <MessageProvider>
        <Header />
        <Message />
        <Outlet />
      </MessageProvider>
    </AppProvider>
  );
}

export default App;
