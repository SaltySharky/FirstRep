import React, { useState } from "react";
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "../../firebase/auth";
import { useAuth } from "../../contexts/AuthContext";


const Login = () => {
    const { userLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            await doSignInWithEmailAndPassword(email, password);
            // doSendEmailVerification();
        }
    };

    const onGoogleSignIn = (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            doSignInWithGoogle().catch(err => {
                setIsSigningIn(false);
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
            {/* Back Arrow */}
            <button onClick={() => navigate('/landing')} className="absolute top-4 left-4 text-xl">
                ←
            </button> 

            <main className="w-full max-w-xs px-6">
                <div className="text-center mb-8">
                    <h3 className="text-lg font-semibold text-gray-800">Login</h3>
                </div>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>
                  
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center">
                            {/* Icon placeholder */}
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.536 1.61-1.47 3.062-2.753 4.17M15 12a3 3 0 01-6 0" />
                            </svg>
                        </div>
                    </div>

                    {errorMessage && (
                        <span className="text-xs text-red-500">{errorMessage}</span>
                    )}

                    <div className="text-right">
                        <Link to="/password-reset" className="text-sm text-orange-500">Forgot password?</Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isSigningIn}
                        className={`w-full py-3 rounded-lg text-sm font-medium ${
                            isSigningIn ? "bg-gray-200 text-gray-400" : "bg-[#EB853D] text-white"
                        } focus:outline-none`}
                    >
                        {isSigningIn ? 'Signing In...' : 'Login'}
                    </button>
                </form>

                <div className="mt-6 text-center text-gray-500">OR</div>

                <button
                    disabled={isSigningIn}
                    onClick={onGoogleSignIn}
                    className="flex justify-center items-center w-full py-3 mt-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 focus:outline-none"
                >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_17_40)">
                            <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                            <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                            <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                            <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                        </g>
                        <defs>
                            <clipPath id="clip0_17_40">
                                <rect width="48" height="48" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                </button>
            </main>
        </div>
    );
};

export default Login;