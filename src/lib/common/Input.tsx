import React from "react";
import {FieldValues, RegisterOptions, UseFormRegister, UseFormRegisterReturn} from "react-hook-form";

interface InputProps {
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  type?: string;
  className?: string;
  value?: string;
  readOnly?: boolean;
  // register: UseFormRegister<FieldValues>;
  options?: RegisterOptions;

}

const Input: React.FC<InputProps> = ({name, placeholder, options, register, type, className, value, readOnly}) => {
  return (
    <input
      type={type}
      readOnly={readOnly}
      {...register(name, options)}
      className={`p-2 rounded  border border-gray-400 ${className}`}
      placeholder={placeholder}
      value={value}
    />
  );
};

export default Input;
