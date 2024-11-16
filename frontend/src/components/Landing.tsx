import React from "react";
import Menu from "./Menu";

const Landing = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            {/* App Name */}
            <h1 className="text-4xl font-bold text-[#EB853D] mb-10">FirstRep</h1>

            {/* Menu with Login and Signup Buttons */}
            <Menu />
        </div>
    );
};

export default Landing;