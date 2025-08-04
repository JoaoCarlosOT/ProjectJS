// components/Message.tsx
import { useMessage } from "../../context/FlashMessageContext";

const Message = () => {
    const { message, setMessage } = useMessage();

    if (!message) return null;

    setTimeout(() => setMessage(null), 4000);

    return (
        <div
            className={`
        fixed bottom-6 left-10 z-50 px-4 py-2 rounded shadow 
        bg-gray-800 
        ${message.type === "success" ? "text-green-400" : "text-red-400"}
      `}
        >
            {message.text}
        </div>
    );
};

export default Message;
