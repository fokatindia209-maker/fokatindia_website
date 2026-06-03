interface Props {
    title: string;
    type?: "button" | "submit";
    onClick?: () => void;
}

export default function Button({
    title,
    type = "button",
    onClick
}: Props) {

    return (
        <button
            type={type}
            onClick={onClick}
            style={styles.button}
        >
            {title}
        </button>
    );
}

const styles: Record<string, React.CSSProperties> = {

    button: {
        width: "100%",
        padding: "10px",
        border: "none",
        borderRadius: "8px",
        background: "#1976d2",
        color: "#fff",
        fontWeight: "bold",
        cursor: "pointer"
    }
};