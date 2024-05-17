import { useField } from "formik";
import React from "react";

interface PropsInput {
  label: string;
}

const InputText: React.FC<PropsInput & any> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-1 flex-col mb-[10px]">
      <label className="text-black text-base mb-2 font-[700]">{label}</label>
      <input
        className="bg-grey rounded-[9px] px-[18px] py-[12px]"
        {...field}
        {...props}
      />
      {meta.error ? (
        <div className="text-red text-[12px] ">{meta.error}</div>
      ) : (
        <div className="h-[18px]" />
      )}
    </div>
  );
};

export default InputText;
