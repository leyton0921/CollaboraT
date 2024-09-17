import React from "react";
import { IinputProps } from "../../UI/Iinput";

const Input: React.FC<IinputProps> = ({  label, type, placeholder, id, value, onChange, className}) => {
    return (
        <div className={className}>
            {label && <label>{label}</label>}
            <input 
                type={type} 
                placeholder={placeholder}
                id={id} 
                value={value} 
                onChange={onChange} 
                className="input-class"
            />
        </div>
    );
}

export default Input;