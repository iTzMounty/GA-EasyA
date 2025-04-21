import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
  return <input className="w-full px-3 py-2 border rounded-md" {...props} />;
};

export default Input;
