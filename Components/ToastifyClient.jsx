"use client";
import { useTheme } from "next-themes";
import { ToastContainer } from "react-toastify";

const ToastifyClient = () => {
  const { resolvedTheme } = useTheme();
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={resolvedTheme}
      />
    </div>
  );
};

export default ToastifyClient;
