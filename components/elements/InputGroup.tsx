"use client";

import { ChangeEvent, FC, ReactNode } from "react";

interface InputGroupProps {
  label?: ReactNode | string;
  leftIcon?: ReactNode | string;
  rightIcon?: ReactNode | string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  type: string;
  name: string;
  id: string;
  isValidate?: boolean;
  message?: string;
  className?: string;
  disabled?: boolean;
  value?: string | number | readonly string[] | undefined;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputGroup: FC<InputGroupProps> = ({
  id,
  name,
  value,
  label,
  leftIcon,
  rightIcon,
  onChange,
  message,
  className,
  placeholder,
  disabled = false,
  required = false,
  isValidate = true,
  autoComplete = "off",
  type = "text" || "number" || "password",
}) => {
  // console.log(isValidate);
  return (
    <div className={`flex flex-col space-y-1 h-full w-full ${className}`}>
      {label &&
        (typeof label === "string" ? (
          <label htmlFor={id} className="font-semibold capitalize">
            {label}
          </label>
        ) : (
          label
        ))}
      <div className="relative">
        <input
          id={id}
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={onChange}
          autoComplete={autoComplete}
          min={0}
          className={`py-2 w-full outline-none ring-0 rounded-md h-fit border focus:ring-0 transition-all duration-300 placeholder-gray-400 ${
            isValidate
              ? "border-gray-400 focus:border-gray-700 caret-gray-700"
              : "border-red-500 focus:text-red-700 caret-red-700"
          } peer ${leftIcon ? "pl-8" : "pl-2"} ${rightIcon ? "pr-8" : "pr-2"} ${
            type === "number"
              ? "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              : ""
          }`}
        />
        {leftIcon && (
          <label
            htmlFor={id}
            className={`absolute inset-y-0 h-full flex items-center left-2 transition-all duration-300 ${
              isValidate
                ? "text-gray-400 peer-focus:text-gray-700"
                : "text-red-500 peer-focus:text-red-700"
            }`}
          >
            {leftIcon}
          </label>
        )}
        {rightIcon && (
          <label
            htmlFor={id}
            className={`absolute inset-y-0 h-full flex items-center right-2 transition-all duration-300 ${
              isValidate
                ? "text-gray-400 peer-focus:text-gray-700"
                : "text-red-500 peer-focus:text-red-700"
            }`}
          >
            {rightIcon}
          </label>
        )}
        {message && isValidate === false && (
          <p className="absolute text-sm right-0 text-red-500">{message}</p>
        )}
      </div>
    </div>
  );
};

export default InputGroup;
