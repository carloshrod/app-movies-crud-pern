const InputForm = ({ id, name, label, type, className, onChange, ...inputProps }) => {

    return (
        <div className={className}>
            <label htmlFor={id} className="form-label blue-label">
                {label}
            </label>
            {type === "select"
                ?
                <>
                    <select
                        {...inputProps}
                        id={id}
                        name={name}
                        className="form-select"
                        onChange={onChange}
                    >
                        {label === "Idioma" ?
                            <>
                                <option defaultValue>Seleccionar</option>
                                <option value="ESP">ESP</option>
                                <option value="ENG">ENG</option>
                            </>
                            :
                            <>
                                <option defaultValue>Seleccionar</option>
                                <option value="Todo público">Todo público</option>
                                <option value="+12 años">+12 años</option>
                                <option value="+14 años">+14 años</option>
                                <option value="+17 años">+17 años</option>
                            </>
                        }
                    </select>
                </>
                :
                <>
                    <div className="input-group has-validation">
                        <input
                            {...inputProps}
                            id={id}
                            type={type}
                            name={name}
                            className="form-control"
                            onChange={onChange}
                        />
                    </div>
                </>
            }
        </div>
    )
}

export default InputForm