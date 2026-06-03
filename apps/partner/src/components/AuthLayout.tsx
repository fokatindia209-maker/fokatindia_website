interface Props {
    title: string;
    children: React.ReactNode;
}

export default function AuthLayout({
    title,
    children
}: Props) {

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <h2 style={styles.title}>{title}</h2>
                {children}
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {

    wrapper: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },

    card: {
        width: "380px",
        padding: "25px",
        borderRadius: "12px",
        background: "#fff",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
    },

    title: {
        textAlign: "center",
        marginBottom: "15px",
        color: "#333"
    }
};