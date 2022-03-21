const Input = ({
    label,
    name,
    type,
    placeholder,
    onChange,
    onBlur,
    dataTestId
}) => {
    return (
        <label htmlFor={name} className="block w-full mb-3">
            <div className="font-bold mb-1">
                {label}
            </div>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                className="py-2 focus:ring-0 focus:outline-none border-b w-full"
                onChange={onChange}
                onBlur={onBlur}
                data-testid={dataTestId}
            />
        </label>
    )
}

export default Input;