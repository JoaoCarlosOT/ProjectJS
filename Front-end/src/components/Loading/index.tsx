import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
    return (
        <div className="flex items-center justify-center">
            <AiOutlineLoading3Quarters className="text-4xl animate-spin" />
        </div>
    );
};

export default Loading;
