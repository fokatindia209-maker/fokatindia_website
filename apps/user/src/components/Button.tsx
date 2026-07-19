interface Props {
    title: string;
    type?: "button" | "submit";
    onClick?: () => void;
    disabled?: boolean;
}

export default function Button({
    title,
    type = "button",
    onClick,
    disabled
}: Props) {

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-600/30 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
        >
            {title}
        </button>
    );
}
