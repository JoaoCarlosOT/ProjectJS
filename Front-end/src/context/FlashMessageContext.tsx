// context/MessageContext.tsx
import { createContext, useState, useContext } from "react";

type Message = { type: "success" | "error"; text: string };

const MessageContext = createContext<{
    message: Message | null;
    setMessage: (msg: Message | null) => void;
}>({ message: null, setMessage: () => { } });

export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({ children }: { children: React.ReactNode }) => {
    const [message, setMessage] = useState<Message | null>(null);

    return (
        <MessageContext.Provider value={{ message, setMessage }}>
            {children}
        </MessageContext.Provider>
    );
};
