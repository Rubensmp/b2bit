import React from "react";

interface ButtonProps {
  text: string;
  width?: string;
  type?: "submit" | "reset" | "button" | undefined;
  action?: () => void;
}

const ActionButton: React.FC<ButtonProps> = ({ type, action, text, width }) => {
  return (
    <button
      type={type || "button"}
      className={`bg-blue rounded-[9px] px-[10px] py-[10px] text-white font-[700] ${width}`}
      onClick={action}
    >
      {text}
    </button>
  );
};

export default ActionButton;
