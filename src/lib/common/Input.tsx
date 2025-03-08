import React from "react";
import {UseFormRegister} from "react-hook-form";

interface InputProps {
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  type?: string;
  className?: string;
  value?: string;
}

const Input: React.FC<InputProps> = ({name, placeholder, register, type, className, value}) => {
  return (
    <input
      type={type}
      {...register(name)}
      className={`p-2 rounded  border border-gray-400 ${className}`}
      placeholder={placeholder}
      value={value}
    />
  );
};

export default Input;
