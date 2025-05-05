import { FC, useState } from "react";
interface PasswordInputProps {
    value: string;
    onChange: (value: string) => void;
    }
const PasswordInput: FC<PasswordInputProps> = ({ value, onChange }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };
  
    return (
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <div className="relative">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            id="password"
            name="password"
            required
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter your password"
            className="mt-1 block w-full px-4 py-2 bg-slate-300 shadow-inner shadow-slate-400 border border-gray-300 rounded-md  focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {isPasswordVisible ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
    );
  }
  
  export default PasswordInput;