import { useNavigate } from "react-router";
import ErrorImage from './assets/Error_photo.png';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white/90 backdrop-blur-md px-4 py-10 text-center">

            {/* 404 Image */}
            <img
                src={ErrorImage}
                alt="404 Not Found"
                className="w-full max-w-md mb-8 animate-fadeIn rounded-xl"
            />

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-500 mb-4">
                Oops! Page Not Found
            </h1>

            {/* Subheading */}
            <p className="text-slate-600 text-lg sm:text-xl mb-8">
                The page you are looking for doesn’t exist or has been moved.
            </p>

            {/* Go Back Button */}
            <button
                onClick={() => navigate("/")}
                className="px-6 py-3 text-lg font-semibold rounded-xl text-white border-none bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-500 shadow-lg hover:scale-105 transition-transform duration-300"
            >
                Go Back Home
            </button>

        </div>
    );
};

export default ErrorPage;
