import React, { useState } from 'react';
import useAppDispatch from '../redux/useAppdispatch';
import { registerAction } from '../redux/slices/authSlice';
import PasswordInput from '../components/passwordInput';

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
       
    });
  const dispatch = useAppDispatch()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
      
        dispatch(registerAction(formData))
        .then((response) => {
            console.log('Registration successful:', response);
            // Handle successful registration (e.g., redirect to login page)
        })
        .catch((error) => {
            console.error('Registration failed:', error);
            // Handle registration error (e.g., show error message)
        });
        setFormData({
            name: '',
            email: '',
            password: '',
        });
        
    };

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-md bg-slate-400 rounded-lg shadow-md p-6">
            <div className="h-20 w-full rounded-full overflow-hidden flex-shrink-0 mr-2">
                    <img
                      src="/logo-1-primary-removebg-preview.png"
                      alt="AI"
                      className="h-full w-full object-cover "
                      
                    />
                  </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            placeholder='Enter your username'
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 shadow-inner shadow-slate-400 border bg-slate-300 border-gray-300 rounded-md  focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Enter your email'
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 shadow-inner shadow-slate-400 bg-slate-300 border border-gray-300 rounded-md  focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                       <PasswordInput value={formData.password} onChange={(value) => handleChange({ target: { name: 'password', value } } as React.ChangeEvent<HTMLInputElement>)} />
                    </div>
                
                    <button
                        type="submit"
                        className="w-full bg-sky-950 text-white py-2 px-4 rounded-md hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Register
                    </button>
                    <p className="text-sm text-gray-600 text-center">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-500 hover:text-blue-700">
                            Login
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;