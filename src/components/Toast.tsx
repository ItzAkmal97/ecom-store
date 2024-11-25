import { useEffect } from "react";

interface ToastProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
}


const Toast = ({ message, isVisible, onClose }: ToastProps) => {
    useEffect(() => {
      if (isVisible) {
        const timer = setTimeout(() => {
          onClose();
        }, 2000);
        return () => clearTimeout(timer);
      }
    }, [isVisible, onClose]);
  
    if (!isVisible) return null;
  
    return (
      <div className="fixed top-4 right-4 bg-green-500 text-green-900 px-6 py-3 rounded-lg shadow-lg border border-green-600 flex items-center gap-2 animate-fade-in-down">
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 13l4 4L19 7" 
          />
        </svg>
        {message}
      </div>
    );
  };
  
  export default Toast;