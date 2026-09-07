import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

// A password field with a reveal toggle. Each instance holds its own
// visibility, so the two fields on the register form toggle independently.
function PasswordInput({ className = "", ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative w-full max-w-xs">
      <input
        {...props}
        type={visible ? "text" : "password"}
        className={`input input-bordered w-full pr-11 ${className}`}
      />
      <button
        // Without type="button" this would submit the form it sits in.
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute inset-y-0 right-0 flex items-center px-3 transition-colors text-base-content/50 hover:text-base-content"
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
      >
        {visible ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
}

export default PasswordInput;
