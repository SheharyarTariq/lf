import React from "react";
import {UseFormRegister} from "react-hook-form";

interface InputProps {
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  type?: string;
  className?: string;
  value?: string;
  readOnly?: boolean;
}

const Input: React.FC<InputProps> = ({name, placeholder, register, type, className, value, readOnly}) => {
  return (
    <input
      type={type}
      readOnly={readOnly}
      {...register(name)}
      className={`p-2 rounded  border border-gray-400 ${className}`}
      placeholder={placeholder}
      value={value}
    />
  );
};

export default Input;
