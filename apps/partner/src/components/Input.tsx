interface InputProps {

    type: string;

    name?: string;

    placeholder?: string;

    value?: string;

    onChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

export default function Input({
    type,
    name,
    placeholder,
    value,
    onChange
}: InputProps) {

    return (

        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px"
            }}
        />
    );
}