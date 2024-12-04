import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import { addUserToMongo } from "../../services/userServices";

const SignUp = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { userLoggedIn } = useAuth();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isRegistering) {
            setIsRegistering(true);
            if (password == confirmPassword) {
                try {
                    const userCredential = await doCreateUserWithEmailAndPassword(email, password); // create user in firebase
                    const token = await userCredential.user.getIdToken(); // fetch id token
                    await addUserToMongo(token); // add user to database using token
                }
                catch (error) {
                    console.error("Error during user registration:", error);
                    setErrorMessage("Registration failed. Please try again.");
                }
            }
        }
    };

    return (
        <>
            {userLoggedIn && <Navigate to="/home" replace={true} />}

            {/* Back Arrow */}
            <button onClick={() => navigate('/landing')} className="absolute top-4 left-4 text-xl">
                ←
            </button> 

            <main className="flex justify-center items-center min-h-screen bg-white">
                <div className="w-full max-w-md px-6 py-8">
                    <div className="mb-6 text-center">
                        <h3 className="text-xl font-semibold text-gray-800">Sign up</h3>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="First name"
                                required
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Last name"
                                required
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                autoComplete="new-password"
                                required
                                disabled={isRegistering}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                autoComplete="new-password"
                                required
                                disabled={isRegistering}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {errorMessage && (
                            <span className="text-xs text-red-500">{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`w-full py-3 mt-4 text-sm font-medium text-white rounded-lg ${
                                isRegistering ? "bg-gray-400" : "bg-[#EB853D]"
                            } focus:outline-none`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Continue'}
                        </button>

                        <div className="mt-4 text-center text-xs text-gray-600">
                            By selecting Continue, I agree to the{" "}
                            <span className="text-orange-600">Terms of Service</span> and the{" "}
                            <span className="text-orange-600">Privacy Policy</span>.
                        </div>

                        <div className="text-sm text-center mt-4">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-500">Continue</Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default SignUp;