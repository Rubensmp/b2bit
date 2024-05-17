import React from "react";

interface PropsLoading {
  size?: string;
}

const Loading: React.FC<PropsLoading> = ({ size = 4 }) => {
  return (
    <div
      className={`inline-block h-${size} w-${size} animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role="status"
      data-testid="loadingId"
    />
  );
};

export default Loading;
