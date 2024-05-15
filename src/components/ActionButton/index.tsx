import React from "react";
import Loading from "../Loading";

interface ButtonProps {
  text: string;
  width?: string;
  type?: "submit" | "reset" | "button" | undefined;
  action?: () => void;
  loading?: boolean;
}

const ActionButton: React.FC<ButtonProps> = ({
  type,
  action,
  text,
  width,
  loading = false,
}) => {
  return (
    <button
      type={type || "button"}
      className={`bg-blue rounded-[9px] px-[10px] py-[10px] text-white font-[700] ${width}`}
      onClick={action}
    >
      {loading ? <Loading /> : text}
    </button>
  );
};

export default ActionButton;
